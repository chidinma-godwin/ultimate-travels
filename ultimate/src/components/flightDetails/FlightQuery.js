import React from "react";
import { ProgressBar } from "react-bootstrap";
import { Query } from "react-apollo";
import { getFlightDetails } from "../../queries/queries";
import QueryResult from "./QueryResult";

function FlightQuery(props) {
  let { userInfo } = props.location.state;
  let { currency } = props;
  return (
    <Query
      query={getFlightDetails}
      variables={{
        originLocationCode: userInfo.originLocationCode,
        destinationLocationCode: userInfo.destinationLocationCode,
        departureDate: userInfo.departureDate,
        returnDate: userInfo.returnDate,
        adults: userInfo.adults * 1,
        children: userInfo.children ? userInfo.children * 1 : undefined,
        infants: userInfo.infants ? userInfo.infants * 1 : undefined,
        travelClass: userInfo.travelClass ? userInfo.travelClass : undefined,
        currencyCode: currency
      }}
    >
      {({ error, loading, data }) => {
        if (loading) return <ProgressBar now={25} />;
        if (error) {
          console.log(error);
          return "Please fill the flight form";
        }

        console.log(data);

        return <QueryResult data={data} userInfo={userInfo} />;
      }}
    </Query>
  );
}

export default FlightQuery;
