const express = require('express'),
  router = express.Router(),
  { asyncErrorHandler, auth } = require('../middleware'),
  { createMenu, getMenu } = require('../controllers/menu'),
  { check } = require('express-validator');

//@Route    POST '/api/menu'
//@desc     create menu
//@access   Private

router.post('/', auth, asyncErrorHandler(createMenu));

//@Route    GET '/api/menu'
//@desc     GET menu
//@access   Public

router.get('/', asyncErrorHandler(getMenu));

module.exports = router;
