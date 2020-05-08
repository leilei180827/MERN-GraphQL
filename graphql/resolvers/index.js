const userResolver = require("./userResolver");
const bookingResolver = require("./bookingResolver");
const eventResolver = require("./eventResolver");
const rootResolver = {
  ...userResolver,
  ...bookingResolver,
  ...eventResolver,
};
module.exports = rootResolver;
