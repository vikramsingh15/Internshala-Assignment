const User = require('../models/user');

module.exports = {
  async editCart(req, res) {
    let user = await User.findById(req.user.id);
    let cart = req.body;
    user.cart = cart;
    await user.save();
    res.json(cart);
  },
  async getCart(req, res) {
    let user = await User.findById(req.user.id);
    let cart = user.cart;
    // console.log(cart)
    if (!cart.totalAmount) {
      cart = {
        items: {},
        totalAmount: 0,
        totalQty:0
      };
    }
    res.json(cart);
  }
};
