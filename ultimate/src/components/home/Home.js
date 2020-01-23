import React from "react";
import MainImage from "./homeSubs/MainImage";
import HolidayPackages from "./homeSubs/HolidayPackages";
import Booking from "./homeSubs/booking/Booking";
import FlightDealsQuery from "./homeSubs/FlightDealsQuery";

const Home = props => {
  const { deals } = props;
  return (
    <React.Fragment>
      <MainImage />
      <div className="container">
        <Booking />
        <br />
        <h2 className="text-center">Top flight Deals</h2>
        <FlightDealsQuery />
        <br />
        <h2 className="text-center">Top Holiday Packages</h2>
        <HolidayPackages deals={deals} />
      </div>
    </React.Fragment>
  );
};
export default Home;
