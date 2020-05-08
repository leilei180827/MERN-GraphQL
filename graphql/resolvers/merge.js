const { dateToString } = require("../../helpers/date");
const User = require("../../modals/user");
const Event = require("../../modals/event");

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    event: findSingleEvent.bind(this, booking._doc.event),
    user: findUser.bind(this, booking._doc.user),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};
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
    return {
      ...event._doc,
      creator: findUser.bind(this, event._doc.creator),
    };
  } catch (error) {
    throw error;
  }
};
exports.findUser = findUser;
exports.findEvents = findEvents;
exports.findSingleEvent = findSingleEvent;
exports.transformBooking = transformBooking;
