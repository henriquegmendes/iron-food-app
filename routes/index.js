const express = require('express');

const router = express.Router();

const multer = require('multer');

const upload = multer({ dest: './public/uploads/' });

const Restaurant = require('../models/Restaurant.js');

/* GET home page */
router.get('/', (req, res) => {
  res.render('index');
});


module.exports = router;
