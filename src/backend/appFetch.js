import NetworkError from "./NetworkError";

const SERVICE_TOKEN_NAME = "serviceToken";

let networkErrorCallback;
let reauthenticationCallback;

const isJson = (response) => {
  const contentType = response.headers.get("content-type");

  return contentType && contentType.indexOf("application/json") !== -1;
};

const handleOkResponse = (response, onSuccess) => {
  if (!response.ok) {
    return false;
  }

  if (!onSuccess) {
    return true;
  }

  if (response.status === 204) {
    onSuccess();
    return true;
  }

  if (isJson(response)) {
    response.json().then((payload) => onSuccess(payload));
  }

  return true;
};

const handle4xxResponse = (response, onErrors) => {
  if (response.status < 400 || response.status >= 500) {
    return false;
  }

  if (response.status === 401 && reauthenticationCallback) {
    reauthenticationCallback();
    return true;
  }

  if (!isJson(response)) {
    throw new NetworkError();
  }

  if (onErrors) {
    response.json().then((payload) => {
      if (payload.globalError || payload.fieldErrors) {
        onErrors(payload);
      }
    });
  }

  return true;
};

const handleResponse = (response, onSuccess, onErrors) => {
  if (handleOkResponse(response, onSuccess)) {
    return;
  }

  if (handle4xxResponse(response, onErrors)) {
    return;
  }

  throw new NetworkError();
};

export const init = (callback) => (networkErrorCallback = callback);

export const setReauthenticationCallback = (callback) =>
  (reauthenticationCallback = callback);

export const setServiceToken = (serviceToken) =>
  sessionStorage.setItem(SERVICE_TOKEN_NAME, serviceToken);

export const getServiceToken = () => sessionStorage.getItem(SERVICE_TOKEN_NAME);

export const removeServiceToken = () =>
  sessionStorage.removeItem(SERVICE_TOKEN_NAME);

export const config = (method, body) => {
  const config = {
    method: method,
  };

  if (body) {
    if (body instanceof FormData) {
      config.body = body;
    } else {
      config.headers = { "Content-Type": "application/json" };
      config.body = JSON.stringify(body);
      config.headers["User-Agent"] = "curl";
    }
  }

  const serviceToken = getServiceToken();

  if (serviceToken) {
    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${serviceToken}`;
    } else {
      config.headers = { Authorization: `Bearer ${serviceToken}` };
    }
  }

  return config;
};

export const appFetch = (path, options, onSuccess, onErrors) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}${path}`, options)
    .then((response) =>
      handleResponse(
        response,
        (onSuccess) => console.log(onSuccess),
        (onErrors) => console.log(onErrors)
      )
    )
    .catch(networkErrorCallback);
/*
export const findProducts = ({ query, brand, page, perPage }, onSuccess) => {
let path = `/products?query=${query}`;
if (brand) path += `&brand=${brand}`;
if (page) path += `&page=${page}`;
if (perPage) path += `&perPage=${perPage}`;
console.log(path);
appFetch(path, config("GET"), onSuccess);
};
*/

export const findProducts = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 500); // Simula una latencia de red
  });
};
/*
export const findImages = ({ image, page, perPage }, onSuccess) => {
  let path = `/visual-search?image=${image}`;
  if (page) path += `&page=${page}`;
  if (perPage) path += `&perPage=${perPage}`;

  appFetch(path, config("GET"), onSuccess);
};
*/

export const findImages = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 500); // Simula una latencia de red
  });
};

export const products = [
  {
    id: "367022517",
    name: "GEOMETRIC JACQUARD SHIRT",
    price: {
      currency: "EUR",
      value: {
        current: 29.95,
      },
    },
    link: "https://www.zara.com/es/en/geometric-jacquard-shirt-p01618475.html?v1=367022517",
    brand: "zara",
  },
  {
    id: "367196402",
    name: "METALLIC THREAD RUSTIC SHIRT",
    price: {
      currency: "EUR",
      value: {
        current: 15.99,
        original: 27.95,
      },
    },
    link: "https://www.zara.com/es/en/metallic-thread-rustic-shirt-p02298151.html?v1=367196402",
    brand: "zara",
  },
  {
    id: "367302811",
    name: "LINEN BLEND STRIPED SHIRT",
    price: {
      currency: "EUR",
      value: {
        current: 25.95,
      },
    },
    link: "https://www.zara.com/es/en/linen-blend-striped-shirt-p01234567.html?v1=367302811",
    brand: "zara",
  },
  {
    id: "367405123",
    name: "TEXTURED COTTON SHIRT",
    price: {
      currency: "EUR",
      value: {
        current: 22.99,
        original: 35.95,
      },
    },
    link: "https://www.zara.com/es/en/textured-cotton-shirt-p09876543.html?v1=367405123",
    brand: "zara",
  },
  {
    id: "367509234",
    name: "OVERSIZED DENIM SHIRT",
    price: {
      currency: "EUR",
      value: {
        current: 39.95,
      },
    },
    link: "https://www.zara.com/es/en/oversized-denim-shirt-p06543210.html?v1=367509234",
    brand: "zara",
  },
  {
    id: "367612345",
    name: "REGULAR FIT PRINTED SHIRT",
    price: {
      currency: "EUR",
      value: {
        current: 19.99,
        original: 29.95,
      },
    },
    link: "https://www.zara.com/es/en/regular-fit-printed-shirt-p03216587.html?v1=367612345",
    brand: "zara",
  },
  {
    id: "367723456",
    name: "SLIM FIT COTTON SHIRT",
    price: {
      currency: "EUR",
      value: {
        current: 27.95,
      },
    },
    link: "https://www.zara.com/es/en/slim-fit-cotton-shirt-p08975412.html?v1=367723456",
    brand: "zara",
  },
  {
    id: "367834567",
    name: "CHECKERED FLANNEL SHIRT",
    price: {
      currency: "EUR",
      value: {
        current: 17.99,
        original: 25.95,
      },
    },
    link: "https://www.zara.com/es/en/checkered-flannel-shirt-p05648721.html?v1=367834567",
    brand: "zara",
  },
  {
    id: "367945678",
    name: "BASIC OXFORD SHIRT",
    price: {
      currency: "EUR",
      value: {
        current: 22.95,
      },
    },
    link: "https://www.zara.com/es/en/basic-oxford-shirt-p06543219.html?v1=367945678",
    brand: "zara",
  },
  {
    id: "368056789",
    name: "FITTED STRIPED SHIRT",
    price: {
      currency: "EUR",
      value: {
        current: 24.99,
        original: 32.95,
      },
    },
    link: "https://www.zara.com/es/en/fitted-striped-shirt-p09876432.html?v1=368056789",
    brand: "zara",
  },
  {
    id: "368167890",
    name: "COTTON LINEN RELAXED SHIRT",
    price: {
      currency: "EUR",
      value: {
        current: 28.95,
      },
    },
    link: "https://www.zara.com/es/en/cotton-linen-relaxed-shirt-p06548712.html?v1=368167890",
    brand: "zara",
  },
];
