const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

module.exports = {
  register: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        username: args.userInput.username,
        email: args.userInput.email,
        password: hashedPassword,
        mobile: 0,
        address: "",
        city: "",
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User does not exist!");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password is incorrect!");
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "4h",
      }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },

  getUser: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("You are not authenticated");
    // }
    return await User.findById(args.userId);
  },

  updateUser: async (args, req) => {
    // if (!req.isAuth) {
    //   throw new Error("Unauthenticated!");
    // }

    console.log(args.userInput);
    return await User.findByIdAndUpdate(args.userInput.userId, {
      username: args.userInput.username,
      mobile: args.userInput.mobile,
      address: args.userInput.address,
      city: args.userInput.city,
    });
  },
};
