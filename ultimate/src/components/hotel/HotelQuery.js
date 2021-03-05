import React from "react";
import { Query } from "react-apollo";
import { getHotels } from "../../queries";
import { Spinner } from "react-bootstrap";
import HotelResult from "./HotelResult";

const HotelQuery = (props) => {
  let {
    from,
    checkIn,
    checkOut,
    adults,
    rooms,
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
        currency: currency,
      }}
    >
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
              We are currently unable to complete the hotel search. Please try
              again.
            </div>
          );
        }

        let emptyData = {};
        emptyData.hotels = {};
        emptyData.hotels.data = [];

        return (
          <HotelResult
            data={data.hotels ? data : emptyData}
            userInfo={props.location.state.searchParams}
          />
        );
      }}
    </Query>
  );
};

export default HotelQuery;
