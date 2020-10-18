let Menu = require('../models/menu');
let Order = require('../models/order');
let User = require('../models/user');

module.exports = {
  async createOrder(req, res) {
    // check typeAccess
    let user = await User.findById(req.user.id);
    if (user.typeAccess != 'user') {
      return res.json('You must be user');
    }

    let cartItems = req.body.items;
    let Items = Object.values(cartItems);
    Items = Items.map(item => {
      let id = {
        customerId: req.user.id,
        menuId: item._id
      };
      delete item._id;
      return { ...item, ...id };
    });
    // console.log(Items);
    let orders = await Order.insertMany(Items);
    res.json(orders);
  },
  async getOrder(req, res) {
    let orders = await Order.find({ restaurantId: req.user.id })
      .populate({
        path: 'customerId menuId'
      })
      .sort('-date');
    res.json(orders);
  }
};
