const express = require('express'),
  router = express.Router(),
  { asyncErrorHandler, auth } = require('../middleware'),
  { editCart, getCart } = require('../controllers/cart'),
  { check } = require('express-validator');

//@Route    Edit '/api/cart'
//@desc     Edit cart
//@access   Private

router.put('/', auth, asyncErrorHandler(editCart));

//@Route    GET '/api/cart'
//@desc     GET cart
//@access   Private

router.get('/',auth, asyncErrorHandler(getCart));

module.exports = router;
