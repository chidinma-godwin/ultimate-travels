import React from "react";
import { ProgressBar, Container, Spinner } from "react-bootstrap";
import { Query } from "react-apollo";
import { adopt } from "react-adopt";
import { getFlightDetails } from "../../queries/queries";
import QueryResult from "./QueryResult";

function FlightQuery(props) {
  let { userInfo, singleTrip } = props.location.state;
  let { currency } = props;
  let queryObj = {};
  userInfo.from.map((origin, i) => {
    let key = origin[0];
    return (queryObj[key] = ({ render }) => (
      <Query
        query={getFlightDetails}
        variables={{
          originLocationCode: origin[1].iataCode,
          destinationLocationCode: userInfo.to[i][1].iataCode,
          departureDate: userInfo.departureDate[i][1]
            .toISOString()
            .split("T")[0],
          returnDate: userInfo.returnDate,
          adults: userInfo.adults * 1,
          children: userInfo.children ? userInfo.children * 1 : undefined,
          infants: userInfo.infants ? userInfo.infants * 1 : undefined,
          travelClass: userInfo.travelClass ? userInfo.travelClass : undefined,
          currencyCode: currency
        }}
      >
        {render}
      </Query>
    ));
  });

  console.log(queryObj);
  const Composed = adopt(queryObj);

  return (
    <Composed>
      {result => {
        let allData = [];
        for (let name in queryObj) {
          if (result[name].loading)
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
          if (result[name].error) {
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

        if (allData.some(tripData => tripData.flightDetails === null)) {
          return (
            <div className="flight_query_status">
              No Result Found, please try again
            </div>
          );
        }

        return (
          <QueryResult
            allData={allData}
            userInfo={userInfo}
            singleTrip={singleTrip}
            currency={currency}
          />
        );
      }}
    </Composed>
  );
}

export default FlightQuery;
