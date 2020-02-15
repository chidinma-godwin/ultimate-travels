import React from "react";
import { Query } from "react-apollo";
import { getInspirationPlaces } from "../../../queries/queries";
import TopFlightDeals from "./TopFlightDeals";
import ErrorBoundary from "../../ErrorBoundary";

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
          return "Sorry, we're presently unable to show top flight deals. Please try again";
        }

        console.log(data);
        const emptyData = {};
        emptyData.flightInspiration = {};
        emptyData.flightInspiration.data = [];
        return data.flightInspiration ? (
          <ErrorBoundary>
            <TopFlightDeals data={data.flightInspiration ? data : emptyData} />
          </ErrorBoundary>
        ) : (
          "Sorry, we're presently unable to show top flight deals. Please reload the page"
        );
      }}
    </Query>
  );
}

export default FlightDealsQuery;
