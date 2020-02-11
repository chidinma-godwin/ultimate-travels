import React from "react";
import { ProgressBar } from "react-bootstrap";
import { Query } from "react-apollo";
import { adopt } from "react-adopt";
import { getFlightDetails } from "../../queries/queries";
import QueryResult from "./QueryResult";

function FlightQuery(props) {
  let { userInfo } = props.location.state;
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
          if (result[name].loading) return <ProgressBar now={25} />;
          if (result[name].error) {
            console.log(result[name].error);
            return "Please fill the flight form";
          }
          allData.push(result[name].data);
        }
        console.log(allData);

        if (allData.some(tripData => tripData.flightDetails === null)) {
          return "No result found";
        }

        return <QueryResult allData={allData} userInfo={userInfo} />;
      }}
    </Composed>
    // <Query
    //   query={getFlightDetails}
    //   variables={{
    //     originLocationCode: userInfo.originLocationCode,
    //     destinationLocationCode: userInfo.destinationLocationCode,
    //     departureDate: userInfo.departureDate,
    //     returnDate: userInfo.returnDate,
    //     adults: userInfo.adults * 1,
    //     children: userInfo.children ? userInfo.children * 1 : undefined,
    //     infants: userInfo.infants ? userInfo.infants * 1 : undefined,
    //     travelClass: userInfo.travelClass ? userInfo.travelClass : undefined,
    //     currencyCode: currency
    //   }}
    // >
    //   {({ error, loading, data }) => {
    //     if (loading) return <ProgressBar now={25} />;
    // if (error) {
    //   console.log(error);
    //   return "Please fill the flight form";
    // }

    //     console.log(data);

    //     return <QueryResult data={data} userInfo={userInfo} />;
    //   }}
    // </Query>
  );
}

export default FlightQuery;
