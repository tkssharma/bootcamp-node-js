const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  comments: { type: String },
  ratings: { type: String },
  description: { type: String },
  movieId: { type: String }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
