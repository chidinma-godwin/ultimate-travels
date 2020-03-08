import React from "react";
import { Query } from "react-apollo";
import { adopt } from "react-adopt";

const TourQuery = () => {
  let queryObj = {};
  countries.map((country, i) => {
    return (queryObj[i] = ({ render }) => (
      <Query query={getTourDestination} variables={{ country }}>
        {render}
      </Query>
    ));
  });

  const Composed = adopt(queryObj);

  return (
    <Composed>
      {result => {
        let allData = [];
        for (let index in queryObj) {
          if (result[index].loading)
            return (
              <div className="flight_query_status">
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

          if (result[index].error) {
            console.log(result[name].error);
            return (
              <div className="flight_query_status">
                Sorry, we are currently unable to retrieve flight data. Please
                try again.
              </div>
            );
          }
          allData.push(result[name].data);
        }
        console.log(allData);

        if (allData.some(tourData => tourData.tourDetails === null)) {
          return (
            <div className="flight_query_status">
              No Result Found, please try again
            </div>
          );
        }

        return <TourQueryResult allData={allData} />;
      }}
    </Composed>
  );
};
