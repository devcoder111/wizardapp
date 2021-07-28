const crypto = require("crypto");

const User = require("../models/User");
const Laboratory = require("../models/Laboratory");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res, next) => {
  const {
    firstName,
    lastName,
    password,
    dateOfBirth,
    residentLocation,
    email,
    phone,
    user_type,
  } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      password,
      dateOfBirth,
      residentLocation,
      email,
      phone,
      user_type
    });

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.labRegister = async (req, res, next) => {
  const {
    proprietorFirstName,
    proprietorLastName,
    proprietorDOB,
    laboratoryName,
    incorporationDate,
    licence,
    phone,
    email,
    password,
    laboratoryAddress,
    city,
    country
  } = req.body;

  try {
    const lab = await Laboratory.create({
      proprietorFirstName,
      proprietorLastName,
      proprietorDOB,
      laboratoryName,
      incorporationDate,
      licence,
      phone,
      email,
      password,
      laboratoryAddress,
      city,
      country
    });

    sendToken(lab, 201, res);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    const user =
      (await User.findOne({ email }).select("+password")) ||
      (await Laboratory.findOne({ email }).select("+password"));

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.forgot_password = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user =
      (await User.findOne({ email })) || (await Laboratory.findOne({ email }));

    if (!user) {
      return next(new ErrorResponse("Email could not be found", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:3000/auth/reset-password/${resetToken}`;

    // pug template
    const message = `
    <h1>You have requested a password reset</h1>
    <p>Please go to this link to reset password</p>
    <a href=${resetUrl} clicktracking<off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({
        success: true,
        data: "Email Sent",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
    }
  } catch (err) {
    return next(error);
  }
};

exports.reset_password = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      }) ||
      await Laboratory.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

    if (!user) {
      return next(new ErrorResponse("Invalid Reset Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Reset Success"
    })
  } catch (error) {
    return next(error)
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    accessToken: token,
    user,
  });
};
