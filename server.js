// import required packages
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const path = require("path");
require("dotenv").config();

// import from files
const User = require("./models/user");
const typeDefs = require("./typeDefs/typeDefs");
const resolvers = require("./resolvers/resolvers");
const getToken = require("./amadeusToken");

const app = express();

const IN_PROD = process.env.NODE_ENV === "production";

if (IN_PROD) {
  app.use(express.static(path.join(__dirname, "ultimate", "build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "ultimate", "build", "index.html"));
  });
}

// Setup the database
mongoose.connect(
  `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@ultimate-ojdty.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection
  .once("open", () =>
    console.log("Mongoose connected to database successfully")
  )
  .on("error", () => console.log("Mongoose connection error"));

// middlewares
app.use(cors({ origin: "http://localhost:4000", credentials: true }));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.disable("x-powered-by");

let redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB),
});
// redisClient.unref();
redisClient.on("error", console.log);

const store = new RedisStore({ client: redisClient });

app.use(
  session({
    store,
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    saveUninitialized: false,
    resave: true,
    rolling: true,
    proxy: true,
    cookie: {
      maxAge: parseInt(process.env.SESS_LIFETIME),
      sameSite: "strict",
      secure: IN_PROD,
      httpOnly: true,
    },
  })
);

// graphql server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    // req.session.userId = req.userId;
    const token = await getToken();
    return {
      req,
      res,
      token,
    };
  },
  playground: false,
});

server.applyMiddleware({ app });

// Set the port
const Port = process.env.PORT || 4000;
app.listen({ port: Port }, () =>
  console.log(`Server is listening on port: http://localhost:${Port}`)
);
