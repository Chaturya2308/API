const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  dishName: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true }
});

module.exports = mongoose.model('Dish', dishSchema);
