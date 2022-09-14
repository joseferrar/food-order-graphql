const Restaurant = require("../../models/restaurants");

module.exports = {
  restaurants: async (_, req) => {
    return await Restaurant.find({});
  },

  createRestaurant: async (args, req) => {
    const restaurant = new Restaurant({
      name: args.restaurantInput.name,
      image: args.restaurantInput.image,
    });
    try {
      await restaurant.save();
      return restaurant;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
