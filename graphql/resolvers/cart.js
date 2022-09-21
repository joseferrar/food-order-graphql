const Cart = require("../../models/cart");

module.exports = {
  carts: async (_, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    return await Cart.find({});
  },

  addCart: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated!");
    // }
    // const { cartInput } = req.body.variables;
console.log(args);
const { cartInput } = args;

    // var cartValid = await Cart.findOne({
    //   product_name: cartInput.product_name,
    // });
    // if (cartValid) {
    //   throw new Error("alreay in your cart");
    // }
    const cart = new Cart({
      carts: cartInput,
    });
    try {
      await cart.save();
      return cart;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  deleteCart: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    return await Cart.findByIdAndDelete(args.cartId).exec();
  },

  updateCart: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    const { cartInput } = req.body.variables;
    console.log(cartInput);
    return await Cart.findByIdAndUpdate(args.cartId, {
      product_name: cartInput.product_name,
      product_desc: cartInput.product_desc,
      price: cartInput.price,
      imageUrl: cartInput.imageUrl,
      restaurant: cartInput.restaurant,
      qty: cartInput.qty,
    });
  },
};
