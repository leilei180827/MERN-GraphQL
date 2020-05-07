const Event = require("../../modals/event");
const User = require("../../modals/user");
const Booking = require("../../modals/booking");
const bcrypt = require("bcryptjs");
const { dateToString } = require("../../helpers/date");
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
const findSingleEvent = async (eventId) => {
  try {
    const event = await Event.findById({ _id: eventId });
    console.log("singleEvent");
    console.log({ ...event });
    return {
      ...event._doc,
      creator: findUser.bind(this, event._doc.creator),
    };
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
  bookings: async () => {
    try {
      const results = await Booking.find();
      return results.map((result) => {
        return {
          ...result._doc,
          event: findSingleEvent.bind(this, result._doc.event),
          user: findUser.bind(this, result._doc.user),
          createdAt: dateToString(result._doc.createdAt),
          updatedAt: dateToString(result._doc.updatedAt),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async (args) => {
    try {
      const newBooking = new Booking({
        event: args.eventId,
        user: "5eb3a7efcbc6881784a21e49",
      });
      const savedBooking = await newBooking.save();
      return {
        ...savedBooking._doc,
        event: findSingleEvent.bind(this, savedBooking._doc.event),
        user: findUser.bind(this, savedBooking._doc.user),
        createdAt: dateToString(savedBooking._doc.createdAt),
        updatedAt: dateToString(savedBooking._doc.updatedAt),
      };
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async (args) => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      if (!booking) {
        throw new Error("booking not found");
      }
      const event = booking.event;
      await Booking.deleteOne({ _id: args.bookingId });
      return {
        ...event._doc,
        creator: findUser.bind(this, event._doc.creator),
      };
    } catch (error) {
      throw error;
    }
  },
};
