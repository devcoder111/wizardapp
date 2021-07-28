const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 0 - admin, 1 - user

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: 5,
    select: false
  },
  residentLocation: {
    type: String,
    required: [true, 'Resident Location name is required']
  },
  user_type: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  created_on: {
    type: Date,
    default: Date.now
  },
  updated_on: {
    type: Date,
    default: Date.now
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPasswords = async function(password){
  return await bcrypt.compare(password, this.password)
}

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function(doc, ret, opt) {
      delete ret['password']
      delete ret['_id']
      return ret
  }
})

UserSchema.methods.getSignedToken = function(){
  const payload = { id: this._id, user_type: this.user_type };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

UserSchema.methods.getResetPasswordToken = function(){
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 10000);

  return resetToken;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
