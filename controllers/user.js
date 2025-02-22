const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { hashPassword } = require("../utils");
const getUserLocation = require("../services/location");

const createUser = async (req, res, next) => {
  const { email_address, password, name, phone_number } = req.body;
  const clientIp = req.clientIp;
  try {
    const existingUser = await User.query().findOne({ email_address });
    if (existingUser) throw new Error("User with email already exists");
    const { salt, hash } = await hashPassword(password);

    const location = await getUserLocation(clientIp);

    const user = await User.query().insert({
      user_id: uuidv4(),
      email_address,
      password_hash: hash,
      password_salt: salt,
      name,
      location: `${location.city}-${location.region}-${location.latitude}-${location.longitude}`,
      phone_number,
    });

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {};

const deleteUser = async (req, res, next) => {};

const getUser = async (req, res, next) => {};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
};
