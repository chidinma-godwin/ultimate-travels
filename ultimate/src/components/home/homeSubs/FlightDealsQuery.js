import React from "react";
import { Query } from "react-apollo";
import { getInspirationPlaces } from "../../../queries/queries";
import TopFlightDeals from "./TopFlightDeals";

function FlightDealsQuery() {
  return (
    <Query
      query={getInspirationPlaces}
      variables={{
        origin: "fra",
        //   departureDate: String
        viewBy: "COUNTRY"
      }}
    >
      {({ error, loading, data }) => {
        if (loading) return "loading...";
        if (error) {
          console.log(error);
          return "No deals available presently";
        }

        console.log(data);
        return <TopFlightDeals data={data} />;
      }}
    </Query>
  );
}

export default FlightDealsQuery;
