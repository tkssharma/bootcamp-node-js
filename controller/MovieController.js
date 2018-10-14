const Movie = require('../models/Movie');

class movieController {
  static findAllMovie(req, res) {
    return new Promise((resolve, reject) => {
      Movie.find({})
        .then((movies) => {
          resolve(movies);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  static findMovieById(req, res) {
    Movie.find({ _id: req.params.id });
    return new Promise(((resolve, reject) => {
      Movie.findById({ _id: req.params.id })
        .then((movies) => {
          resolve(movies);
        })
        .catch((err) => {
          reject(err);
        });
    }));
  }
  static createMovie(req, res, cb) {
    return new Promise((resolve, reject) => {
      const { body } = req;
      return Movie.create({
        title: body.title,
        director: body.director,
        stars: body.stars,
        image: body.image,
        description: body.description,
        showtimes: body.showtimes
      })
        .then((data) => {
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }
}
module.exports = movieController;
