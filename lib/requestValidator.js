const Joi = require('joi');

module.exports = {
  getMovieByID: {
    params: {
      id: Joi.string().required(),
    },
  },
  createMovie: {
    body: {
      showtimes: Joi.array().min(1).unique().required(),
      stars: Joi.array().min(1).unique().required(),
      director: Joi.string().max(100).allow(''),
      title: Joi.string().min(5).max(100).required(),
      image: Joi.string().required(),
      description: Joi.string().trim().min(5).max(1000)
        .required()
    },
  },
  createUser: {
    body: {
      user: Joi.string().min(5).max(50).required(),
      password: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(50).required(),
      mobno: Joi.string().min(5).max(50).required()
    },
  }
};
