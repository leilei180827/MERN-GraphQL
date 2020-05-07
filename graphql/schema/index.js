const { buildSchema } = require("graphql");
module.exports = buildSchema(`
type Event {
  _id:ID
  title:String!
  description:String!
  price:Float!
  date:String!
  creator:User!
}
input EventInput {
  title:String!
  description:String!
  price:Float!
  date:String!
}
type Booking {
  _id:ID
  event:Event!
  user:User!
  createdAt: String!
  updatedAt: String!
}
type User{
    _id:ID
    email:String!
    createEvents:[Event!]
}
input UserInput {
    email:String!
    password:String!
}

schema {
  query: RootQuery,
  mutation: RootMutation
}
type RootQuery {
  events: [Event!]!
  users:[User!]!
  bookings:[Booking!]!
  
}
type RootMutation {
  createEvent(eventInput:EventInput): Event
  createUser(userInput:UserInput):User
  bookEvent(eventId:ID!): Booking
  cancelBooking (bookingId:ID!): Event
}
`);
