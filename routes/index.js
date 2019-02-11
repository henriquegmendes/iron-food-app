const express = require('express');

const router = express.Router();

const Restaurant = require('../models/Restaurant.js');

/* GET home page */
router.get('/', (req, res) => {
  res.render('index');
});


module.exports = router;
