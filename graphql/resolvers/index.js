const Event = require("../../modals/event");
const User = require("../../modals/user");
const bcrypt = require("bcryptjs");
const findUser = async (userId) => {
  try {
    const creator = await User.findById(userId);
    if (!creator) {
      throw new Error("User not found");
    }
    return {
      ...creator._doc,
      createEvents: findEvents.bind(this, creator._doc.createEvents),
    };
  } catch (error) {
    throw error;
  }
};
const findEvents = async (eventsIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventsIds } });
    return events.map((event) => {
      return {
        ...event._doc,
        creator: findUser.bind(this, event._doc.creator),
      };
    });
  } catch (error) {
    throw error;
  }
};
module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return {
          ...event._doc,
          creator: findUser.bind(this, event._doc.creator),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  createEvent: async (args) => {
    try {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        date: new Date(args.eventInput.date),
        price: Number(args.eventInput.price),
        creator: "5eb3a7efcbc6881784a21e49",
      });
      const existUser = await User.findById(event.creator);
      if (!existUser) throw new Error("User not found");
      existUser.createEvents.push(event);
      const updateUser = await existUser.save();
      const eventSaved = await event.save();
      return {
        ...eventSaved._doc,
        creator: findUser.bind(this, eventSaved._doc.creator),
      };
    } catch (error) {
      throw error;
    }
  },
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
