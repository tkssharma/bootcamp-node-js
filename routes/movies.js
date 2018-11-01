const express = require('express');

const router = express.Router();
const Movie = require('../models/Movie');
const movieController = require('.././controller/MovieController');
const reviewController = require('.././controller/ReviewController');
const expressJoiValidator = require('express-joi-validator');
const expressJoi = require('../lib/requestValidator');


router.get('/', (req, res, next) => {
  movieController.findAllMovie(req, res).then((movies) => {
    // res.render('movies', { movies });
    res.status(200).json({ movies });
  }).catch((err) => {
    res.status(500).json({ message: 'internal server errro occured' });
  });
});

router.get('/:id', expressJoiValidator(expressJoi.getMovieByID), (req, res, next) => {
  movieController.findMovieById(req, res).then((movies) => {
    res.render('movie', { movies });
  }).catch((err) => {
    res.status(500).json({ message: 'internal server errro occured' });
  });
});

router.post('/', expressJoiValidator(expressJoi.createMovie), (req, res, next) => {
  movieController.createMovie(req, res).then((data) => {
    res.status(200).json({ success: true });
  }).catch((err) => {
    res.status(500).json({ message: 'internal server errro occured' });
  });
});

router.post('/:id/review', (req, res, next) => {
  reviewController.createReview(req, res, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'internal server error for adding review' });
    } else {
      res.status(200).json({ message: 'success' });
    }
  });
});

/*
router.put('/:id', expressJoiValidator(expressJoi.createMovie), (req, res, next) => {
  movieController.createMovie(req, res).then((data) => {
    res.status(200).json({ success: true });
  }).catch((err) => {
    res.status(500).json({ message: 'internal server errro occured' });
  });
});
router.delete('/:id', expressJoiValidator(expressJoi.createMovie), (req, res, next) => {
  movieController.createMovie(req, res).then((data) => {
    res.status(200).json({ success: true });
  }).catch((err) => {
    res.status(500).json({ message: 'internal server errro occured' });
  });
});
*/

module.exports = router;
