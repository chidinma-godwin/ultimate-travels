import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";

const ItineraryItem = ({
  carrierCode,
  departureCode,
  arrivalCode,
  departureTime,
  arrivalTime,
  duration,
  stops
}) => (
  <React.Fragment>
    <Col xs={2}>
      <Image
        src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${carrierCode}`}
        fluid
      />
    </Col>
    <Col xs={7}>
      {`${departureCode} ${departureTime.at.split("T")[1]}  ----${
        duration[0]
      }H ${duration[1]}  |  ${stops} ${
        stops > 1 ? "stops" : "stop"
      } ---- ${arrivalCode} ${arrivalTime.at.split("T")[1]}`}
    </Col>
  </React.Fragment>
);

ItineraryItem.propTypes = {
  carrierCode: PropTypes.string.isRequired,
  departureCode: PropTypes.string.isRequired,
  arrivalCode: PropTypes.string.isRequired,
  departureTime: PropTypes.string.isRequired,
  arrivalTime: PropTypes.string.isRequired,
  stops: PropTypes.number.isRequired,
  duration: PropTypes.array.isRequired
};

export default ItineraryItem;
