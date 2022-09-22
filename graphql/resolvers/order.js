const Order = require("../../models/order");

module.exports = {
  orders: async (_, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    return await Order.find({});
  },

  addOrder: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated!");
    // }
    // const { cartInput } = req.body.variables;
    console.log(args);
    const { cartInput, total } = args;

    // var cartValid = await Cart.findOne({
    //   product_name: cartInput.product_name,
    // });
    // if (cartValid) {
    //   throw new Error("alreay in your cart");
    // }
    const cart = new Order({
      order: cartInput,
      total: total,
    });
    try {
      await cart.save();
      return cart;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
