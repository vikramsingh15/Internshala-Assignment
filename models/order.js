const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  menuId: {
    type: Schema.Types.ObjectId,
    ref: 'menu'
  },
  quantity: Number,

  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('order', orderSchema);
