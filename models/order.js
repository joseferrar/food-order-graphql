const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
 order: [Object],
 total: Number,
 orderBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Orders", cartSchema);