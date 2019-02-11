const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

const router = express.Router();

router.get('/login', (req, res, next) => {
  res.render('auth/login', {
    errorMessage: ''
  });
});

router.post('/login', (req, res, next) => {
  const emailInput = req.body.email;
  const passwordInput = req.body.password;

  if (emailInput === '' || passwordInput === '') {
    res.render('auth/login', {
      errorMessage: 'Enter both email and password to log in.'
    });
    return;
  }
  User.findOne({ email: emailInput }, (err, theUser) => {
    if (err || theUser === null) {
      res.render('auth/login', {
        errorMessage: `There isn't an account with email ${emailInput}.`
      });
      return;
    }
    if (!bcrypt.compareSync(passwordInput, theUser.password)) {
      res.render('auth/login', {
        errorMessage: 'Invalid password.'
      });
      return;
    }
    req.session.currentUser = theUser;
    res.redirect('/');
  });
});

// Session Middleware
router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
    return;
  }

  res.redirect('/login');
});

router.get('/logout', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/');
    return;
  }
  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }

    res.redirect('/');
  });
});

module.exports = router;
