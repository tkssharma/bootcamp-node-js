const mongoose = require('mongoose');

const { Schema } = mongoose;

const MovieScreenSchema = new Schema({
  name: { type: String },
  location: { type: String },
  description: { type: String },
  availability: { type: Array },

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});
const MovieScreen = mongoose.model('MovieScreen', MovieScreenSchema);

module.exports = MovieScreen;

