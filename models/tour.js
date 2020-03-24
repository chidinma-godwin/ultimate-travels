const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TourSchema = new Schema(
  {
    id: String,
    name: String,
    slug: String,
    description: String,
    details: [Schema.Types.Mixed],
    advertised_departures: [Schema.Types.Mixed],
    geography: Schema.Types.Mixed,
    images: [Schema.Types.Mixed],
    site_links: [Schema.Types.Mixed]
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
  }
);

const Tours = mongoose.model("Tours", TourSchema);
module.exports = Tours;
