import React from "react";
import { Query } from "react-apollo";
import { adopt } from "react-adopt";
import { Spinner, Table } from "react-bootstrap";
import { tourAvailabilityQuery } from "../../queries/tour";
import TourAvailabilityResult from "./TourAvailabilityResult";

const TourAvailabilityQuery = props => {
  console.log(props);
  let { placesUrl } = props;
  let selectedPlaces = [];
  console.log(placesUrl);

  for (const key in placesUrl) {
    if (placesUrl[key]) selectedPlaces.push(placesUrl[key]);
  }

  let queryObj = {};

  console.log(selectedPlaces);

  selectedPlaces.map(
    country =>
      (queryObj[country] = ({ render }) => (
        <Query query={tourAvailabilityQuery} variables={{ name: country }}>
          {render}
        </Query>
      ))
  );

  const Composed = adopt(queryObj);

  return (
    <Composed>
      {result => {
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
            console.log(result[name].error);
            return (
              <div>
                Currently unable to check tour availability. Please try again.
              </div>
            );
          }
          allData.push(result[name].data);
        }
        console.log(allData);

        let dataArray = [];
        allData.forEach(data => {
          if (data.Tour) {
            dataArray.push(...data.Tour.results);
          }
        });

        console.log(dataArray);

        return <TourAvailabilityResult dataArray={dataArray} />;
      }}
    </Composed>
  );
};

export default TourAvailabilityQuery;
