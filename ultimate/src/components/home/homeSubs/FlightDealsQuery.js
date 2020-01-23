import React from "react";
import { Query } from "react-apollo";
import { getInspirationPlaces } from "../../../queries/queries";
import { FlightDeals } from "./FlightDeals";

const FlightDealsQuery = () => {
  return (
    <Query
      query={getInspirationPlaces}
      variables={{
        origin: "abq",
        //   departureDate: String
        viewBy: "COUNTRY"
      }}
    >
      {({ error, loading, data }) => {
        if (loading) "loading...";
        if (error) {
          console.log(error);
          return "Please fill the flight form";
        }

        console.log(data);
        return <FlightDeals data={data} />;
      }}
    </Query>
  );
};

export default FlightDealsQuery;
