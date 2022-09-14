const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  restaurant: {
    type: String,
  },
  qty: {
    type: Number,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
}
});

module.exports = mongoose.model("Cart", cartSchema);
