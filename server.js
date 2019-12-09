// import required packages
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
require('dotenv').config();

// import required files
const schema = require('./schema');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// graphql route
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// Set the port
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server listening on port: ${port}`));
