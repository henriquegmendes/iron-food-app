const express = require('express');

const restaurantRouter = express.Router();

const axios = require('axios');

const multer = require('multer');

const upload = multer({ dest: './public/uploads/' });

const Restaurant = require('../models/Restaurant.js');

const Comment = require('../models/Comment.js');


/* GET home page */
restaurantRouter.get('/', (req, res) => {
  res.render('index');
});

/* Search route */
restaurantRouter.post('/search-restaurants', (req, res) => {
  const min = parseInt(req.body.min, 10);
  const max = parseInt(req.body.max, 10);
  const type = req.body.type;
  Restaurant.find({$and: [{'minPrice': {$gte: min}}, {'type': type}, {'maxPrice': {$lte: max}}]})
    .then((restaurants) => {
      console.log(restaurants);
      res.render('search', { restaurants });
    })
    .catch((error) => {
      console.log(error);
    });
  // res.render('index');
});

// db.restaurants.find({$and: [{'minPrice': {$gte: 10}}, {'type': 'Self Service'}, {'maxPrice': {$lte: 30}}]})

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

restaurantRouter.get('/restaurants/:id', (req, res, next) => {
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

restaurantRouter.get('/api', (req, res, next) => {
  Restaurant.find({}, (error, allRestaurantsFromDB) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json({ restaurants: allRestaurantsFromDB });
    }
  });
});


// module.exports = router;
module.exports = restaurantRouter;
