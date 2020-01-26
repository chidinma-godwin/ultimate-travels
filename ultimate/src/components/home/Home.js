import React from "react";
import MainImage from "./homeSubs/MainImage";
import HolidayPackages from "./homeSubs/HolidayPackages";
import FlightDealsQuery from "./homeSubs/FlightDealsQuery";
import { Container } from "react-bootstrap";

const Home = props => {
  const { deals } = props;
  return (
    <React.Fragment>
      <MainImage />
      <Container>
        {/* <Booking /> */}
        <br />
        <br />
        <br />
        <h2 className="text-center">Top flight Deals</h2>
        <FlightDealsQuery />
        <br />
        <h2 className="text-center">Top Holiday Packages</h2>
        <HolidayPackages deals={deals} />
      </Container>
    </React.Fragment>
  );
};
export default Home;
