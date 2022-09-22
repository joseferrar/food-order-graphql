const authResolver = require("./auth");
const restaurantResolver = require("./restaurant");
const productResolver = require("./product");
const orderResolver = require("./order");
const rootResolver = {
  ...authResolver,
  ...restaurantResolver,
  ...productResolver,
  ...orderResolver,
};

module.exports = rootResolver;
