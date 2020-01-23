import React from "react";
import Oneway from "./booking_subComponents/Oneway";
import { Tabs, Tab, Card, FormCheck } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Booking extends React.Component {
  constructor() {
    super();
    this.state = {
      oneway: false,
      roundtrip: true,
      multipletrip: false,
      tripCount: 1
    };
  }

  handleAddTrip = () => {
    this.setState({ tripCount: this.state.tripCount + 1 });
  };

  handleRemoveTrip = () => {
    this.setState({ tripCount: Math.max(this.state.tripCount - 1, 2) });
  };

  handleOnewayChange = () => {
    this.setState(prevState => ({
      oneway: !prevState.oneway,
      roundtrip: false,
      multipletrip: false
    }));
  };

  handleRoundTripChange = () => {
    this.setState(prevState => ({
      roundtrip: !prevState.roundtrip,
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

  render() {
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
      <React.Fragment>
        <Card>
          <Card.Header>
            <Tabs variant="tabs" defaultActiveKey="flights">
              <Tab
                title={
                  <div>
                    <FontAwesomeIcon
                      icon={["fas", "plane-departure"]}
                      className="mr-2"
                      style={{ color: "blue" }}
                      size="lg"
                    />
                    <span>Flights</span>
                  </div>
                }
                eventKey="flights"
              ></Tab>

              <Tab
                title={
                  <div>
                    <span>
                      <FontAwesomeIcon
                        icon={["fas", "bed"]}
                        className="mr-2"
                        style={{ color: "blue" }}
                        size="lg"
                      />
                      Hotels
                    </span>
                  </div>
                }
                eventKey="hotel"
              ></Tab>

              <Tab
                title={
                  <div>
                    <FontAwesomeIcon
                      icon={["fas", "car"]}
                      className="mr-2"
                      style={{ color: "blue" }}
                      size="lg"
                    />
                    <span>Car</span>
                  </div>
                }
                eventKey="car"
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
          </Card.Header>
          <Card.Body
            style={{
              backgroundColor: "rgb(24, 21, 21)",
              color: "white"
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
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

export default Booking;
