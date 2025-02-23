import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";

dotenv.config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;
const PRODUCT_SEARCH_URL = process.env.VITE_INDITEX_API_PRODUCT_SEARCH_URL;
const VISUAL_SEARCH_URL = process.env.VITE_INDITEX_API_VISUAL_SEARCH_URL;
const AUTH_URL = process.env.VITE_INDITEX_AUTH_URL;
const CLIENT_ID = process.env.VITE_INDITEX_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_INDITEX_CLIENT_SECRET;
const SCOPE = process.env.VITE_INDITEX_API_SCOPE;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secure_token_storage",
    resave: false,
    saveUninitialized: false, // ✅ Evita guardar sesiones vacías
    cookie: { secure: false, httpOnly: true }, // ✅ Asegura que la cookie se mantenga en localhost
  })
);

// Verificar si las variables de entorno están cargadas
console.log("🔍 Variables de entorno:", {
  BASE_URL: PRODUCT_SEARCH_URL,
  AUTH_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  SCOPE,
});

// 📌 Autenticación y obtención del token de servicio
app.post("/authenticate", async (req, res) => {
  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: SCOPE,
      }).toString(),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return res.status(response.status).json({ error: errorResponse });
    }

    const data = await response.json();
    req.session.serviceToken = data.id_token;
    req.session.save((err) => {
      // ✅ Forzar el guardado de sesión
      if (err) {
        console.error("⚠️ Error guardando sesión:", err);
        return res.status(500).json({ error: "Error guardando sesión" });
      }
      res.json({ access_token: data.id_token });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
});

// 📌 Middleware para validar autenticación
const withAuth = (req, res, next) => {
  console.log("🔍 Token en sesión:", req.session.serviceToken);
  console.log("🔍 Headers actuales:", req.headers);
  if (!req.session.serviceToken) {
    return res
      .status(401)
      .json({ error: "Unauthorized - No token in session" });
  }

  req.headers["Authorization"] = `Bearer ${req.session.serviceToken}`;
  next();
};

// 📌 Búsqueda de productos
app.get("/products", withAuth, async (req, res) => {
  try {
    const { query = "", brand = "", page = 1, perPage = 20 } = req.query;
    const params = new URLSearchParams({
      query,
      brand,
      page: page.toString(),
      perPage: perPage.toString(),
    });
    console.log(params);

    const response = await fetch(`${PRODUCT_SEARCH_URL}?${params}`, {
      method: "GET",
      headers: {
        Authorization: req.headers["Authorization"],
      },
    });

    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Búsqueda visual de productos
app.get("/visual-search", withAuth, async (req, res) => {
  try {
    const { imageUrl = "", page = 1, perPage = 5 } = req.query;
    const params = new URLSearchParams({
      imageUrl,
      page: page.toString(),
      perPage: perPage.toString(),
    });

    const response = await fetch(`${VISUAL_SEARCH_URL}?${params}`, {
      method: "GET",
      headers: { Authorization: req.headers["Authorization"] },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
