import React from "react";
import { Query } from "react-apollo";
import { Spinner } from "react-bootstrap";
import { getToursFromDatabase } from "../queries/tour";

export default () => {
  return (
    <Query query={getToursFromDatabase}>
      {({ loading, error, data }) => {
        if (loading) {
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
        }
        if (error) {
          console.log(error);
          return (
            <div className="query_status">
              Sorry, we are currently unable to show available tours. Please try
              again.
            </div>
          );
        }

        console.log(data);
        return "it worked";
      }}
    </Query>
  );
};
