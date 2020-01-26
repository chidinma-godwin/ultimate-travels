// import required packages
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const mongoose = require("mongoose");
//const bodyParser = require('body-parser');
require("dotenv").config();

// import required files
const typeDefs = require("./typeDefs/typeDefs");
const resolvers = require("./resolvers/resolvers");
const sessionRoutes = require("./session");
//const { resolvers } = require('./schema');

const app = express();

// Setup the database
mongoose.connect(
  "mongodb+srv://chidex:chidi2SUWA@ultimate-ojdty.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection
  .once("open", () =>
    console.log("Mongoose connected to database successfully")
  )
  .on("error", () => console.log("Mongoose connection error"));

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.disable("x-powered-by");

app.use("/skyscanner", sessionRoutes);

// graphql server
const server = new ApolloServer({
  typeDefs,
  resolvers
  // context: ({ req, res }) => {
  //   res.set({ "Access-Control-Expose-Headers": "*" });
  // },
  // formatResponse: (response, requestContext) => {
  //   const location = requestContext.context.res.location
  //     ? requestContext.context.res.location
  //     : "no location header";
  //   response = Object.assign(response, {
  //     extensions: {
  //       headers: {
  //         location: location
  //       }
  //     }
  //   });
  //   return response;
  // }
});
server.applyMiddleware({ app });

// Set the port
const Port = process.env.PORT || 5000;
app.listen({ port: Port }, () =>
  console.log(
    `Server is listening on port: http://localhost:${Port}${server.graphqlPath}`
  )
);
