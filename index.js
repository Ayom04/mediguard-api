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

app.use(express.json());
app.use(
  cors({
    exposedHeaders: ["Authorization"],
  })
);
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
