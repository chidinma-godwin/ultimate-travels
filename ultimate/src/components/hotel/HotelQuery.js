import React from "react";
import { Query } from "react-apollo";
import { getHotels } from "../../queries/queries";
import { ProgressBar } from "react-bootstrap";
import HotelResult from "./HotelResult";

const HotelQuery = props => {
  let {
    from,
    checkIn,
    checkOut,
    adults,
    children,
    rooms
  } = props.location.state.searchParams;
  let { currency } = props;
  return (
    <Query
      query={getHotels}
      variables={{
        cityCode: from.iataCode,
        checkInDate: checkIn.toISOString().split("T")[0],
        checkOutDate: checkOut.toISOString().split("T")[0],
        roomQuantity: rooms,
        adults: adults,
        // hotelName: hotelName,
        currency: currency
      }}
    >
      {({ error, loading, data }) => {
        if (loading) return <ProgressBar now={25} />;
        if (error) {
          console.log(error);
          return "Please fill the flight form";
        }

        console.log(data);

        return (
          <HotelResult
            data={data}
            userInfo={props.location.state.searchParams}
          />
        );
      }}
    </Query>
  );
};

export default HotelQuery;
