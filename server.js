// Import required packages
const express = require('express');
const unirest = require('unirest');
const cors = require('cors');
require('dotenv').config();

// import required files
const { rapidapi } = require('./config/keys');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=> {
    console.log("Hello world!");
    res.send("Hello world");
})

app.get('/api/flights/:query', (req,res)=> {
    unirest.get("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/NG/NGN/en-GB/")
.query({
	"query": req.params.query
})
.headers({
	"x-rapidapi-host": rapidapi.host,
	"x-rapidapi-key": rapidapi.secretKey
})
.end(response=> {
	if (response.error) throw new Error(response.error);

    let places = response.body.Places;
    //let newPlaces = places.map(place=> place.PlaceName)
    res.status(200).send(places);
});
})

// Set the port
const port = process.env.PORT || 4000;
app.listen(port, console.log(`Server listening on port: ${port}`));
