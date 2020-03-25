import React from "react";
import MainImage from "./homeSubs/MainImage";
import HolidayPackages from "./homeSubs/HolidayPackages";
import FlightDealsQuery from "./homeSubs/FlightDealsQuery";
import { Container } from "react-bootstrap";
import TourQuery from "../TourQuery";

const Home = props => {
  const { deals, currency } = props;
  return (
    <React.Fragment>
      <MainImage currency={currency} />
      <Container fluid>
        {/* <Booking /> */}
        <br />
        <br />
        <br />
        <h2 className="text-center">Top flight Deals</h2>
        <FlightDealsQuery />
        <br />
        <br />
        <br />
        <h2 className="text-center mb-3">Top Holiday Packages</h2>
        <TourQuery />
      </Container>
    </React.Fragment>
  );
};
export default Home;
