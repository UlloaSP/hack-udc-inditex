// inditexApi.js

// Definición de error personalizado para manejo de incidencias en red
class NetworkError extends Error {
  constructor(message = "Se ha producido un error en la red") {
    super(message);
    this.name = "NetworkError";
  }
}

const SERVICE_TOKEN_NAME = "serviceToken";
const BASE_URL = import.meta.env.VITE_INDITEX_API_URL; // URL de la API de Inditex (e.g. https://api.inditex.com)
const AUTH_URL = import.meta.env.VITE_INDITEX_AUTH_URL; // URL de autenticación (e.g. https://auth.inditex.com:443/openam/oauth2/itxid/itxidmp/sandbox/access_token)

let networkErrorCallback;
let reauthenticationCallback;

// Verifica si la respuesta es de tipo JSON
const isJson = (response) => {
  const contentType = response.headers.get("content-type");
  return contentType && contentType.indexOf("application/json") !== -1;
};

// Manejo de respuestas exitosas (2xx)
const handleOkResponse = (response, onSuccess) => {
  if (!response.ok) return false;
  if (!onSuccess) return true;
  if (response.status === 204) {
    onSuccess();
    return true;
  }
  if (isJson(response)) {
    response.json().then((payload) => onSuccess(payload));
  }
  return true;
};

// Manejo de respuestas en el rango 4xx
const handle4xxResponse = (response, onErrors) => {
  if (response.status < 400 || response.status >= 500) return false;
  if (response.status === 401 && reauthenticationCallback) {
    reauthenticationCallback();
    return true;
  }
  if (!isJson(response)) throw new NetworkError();
  if (onErrors) {
    response.json().then((payload) => {
      if (payload.globalError || payload.fieldErrors) {
        onErrors(payload);
      }
    });
  }
  return true;
};

// Procesa la respuesta y ejecuta el callback correspondiente
const handleResponse = (response, onSuccess, onErrors) => {
  if (handleOkResponse(response, onSuccess)) return;
  if (handle4xxResponse(response, onErrors)) return;
  throw new NetworkError();
};

// Función de autenticación para obtener el token de servicio mediante client_credentials
export const authenticate = async () => {
  const clientId = import.meta.env.VITE_INDITEX_CLIENT_ID; // Definido en las variables de entorno
  const clientSecret = import.meta.env.VITE_INDITEX_CLIENT_SECRET; // Definido en las variables de entorno
  const tokenUrl = AUTH_URL; // URL de autenticación

  const params = JSON.stringify({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });
  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
      body: params,
    });
    if (!response.ok) {
      throw new Error(
        `Error en la solicitud de autenticación: ${response.status}`
      );
    }
    const data = await response.json();
    setServiceToken(data.access_token);
    return data.access_token;
  } catch (error) {
    if (networkErrorCallback) networkErrorCallback(error);
    throw error;
  }
};

// Inicializa el callback de error de red
export const init = (callback) => (networkErrorCallback = callback);

// Callback para reautenticación en caso de error 401
export const setReauthenticationCallback = (callback) =>
  (reauthenticationCallback = callback);

// Almacena el token de servicio en sessionStorage
export const setServiceToken = (serviceToken) =>
  sessionStorage.setItem(SERVICE_TOKEN_NAME, serviceToken);

// Recupera el token de servicio de sessionStorage
export const getServiceToken = () => sessionStorage.getItem(SERVICE_TOKEN_NAME);

// Elimina el token de servicio de sessionStorage
export const removeServiceToken = () =>
  sessionStorage.removeItem(SERVICE_TOKEN_NAME);

// Configuración general de las peticiones HTTP
export const config = (method, body) => {
  const config = { method };
  if (body) {
    if (body instanceof FormData) {
      config.body = body;
    } else {
      config.headers = { "Content-Type": "application/json" };
      config.body = JSON.stringify(body);
    }
  }
  const serviceToken = getServiceToken();
  if (serviceToken) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${serviceToken}`;
  }
  return config;
};

// Función para buscar productos
export const searchProducts = (
  query,
  brand,
  page = 1,
  perPage = 20,
  onSuccess,
  onErrors
) => {
  const params = new URLSearchParams({ query, page, perPage });
  if (brand) params.append("brand", brand);

  fetch(`${BASE_URL}/products?${params.toString()}`, config("GET"))
    .then((response) => handleResponse(response, onSuccess, onErrors))
    .catch(networkErrorCallback);
};

// Función para búsqueda visual de productos
export const visualSearch = (
  imageUrl,
  page = 1,
  perPage = 5,
  onSuccess,
  onErrors
) => {
  const params = new URLSearchParams({ image: imageUrl, page, perPage });

  fetch(`${BASE_URL}/visual-search?${params.toString()}`, config("GET"))
    .then((response) => handleResponse(response, onSuccess, onErrors))
    .catch(networkErrorCallback);
};

// Función para seguimiento de pedidos
export const trackOrder = (brand, orderId, onSuccess, onErrors) => {
  if (!brand || !orderId) {
    throw new Error("Se requieren tanto el 'brand' como el 'orderId'");
  }

  fetch(`${BASE_URL}/orders/${brand}/${orderId}`, config("GET"))
    .then((response) => handleResponse(response, onSuccess, onErrors))
    .catch(networkErrorCallback);
};
