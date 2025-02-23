require("dotenv").config();
const jwt = require("jsonwebtoken");

const Authentication = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      const err = new Error("Unauthorized access");
      err.status = 401;
      return next(err);
    }
    const tokenSplit = authorization.split(" ");
    jwt.verify(
      tokenSplit[1],
      process.env.JWT_SECRET || "secret123",
      async (err, decoded) => {
        if (err) {
          const err = new Error("Unauthorized access");
          err.status = 401;
          return next(err);
        }

        req.params.email_address = decoded.email_address;

        next();
      }
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = Authentication;
