const authResolver = require("./auth");
const restaurantResolver = require("./restaurant");
const productResolver = require("./product");
const cartResolver = require("./cart");
const rootResolver = {
  ...authResolver,
  ...restaurantResolver,
  ...productResolver,
  ...cartResolver,
};

module.exports = rootResolver;
