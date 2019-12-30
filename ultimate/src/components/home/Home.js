import React from "react";
import MainImage from "./home_subComponents/MainImage";
import HolidayPackages from "./home_subComponents/HolidayPackages";
import FlightDeals from "./home_subComponents/FlightDeals";
import Booking from "./home_subComponents/booking/Booking";

const Home = props => {
  const { deals } = props;
  return (
    <React.Fragment>
      <MainImage />
      <div className="container">
        <Booking />
        <br />
        <h2 className="text-center">Top flight Deals</h2>
        <FlightDeals />
        <br />
        <h2 className="text-center">Top Holiday Packages</h2>
        <HolidayPackages deals={deals} />
      </div>
    </React.Fragment>
  );
};
export default Home;
