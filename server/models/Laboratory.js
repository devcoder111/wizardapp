const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const LaboratorySchema = new mongoose.Schema({
  proprietorFirstName: {
    type: String,
    required: [true, "Proprietor first name is required"],
  },
  proprietorLastName: {
    type: String,
    required: [true, "Proprietor last name is required"],
  },
  proprietorDOB: {
    type: Date,
    required: [true, "Proprietor date of birth is required"],
  },
  laboratoryName: {
    type: String,
    required: [true, "Laboratory name is required"],
  },
  incorporationDate: {
    type: Date,
    required: [true, "Incorporation Date is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  licence: {
    type: String,
    required: [true, "Phone number is required"],
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: 5,
    select: false,
  },
  laboratoryAddress: {
    type: String,
    required: [true, "Laboratory Location name is required"],
  },
  city: String,
  country: String,
  user_type: {
    type: String,
    default: "2",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  created_on: {
    type: Date,
    default: Date.now,
  },
  updated_on: {
    type: Date,
    default: Date.now,
  },
});

LaboratorySchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

LaboratorySchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

LaboratorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, opt) {
    delete ret["password"];
    delete ret["_id"];
    return ret;
  },
});

LaboratorySchema.methods.getSignedToken = function () {
  const payload = { id: this._id, user_type: this.user_type };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

LaboratorySchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 10000);

  return resetToken;
};

const Laboratory = mongoose.model("Laboratory", LaboratorySchema);

module.exports = Laboratory;
