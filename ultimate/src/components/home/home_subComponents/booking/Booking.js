import React from "react";
import Oneway from "./booking_subComponents/Oneway";
import Roundtrip from "./booking_subComponents/Roundtrip";
import { Tabs, Tab, Card, FormCheck } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Booking extends React.Component {
  constructor() {
    super();
    this.state = {
      oneway: true,
      roundtrip: false,
      multipletrip: false
    };
  }
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
      roundtrip: false,
      oneway: false
    }));
  };

  render() {
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
                    <FontAwesomeIcon
                      icon={["fas", "bed"]}
                      className="mr-2"
                      style={{ color: "blue" }}
                      size="lg"
                    />
                    <span>Hotels</span>
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
            <br />
            {this.state.oneway ? (
              <Oneway />
            ) : this.state.roundtrip ? (
              <Roundtrip />
            ) : this.state.multipletrip ? (
              "This is the multiple trip component"
            ) : (
              <Oneway />
            )}
            {/* <Tabs defaultActiveKey="oneway" variant="pills">
              <Tab title="One way" eventKey="oneway">
                <br />
                <Oneway />
              </Tab>

              <Tab title="Round Trip" eventKey="roundtrip">
                  <br />
                    <Roundtrip />
                </Tab> 

              <Tab title="Multiple Destinations" eventKey="multiple">
                <br />
                <Container>This is for multiple destinations</Container>
              </Tab>
            </Tabs> */}
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

export default Booking;
