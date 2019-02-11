const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const uploadCloud = require('../../config/cloudinary');

const router = express.Router();
const bcryptSalt = 10;

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', uploadCloud.single('photo'), (req, res, next) => {
  const nameInput = req.body.name;
  const emailInput = req.body.email;
  const passwordInput = req.body.password;
  const imgPathInput = req.file.url;
  const imgNameInput = req.file.originalname;

  if (emailInput === '' || passwordInput === '') {
    res.render('auth/signup', {
      errorMessage: 'Enter both email and password to sign up.'
    });
    return;
  }
  User.findOne({ email: emailInput }, '_id', (err, existingUser) => {
    if (err) {
      next(err);
      return;
    }
    if (existingUser !== null) {
      res.render('auth/signup', {
        errorMessage: `The email ${emailInput} is already in use.`
      });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashedPass = bcrypt.hashSync(passwordInput, salt);
    const userSubmission = {
      name: nameInput,
      email: emailInput,
      password: hashedPass,
      imgPath: imgPathInput,
      imgName: imgNameInput
    };
    const theUser = new User(userSubmission);

    theUser.save((error) => {
      if (error) {
        res.render('auth/signup', {
          errorMessage: 'Something went wrong. Try again later.'
        });
        return;
      }
      res.redirect('/');
    });
  });
});

module.exports = router;
