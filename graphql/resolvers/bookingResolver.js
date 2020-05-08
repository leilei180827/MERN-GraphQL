const Booking = require("../../modals/booking");
const { transformBooking } = require("./merge");
const { findUser } = require("./merge");
module.exports = {
  bookings: async () => {
    try {
      const results = await Booking.find();
      return results.map((result) => {
        return transformBooking(result);
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
      return transformBooking(savedBooking);
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
