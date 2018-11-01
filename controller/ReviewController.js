const Review = require('../models/Reviews');
const Movie = require('../models/Movie');


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
  static findReview(req, res, cb) {
    const movieId = req.params.id;
    Movie.find({ _id: movieId }, (err, data) => {
      if (err) {
        cb(err, null);
      } else {
        const reviewId = req.params.idReview;
        Review.find({ _id: reviewId }, (error, dataReview) => {
          if (error) {
            cb(error, null);
          } else {
            cb(null, dataReview);
          }
        });
      }
    });

    console.log(req.params);
  }
}

module.exports = reviewController;
