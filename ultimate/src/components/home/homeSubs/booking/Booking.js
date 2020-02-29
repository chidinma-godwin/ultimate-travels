import React from "react";
import Trip from "./booking_subComponents/Trip";
import { Tabs, Tab, Card, FormCheck } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";
import ReactResizeDetector from "react-resize-detector";
import HotelForm from "../../../hotel/HotelForm";

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleTrip: false,
      roundtrip: true,
      multipletrip: false,
      tripCount: 1,
      activeTab: "Flights",
      redirect: null
    };
    this.heightChange = false;
  }

  calculateHeight = element => {
    if (element) {
      this.cardRef = element;
      const height = element.getBoundingClientRect().height;
      this.props.changeImageHeight(height);
    }
  };

  componentDidUpdate() {
    if (this.heightChange) {
      const height = this.cardRef.getBoundingClientRect().height;
      console.log(height);
      this.props.changeImageHeight(height);
      this.heightChange = false;
    }
  }

  handleAddTrip = () => {
    this.heightChange = true;
    this.setState(prevState => {
      // this.selectedCityOptions.push(this.cityArray[prevState.tripCount]);
      return { tripCount: prevState.tripCount + 1 };
    });
  };

  handleRemoveTrip = () => {
    this.heightChange = true;
    this.setState(prevState => {
      //this.selectedCityOptions.pop();
      return { tripCount: Math.max(prevState.tripCount - 1, 1) };
    });
  };

  handleSingleTripChange = () => {
    this.heightChange = true;
    this.setState(prevState => ({
      singleTrip: !prevState.one,
      tripCount: 1,
      roundtrip: false,
      multipletrip: false
    }));
  };

  handleRoundTripChange = () => {
    this.heightChange = true;
    this.setState(prevState => ({
      roundtrip: !prevState.roundtrip,
      tripCount: 1,
      singleTrip: false,
      multipletrip: false
    }));
  };

  handleMultipleTripChange = () => {
    this.heightChange = true;
    //this.selectedCityOptions.push(this.cityArray[1]);
    this.setState(prevState => ({
      multipletrip: !prevState.multipletrip,
      tripCount: 2,
      roundtrip: false,
      singleTrip: false
    }));
  };

  handleDubaiVisa = key => {
    this.heightChange = true;
    this.setState({ activeTab: key });
    if (key === "UAE") {
      this.setState({
        redirect: "/visaApplicationForm"
      });
    }
  };

  onResize = (width, height) => {
    this.props.changeImageHeight(height);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />;
    }

    let cityArray = [
      "firstCity",
      "secondCity",
      "thirdCity",
      "fourthCity",
      "fifthCity",
      "sixthCity"
    ];
    let selectedCityOptions = [];

    for (let i = 0; i < this.state.tripCount; i++) {
      selectedCityOptions.push(cityArray[i]);
    }

    return (
      <Card
        style={{
          background: "none",
          border: "none",
          position: "absolute"
        }}
        ref={this.calculateHeight}
        // ref={cardElement => {
        //   this.cardElement = cardElement;
        // }}
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
                  id="one"
                  checked={this.state.singleTrip}
                  onChange={this.handleSingleTripChange}
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

                {/* {trips} */}
                <Trip
                  currency={this.props.currency}
                  selectedCityOptions={selectedCityOptions}
                  singleTrip={this.state.singleTrip}
                  multipletrip={this.state.multipletrip}
                />
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
              <div
                style={{
                  padding: "1em",
                  color: "white",
                  backgroundColor: "rgba(0,0,0,0.7)"
                }}
              >
                <HotelForm />
              </div>
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
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.onResize}
        />
      </Card>
    );
  }
}

export default Booking;
