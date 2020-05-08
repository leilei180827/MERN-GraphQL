const User = require("../../modals/user");
const bcrypt = require("bcryptjs");
const { findEvents } = require("./merge");
module.exports = {
  users: async () => {
    try {
      const users = await User.find();
      return users.map((user) => {
        return {
          ...user._doc,
          createEvents: findEvents.bind(this, user._doc.createEvents),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  createUser: async (args) => {
    try {
      const emailAlreadyUsed = await User.findOne({
        email: args.userInput.email,
      });
      if (emailAlreadyUsed) throw new Error("Email already exists");
      let hashedPassword = await bcrypt.hash(args.userInput.password, 10);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const createdUser = await user.save();
      return createdUser;
    } catch (error) {
      throw error;
    }
  },
};
