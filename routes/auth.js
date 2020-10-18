const express = require('express'),
  router = express.Router(),
  { asyncErrorHandler, auth } = require('../middleware'),
  { register, login, getAccountDetails } = require('../controllers/auth'),
  { check } = require('express-validator');

//@Route    POST '/api/auth/register'
//@desc     Register the user
//@access   Public

router.post(
  '/register',
  [
    check('email', 'Enter valid email').isEmail(),
    check('password', 'Enter a password with length 4 or more').isLength({
      min: 4
    })
  ],
  asyncErrorHandler(register)
);

//@Route    POST '/api/auth/login'
//@desc     login to website
//@access   Public

router.post(
  '/login',
  [
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'please enter a password').exists()
  ],
  asyncErrorHandler(login)
);

//@Route    GET '/api/auth/account-detail'
//@desc     get the user's account details
//@access   Private

router.get('/account-detail', auth, asyncErrorHandler(getAccountDetails));

module.exports = router;
