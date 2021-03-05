import React from "react";
import { Query } from "react-apollo";
import { Spinner } from "react-bootstrap";
import { getTravelers } from "../../queries/traveler";
import Travelers from "./Travelers";

const TravelersQuery = () => {
  return (
    <Query query={getTravelers}>
      {({ error, loading, data }) => {
        if (loading)
          return (
            <div className="query_status">
              <Spinner
                animation="border"
                size="lg"
                variant="primary"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          );

        if (error) {
          return (
            <div className="query_status">
              Sorry, we are currently unable to retrieve traveler's info. Please
              try again.
            </div>
          );
        }

        return <Travelers data={data.allTravelers} />;
      }}
    </Query>
  );
};

export default TravelersQuery;
