const mongoose = require("mongoose");
const Schema = mongoose.Schena;

const TourSchema = new Schema({
    name: String,
    slug: String,
    description: String,
});
