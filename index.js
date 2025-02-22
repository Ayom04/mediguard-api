require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.APP_PORT || 3000;
const cors = require("cors");
const Knex = require("knex");
const { Model } = require("objection");
displayRoutes = require("express-routemap");
const knexConfig = require("./config/database");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Authorization"],
  credentials: true,
  maxAge: 86400, // 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight requests explicitly
app.options("*", cors(corsOptions));
app.use((req, res, next) => {
  req.clientIp =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.ip ||
    ip.address();
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API!",
  });
});

// Routes
app.use("/api/v1/auth", require("./routes/auth.js"));
app.use("/api/v1/users", require("./routes/user"));
app.use("/api/v1/symptomchecker", require("./routes/symptomchecker"));

app.use((err, req, res, next) => {
  return res.status(err.code || 400).json({
    status: "error",
    message: err.message || "An error occurred",
  });
});
app.listen(PORT, async (req, res) => {
  displayRoutes(app);
  await knex.raw("SELECT 1+1 as result");
  Model.knex(knex);

  console.log(`Server is running on port http://localhost:${PORT}`);
});
