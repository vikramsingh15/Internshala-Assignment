const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  typeAccess: { type: String },
  foodPreference: { type: String },
  date: { type: Date, default: Date.now },
  cart: { items: Object, totalAmount: Number, totalQty: Number }
});

module.exports = mongoose.model('user', userSchema);
