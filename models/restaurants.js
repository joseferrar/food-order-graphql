const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Restaurant = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
});

module.exports = mongoose.model("Restaurant", Restaurant);
