const express = require('express');

const restaurantRouter = express.Router();

const multer = require('multer');

const upload = multer({ dest: './public/uploads/' });

const Restaurant = require('../models/Restaurant.js');

/* GET home page */
restaurantRouter.get('/', (req, res) => {
  res.render('index');
});

/* Restaurants page */

restaurantRouter.get('/restaurants', (req, res) => {
  Restaurant.find()
    .then((restaurants) => {
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
      res.render('restaurant-details', { restaurant });
    })
    .catch((error) => {
      console.log(error);
    });
});


// module.exports = router;
module.exports = restaurantRouter;
