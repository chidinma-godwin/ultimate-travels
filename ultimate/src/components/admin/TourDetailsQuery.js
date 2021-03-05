import React from "react";
import { Query } from "react-apollo";
import { adopt } from "react-adopt";
import { Spinner } from "react-bootstrap";
import { tourDetailsQuery } from "../../queries/tour";
import TourDetailsResult from "./TourDetailsResult";

const TourDetailsQuery = (props) => {
  let { params } = props.match;
  let selectedTour = [];
  for (const key in params) {
    if (params[key]) selectedTour.push(params[key]);
  }
  let queryObj = {};
  selectedTour.map((id) => {
    return (queryObj[id] = ({ render }) => (
      <Query query={tourDetailsQuery} variables={{ id }}>
        {render}
      </Query>
    ));
  });

  const Composed = adopt(queryObj);

  return (
    <Composed>
      {(result) => {
        let allData = [];
        for (let index in queryObj) {
          if (result[index].loading)
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

          if (result[index].error) {
            return (
              <div className="query_status">
                Currently unable to return tour details. Please try again.
              </div>
            );
          }
          allData.push(result[index].data);
        }

        if (allData.some((tourData) => tourData.tourDetails === null)) {
          return (
            <div className="query_status">
              No Result Found, please try again
            </div>
          );
        }

        return <TourDetailsResult allData={allData} />;
      }}
    </Composed>
  );
};

export default TourDetailsQuery;
