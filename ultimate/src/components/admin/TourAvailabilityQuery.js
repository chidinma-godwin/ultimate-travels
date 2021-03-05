import React from "react";
import { Query } from "react-apollo";
import { adopt } from "react-adopt";
import { Spinner, Table } from "react-bootstrap";
import { tourAvailabilityQuery } from "../../queries/tour";
import TourAvailabilityResult from "./TourAvailabilityResult";

const TourAvailabilityQuery = (props) => {
  let { placesUrl } = props;
  let selectedPlaces = [];

  for (const key in placesUrl) {
    if (placesUrl[key]) selectedPlaces.push(placesUrl[key]);
  }

  let queryObj = {};

  selectedPlaces.map(
    (country) =>
      (queryObj[country] = ({ render }) => (
        <Query query={tourAvailabilityQuery} variables={{ name: country }}>
          {render}
        </Query>
      ))
  );

  const Composed = adopt(queryObj);

  return (
    <Composed>
      {(result) => {
        let allData = [];
        for (let name in queryObj) {
          if (result[name].loading)
            return (
              <div>
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
          if (result[name].error) {
            return (
              <div>
                Currently unable to check tour availability. Please try again.
              </div>
            );
          }
          allData.push(result[name].data);
        }

        let dataArray = [];
        allData.forEach((data) => {
          if (data.Tour) {
            dataArray.push(...data.Tour.results);
          }
        });

        return <TourAvailabilityResult dataArray={dataArray} />;
      }}
    </Composed>
  );
};

export default TourAvailabilityQuery;
