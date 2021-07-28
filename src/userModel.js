import * as Yup from 'yup';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
  lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  phone: Yup.string().min(11, 'Too Short!').max(16, 'Too Long!').required('Phone Number is required'),
  password: Yup.string().required('Password is required'),
  dateOfBirth: Yup.string().typeError('Date of Birth must be a valid date').required('Date of Birth is required'),
  residentLocation: Yup.string().required('Location is required')
});

module.exports = mongoose.model('User', userSchema);
