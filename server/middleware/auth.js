const jwt = require("jsonwebtoken");
const Laboratory = require("../models/Laboratory");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.protect = async (req, res, next, ...roles) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user =
      (await User.findById(decoded.id)) ||
      (await Laboratory.findById(decoded.id));

    if (!user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    const authorized = await roles[0].includes(user.user_type);

    console.log("authorized",authorized)

    if (!authorized) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
    }

    req.user = user;

    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};
