const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(email) {
      if (email && !validator.isEmail(email)) {
        throw new Error('The email you have provided is in an invalid format.')
      }
    },
    lowercase: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
    validate(status) {
      if (status.toLowerCase() !== 'active' && status.toLowerCase() !== 'inactive') {
        throw new Error('Invalid user status.')
      }
    },
    lowercase: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    validate(gender) {
      if (gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female') {
        throw new Error('Invalid gender.')
      }
    },
    lowercase: true,
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User;
