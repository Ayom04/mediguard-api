const User = require("../models/user");

const Authorization = async (req, res, next) => {
  const { email_address } = req.params;
  try {
    if (!email_address) throw new Error("Unauthorized access");

    const user = await User.query().findOne({ email_address });
    if (!user) {
      const err = new Error("Unauthorized access");
      err.status = 401;
      return next(err);
    }
    req.params.user_id = user.user_id;

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = Authorization;
