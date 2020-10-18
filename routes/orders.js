const express = require('express'),
  router = express.Router(),
  { asyncErrorHandler, auth } = require('../middleware'),
  { createOrder, getOrder } = require('../controllers/orders'),
  { check } = require('express-validator');

//@Route    POST '/api/orders'
//@desc     create order
//@access   Private

router.post('/', auth, asyncErrorHandler(createOrder));

//@Route    GET '/api/orders'
//@desc     GET all orders for customers or restaurant
//@access   Private

router.get('/', auth, asyncErrorHandler(getOrder));

module.exports = router;
