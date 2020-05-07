const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello world");
});
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_SETTING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT))
  .catch((err) => console.log(err));
