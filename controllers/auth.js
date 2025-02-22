const User = require("../models/user");
const getUserLocation = require("../services/location");
const { comparePassword, generateToken } = require("../utils/index");

const login = async (req, res, next) => {
  const { email_address, password } = req.body;
  try {
    const user = await User.query().findOne({ email_address: email_address });
    if (!user) {
      const err = new Error("Invalid email or password");
      err.status = 401;
      return next(err);
    }

    const passwordMatch = await comparePassword(password, user.password_hash);
    if (!passwordMatch) {
      const err = new Error("Invalid email or password");
      err.status = 401;
      return next(err);
    }
    const location = await getUserLocation(req.clientIp);
    let _location = `${location.city}-${location.region}-${location.latitude}-${location.longitude}`;

    await User.query().update(
      {
        location: _location,
      },
      { email_address: email_address }
    );

    const token = await generateToken({ email: user.email });
    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        token,
        location: _location,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
