import React from "react";
import Oneway from "./booking_subComponents/Oneway";
import { Tabs, Tab, Card, FormCheck, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bahrain from "../../../../images/bahrain.jpg";
import { Redirect } from "react-router-dom";

class Booking extends React.Component {
  constructor() {
    super();
    this.state = {
      oneway: false,
      roundtrip: true,
      multipletrip: false,
      tripCount: 1,
      activeTab: "Flights",
      redirect: null
    };
  }

  handleAddTrip = () => {
    this.setState({ tripCount: this.state.tripCount + 1 });
  };

  handleRemoveTrip = () => {
    this.setState({ tripCount: Math.max(this.state.tripCount - 1, 1) });
  };

  handleOnewayChange = () => {
    this.setState(prevState => ({
      oneway: !prevState.oneway,
      tripCount: 1,
      roundtrip: false,
      multipletrip: false
    }));
  };

  handleRoundTripChange = () => {
    this.setState(prevState => ({
      roundtrip: !prevState.roundtrip,
      tripCount: 1,
      oneway: false,
      multipletrip: false
    }));
  };

  handleMultipleTripChange = () => {
    this.setState(prevState => ({
      multipletrip: !prevState.multipletrip,
      tripCount: 2,
      roundtrip: false,
      oneway: false
    }));
  };

  handleDubaiVisa = key => {
    this.setState({ activeTab: key });
    if (key === "UAE") {
      this.setState({
        redirect: "/visaApplicationForm"
      });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />;
    }
    let trips = [];

    for (let i = 0; i < this.state.tripCount; i++) {
      trips.push(
        <Oneway
          key={i}
          oneway={this.state.oneway}
          multipletrip={this.state.multipletrip}
        />
      );
    }

    return (
      <Card
        style={{
          background: "none",
          border: "none",
          position: "absolute"
        }}
      >
        <Card.Body>
          <Tabs
            className="booking-tabs"
            variant="tabs"
            activeKey={this.state.activeTab}
            onSelect={this.handleDubaiVisa}
          >
            <Tab
              title={
                <span>
                  <FontAwesomeIcon
                    icon={["fas", "plane-departure"]}
                    className="mr-2"
                    size="lg"
                  />
                  Flights
                </span>
              }
              eventKey="Flights"
            >
              <div
                style={{
                  padding: "1em",
                  color: "white",
                  backgroundColor: "rgba(0,0,0,0.7)"
                }}
              >
                <FormCheck
                  inline
                  label="One Way"
                  type="radio"
                  name="trip"
                  id="oneway"
                  checked={this.state.oneway}
                  onChange={this.handleOnewayChange}
                />
                <FormCheck
                  inline
                  label="Round trip"
                  type="radio"
                  name="trip"
                  id="roundtrip"
                  checked={this.state.roundtrip}
                  onChange={this.handleRoundTripChange}
                />
                <FormCheck
                  inline
                  label="Multiple Destination"
                  type="radio"
                  name="trip"
                  id="multipletrip"
                  checked={this.state.multipletrip}
                  onChange={this.handleMultipleTripChange}
                />
                <br />
                {this.state.multipletrip ? (
                  <div style={{ width: "fit-content", marginLeft: "auto" }}>
                    {this.state.tripCount < 6 ? (
                      <span className="mr-4" onClick={this.handleAddTrip}>
                        <FontAwesomeIcon
                          icon={["fas", "plus"]}
                          className="mr-2"
                          style={{ color: "white" }}
                          size="lg"
                        />
                        Add Trip
                      </span>
                    ) : (
                      ""
                    )}
                    {this.state.tripCount > 2 ? (
                      <span onClick={this.handleRemoveTrip}>
                        <FontAwesomeIcon
                          icon={["fas", "minus"]}
                          className="mr-2"
                          style={{ color: "white" }}
                          size="lg"
                        />
                        Remove
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
                <br />

                {trips}
              </div>
            </Tab>

            <Tab
              title={
                <div>
                  <span>
                    <FontAwesomeIcon
                      icon={["fas", "bed"]}
                      className="mr-2"
                      size="lg"
                    />
                    Hotels
                  </span>
                </div>
              }
              eventKey="Hotel"
            >
              Search for hotels here
            </Tab>

            <Tab
              title={
                <span>
                  <FontAwesomeIcon
                    icon={["fas", "car"]}
                    className="mr-2"
                    size="lg"
                  />
                  UAE Visa
                </span>
              }
              eventKey="UAE"
            ></Tab>
          </Tabs>
          {/* <Nav.Item className="d-none d-lg-block">
                <Nav.Link href="#disabled" disabled>
                  <FontAwesomeIcon
                    icon={["fas", "book-open"]}
                    className="mr-2"
    ;                //   style={{ color: "blue" }}
                    size="lg"
                  />
                  Check my trip
                </Nav.Link>
              </Nav.Item>
            </Nav> */}
        </Card.Body>
      </Card>
    );
  }
}

export default Booking;
