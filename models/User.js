const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  password: { type: String },
  email: {
    type: String
  },
  meta: {
    type: Object
  },
  mobno: {
    type: String
  },
  favMovie: { type: String },
  token: { type: String }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

