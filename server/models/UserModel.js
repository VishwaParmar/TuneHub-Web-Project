// Author: Kainat Khan
// Date: July 24, 2023
const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
  id: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  preferred_genres: {
    type: [String]
  },
  dateOfBirth: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  favoriteSongs: [{
    type: String
  }],
  userRole: {
    type: String
  }
}, { collection: 'User' });

// User model
const Users = mongoose.model('User', userSchema, "User");

module.exports = Users;