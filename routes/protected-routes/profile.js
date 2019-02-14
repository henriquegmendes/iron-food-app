const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const uploadCloud = require('../../config/cloudinary');

const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);

const router = express.Router();

// Session Middleware
router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
    return;
  }
  res.redirect('/login');
});

router.get('/my-profile', (req, res) => {
  const userId = req.session.currentUser._id;
  Comment.find({ userId })
    .then((comment) => {
      res.render('protected-views/profile', {
        user: req.session.currentUser,
        comment
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/profile-update/:id', (req, res) => {
  res.render('protected-views/profile-update');
});

router.post('/profile-update', uploadCloud.single('photo'), (req, res, next) => {
  const { name, email, password } = req.body;
  const imgPathInput = req.file.url;
  const imgNameInput = req.file.originalname;
  if (email === '' || password === '') {
    res.render('protected-views/profile-update', {
      errorMessage: 'Enter both email and password.'
    });
    return;
  }
  User.findOne({ email }, '_id', (err, existingUser) => {
    if (err) {
      next(err);
      return;
    }
    if (existingUser !== null) {
      res.render('protected-views/profile-update', {
        errorMessage: `The email ${email} is already in use.`
      });
      return;
    }
    const hashedPass = bcrypt.hashSync(password, salt);
    User.updateOne({ _id: req.session.currentUser._id }, { $set: { name, email, password: hashedPass, imgPath: imgPathInput, imgName: imgNameInput } })
      .then(() => {
        res.redirect('/logout');
      // res.redirect('/my-profile');
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

module.exports = router;
