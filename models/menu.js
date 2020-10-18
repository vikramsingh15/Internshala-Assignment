const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = Schema({
  foodName: String,
  image: String,
  description: String,
  foodCategory: String,
  date: { type: Date, default: Date.now },
  price: Number,
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('menu', menuSchema);
