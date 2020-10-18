const { validationResult } = require('express-validator'),
  User = require('../models/user'),
  bcryptjs = require('bcryptjs'),
  jwt = require('jsonwebtoken');

module.exports = {
  //signup
  async register(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name, typeAccess } = req.body;
    try {
      //check user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User with email already exists !!' }]
        });
      }
      //save user

      user = new User({
        email,
        name,
        password,
        typeAccess
      });

      //hash pwd
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hashSync(password, salt);
      await user.save();

      //return jwt
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send('server error');
    }
  },

  //login
  async login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      //check user exists
      let user = await User.findOne({ email });
      if (!user) {
        console.log('a');
        return res.status(400).json({
          errors: [{ msg: 'Invalid credentials !!' }]
        });
      }

      //check whether nickname or password is correct or not
      const isPwdMatch = await bcryptjs.compare(password, user.password);
      if (!isPwdMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid credentials !!' }]
        });
      }

      //return jwt
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 3600000 },
        (err, token) => {
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send('server error');
    }
  },

  async getAccountDetails(req, res, next) {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  }
};
