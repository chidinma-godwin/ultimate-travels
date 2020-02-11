const { gql } = require("apollo-server-express");

const tour = gql`
  extend type Query {
    Tour: TourResult
  }

  type TourResult {
    count: Int
    max_per_page: Int
    current_page: Int
    links: [TourLinks]
    results: [ResultType]
  }

  type TourLinks {
    href: String
    rel: String
  }

  type ResultType {
    id: String
    href: String
    name: String
    product_line: String
    departures_start_date: String
    departures_end_date: String
  }
`;

module.exports = tour;
