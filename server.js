// import required packages
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const passport = require("passport");
const { GraphQLLocalStrategy, buildContext } = require("graphql-passport");
const path = require("path");
require("dotenv").config();

// import from files
const User = require("./models/user");
const typeDefs = require("./typeDefs/typeDefs");
const resolvers = require("./resolvers/resolvers");
const getToken = require("./amadeusToken");

passport.use(
  new GraphQLLocalStrategy(async (email, password) => {
    const user = await User.findOne({ email });
    let error;

    if (!user) {
      error = new Error("Incorrect username or password");
      return error;
    }

    if (!(await user.passwordMatch(password))) {
      error = new Error("Incorrect username or password");
      return error;
    }
    return user;
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  await User.findById(id, (err, user) => done(err, user));
});

const app = express();

const IN_PROD = process.env.NODE_ENV === "production";

if (IN_PROD) {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
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
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.disable("x-powered-by");

let redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB),
});
redisClient.unref();
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
    cookie: {
      maxAge: parseInt(process.env.SESS_LIFETIME),
      sameSite: IN_PROD,
      secure: IN_PROD,
    },
  })
);

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// graphql server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    let token = await getToken();
    return buildContext({
      req,
      res,
      token,
    });
  },
  playground: true,
});
server.applyMiddleware({ app });

// Set the port
const Port = process.env.PORT || 4000;
app.listen({ port: Port }, () =>
  console.log(`Server is listening on port: http://localhost:${Port}`)
);
