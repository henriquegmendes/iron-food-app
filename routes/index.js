const express = require('express');
const Restaurant = require('../models/Restaurant.js');
const Comment = require('../models/Comment.js');

const restaurantRouter = express.Router();

/* GET home page */
restaurantRouter.get('/', (req, res) => {
  res.render('index');
});

/* Search route */
restaurantRouter.post('/search-restaurants', (req, res) => {
  const min = parseInt(req.body.min, 10);
  const max = parseInt(req.body.max, 10);
  const { type } = req.body;
  Restaurant.find({ $and: [{ minPrice: { $gte: min } }, { type }, { maxPrice: { $lte: max } }] })
    .then((restaurants) => {
      console.log(restaurants);
      res.render('search', { restaurants });
    })
    .catch((error) => {
      console.log(error);
    });
});

/* Restaurants page */
restaurantRouter.get('/restaurants', (req, res) => {
  Restaurant.find()
    .then((restaurants) => {
      // placeRestaurants(restaurants.data);
      res.render('restaurants', { restaurants });
    })
    .catch((error) => {
      console.log(error);
    });
});

/* Individual restaurant page */
restaurantRouter.get('/restaurants/:id', (req, res) => {
  const restaurantId = req.params.id;
  Restaurant.findOne({ _id: restaurantId })
    .then((restaurant) => {
      Comment.find({ restaurantId })
        .then((comment) => {
          res.render('restaurant-details', { restaurant, comment });
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

/* API routes */
restaurantRouter.get('/api', (req, res, next) => {
  Restaurant.find({}, (error, allRestaurantsFromDB) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json({ restaurants: allRestaurantsFromDB });
    }
  });
});

restaurantRouter.get('/api/:id', (req, res, next) => {
  const restaurantId = req.params.id;
  Restaurant.findOne({ _id: restaurantId }, (error, oneRestaurantFromDB) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json({ restaurant: oneRestaurantFromDB });
    }
  });
});

module.exports = restaurantRouter;
