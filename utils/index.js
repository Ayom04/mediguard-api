const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

/**
 * hashMyPassword - hash password
 * @param {*} password
 * @returns  {string} - hashed password and salt
 */
const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve({ salt, hash });
      });
    });
  });
};

/**
 * comparePassword - compare password
 * @param {*} plainPassword
 * @param {*} hashedPassword
 * @returns  {boolean} - true if password match hashed password and false if password does not match hashed password
 */
const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * generateToken - generate token using jwt
 * @param {*} payload
 * @returns  {string} token
 */
const generateToken = async (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = { hashPassword, comparePassword, generateToken };
