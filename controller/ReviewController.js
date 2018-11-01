const Review = require('../models/Reviews');

class reviewController {
  static createReview(req, res, cb) {
    const { body } = req;
    const movieId = req.params.id;
    return Review.create({
      comments: body.comments, ratings: body.ratings, description: body.description, movieId: req.params.id
    }, (error, data) => {
      if (error) {
        cb(error, null);
      } else {
        cb(null, data);
      }
    });
  }
}

module.exports = reviewController;
