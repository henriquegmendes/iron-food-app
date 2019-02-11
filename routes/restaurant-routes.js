const express = require('express');

const router = express.Router();

const uploadCloud = require('../config/cloudinary.js');

const multer = require('multer');

// const upload = multer({ dest: './public/uploads/' });

const Restaurant = require('../models/Restaurant.js');

/* Restaurants page */

router.get('/restaurants', (req, res) => {
  Restaurant.find()
    .then((restaurants) => {
      res.render('restaurants', { restaurants });
    })
    .catch((error) => {
      console.log(error);
    });
});

/* Individual restaurant page */

router.get('/restaurants/:id', (req, res, next) => {
  const restaurantId = req.params.id;
  Restaurant.findOne({ _id: restaurantId })
    .then((restaurant) => {
      res.render('restaurant-details', { restaurant });
    })
    .catch((error) => {
      console.log(error);
    });
});

/* Add new restaurant */

router.get('/new-restaurant', (req, res, next) => {
  res.render('new-restaurant');
});

router.post('/new-restaurant', uploadCloud.single('photo'), (req, res, next) => {
  const { name, type, description, address, location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  } } = req.body;

  const imgPath = req.file.url;
  const originalName = req.file.originalname;

  const newRestaurant = new Restaurant({ name, type, description, address, location, imgPath, originalName });
  newRestaurant.save()
    .then((restaurant) => {
      console.log(newRestaurant);
      res.redirect('/restaurants');
    })
    .catch((error) => {
      console.log(error);
    });
});

/* Edit restaurant */

router.get('/edit/:id', (req, res, next) => {
  Restaurant.findOne({ _id: req.params.id })
    .then((restaurant) => {
      res.render('edit', { restaurant });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/edit', (req, res, next) => {
  const { name, type, description, address } = req.body;
  Restaurant.update({ _id: req.query.restaurantId }, { $set: { name, type, description, address } })
    .then((restaurant) => {
      res.redirect('/restaurants');
    })
    .catch((error) => {
      console.log(error);
    });
});


// const { name, type, description, address, location = {
//   type: 'Point',
//   coordinates: [req.body.longitude, req.body.latitude]
// } } = req.body;
// Restaurant.update({ _id: req.query.restaurantId }, { $set: { name, type, description, address, location } })

/* Delete restaurant */

router.get('/del/:id', (req, res, next) => {
  Restaurant.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect('/restaurants');
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
