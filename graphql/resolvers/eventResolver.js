const Event = require("../../modals/event");
const User = require("../../modals/user");
const { findUser } = require("./merge");

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
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        date: new Date(args.eventInput.date),
        price: Number(args.eventInput.price),
        creator: req.userId,
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
};
