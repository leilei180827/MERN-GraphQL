const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");
const cors = require("cors");
const isAuth = require("./middleware/authUser");
const app = express();
app.use(bodyParse.json());
app.use(cors());
app.use(isAuth);
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
