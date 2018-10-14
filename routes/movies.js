const express = require('express');

const router = express.Router();
const Movie = require('../models/Movie');
const movieController = require('.././controller/MovieController');
const expressJoiValidator = require('express-joi-validator');
const expressJoi = require('../lib/requestValidator');


router.get('/', (req, res, next) => {
  movieController.findAllMovie(req, res).then((movies) => {
    res.render('movies', { movies });
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
