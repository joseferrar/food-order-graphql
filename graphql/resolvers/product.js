const Product = require("../../models/product");

module.exports = {
  createProduct: async (args) => {
    try {
      const product = new Product({
        product_name: args.productInput.product_name,
        product_desc: args.productInput.product_desc,
        price: args.productInput.price,
        imageUrl: args.productInput.imageUrl,
        restaurant: args.productInput.restaurant,
      });
      const result = await product.save();
      return result;
    } catch (err) {
      throw err;
    }
  },
  products: async (_, req) => {
    return await Product.find({});
  },
};
