const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
 carts: [Object],
});

module.exports = mongoose.model("Cart", cartSchema);
