const express = require('express');

const router = express.Router();

const uploadCloud = require('../config/cloudinary.js');

const multer = require('multer');

const Restaurant = require('../models/Restaurant.js');

const Comment = require('../models/Comment.js');


/* Add new restaurant */

router.get('/new-restaurant', (req, res, next) => {
  res.render('new-restaurant');
});

router.post('/new-restaurant', uploadCloud.single('photo'), (req, res, next) => {
  const { name, type, description, address, price, location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  } } = req.body;

  const imgPath = req.file.url;
  const originalName = req.file.originalname;
  const minPrice = parseInt(req.body.min, 10);
  const maxPrice = parseInt(req.body.max, 10);

  const newRestaurant = new Restaurant({ name, type, description, address, location, minPrice, maxPrice, imgPath, originalName });
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

/* Add comment */

router.get('/addcomment/:id', (req, res, next) => {
  Restaurant.findOne({ _id: req.params.id })
    .then((restaurant) => {
      res.render('addcomment', { restaurant });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/addcomment', (req, res, next) => {
  // const restId = req.params._id;
  const comment = {
    title: req.body.title,
    content: req.body.content,
    userId: req.session.currentUser._id,
    restaurantId: req.body.restId
  };
  console.log(comment);
  const newComment = new Comment(comment);
  newComment.save()
    .then((result) => {
      console.log(result);
      res.redirect('/restaurants');
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
