import React from "react";
import { Row, Col, Button, Card, Image } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FlightResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      queryVariable: {}
    };
  }

  handleCheckOffer = id => {
    this.setState(() => {
      let selectedData = this.props.flightData.filter(
        flight => flight.id === id
      );
      console.log(selectedData);

      // Format the data to match the checkOfferQuery argument before passing it
      selectedData.map(data => {
        delete data.averageDuration;
        data.itineraries.map(itinerary => delete itinerary.durationMins);
        if (data.numStops) delete data.numStops;
        if (data.uniqueAirlinesList) delete data.uniqueAirlinesList;
      });

      let queryVariable = {};
      queryVariable.data = {};
      queryVariable.data.type = "flight-offers-pricing";
      queryVariable.data.flightOffers = selectedData;

      console.log(queryVariable);
      return {
        redirect: "/checkOfferAvailability",
        queryVariable
      };
    });
  };

  render() {
    if (this.state.redirect) {
      if (this.state.redirect) {
        return (
          <Redirect
            push
            to={{
              pathname: this.state.redirect,
              state: {
                queryVariable: this.state.queryVariable,
                userInfo: this.props.userInfo
              }
            }}
          />
        );
      }
    }
    return (
      <React.Fragment>
        {/* present the flight result in an array of cards */}
        {this.props.flightData.length > 0
          ? this.props.flightData.map(flight => {
              // declare outbound flight variables
              let outboundTime = flight.itineraries[0].duration
                .slice(2)
                .split("H");
              let outboundItineraryDeparture =
                flight.itineraries[0].segments[0].departure;
              let outboundStops = flight.itineraries[0].segments.length - 1;
              let outboundItineraryArrival =
                flight.itineraries[0].segments[
                  flight.itineraries[0].segments.length - 1
                ].arrival;

              // declare inbound flight variables
              let inboundTime,
                inboundItineraryDeparture,
                inboundItineraryArrival,
                inboundStops;
              if (flight.itineraries.length > 1) {
                inboundTime = flight.itineraries[1].duration
                  .slice(2)
                  .split("H");
                inboundItineraryDeparture =
                  flight.itineraries[1].segments[0].departure;
                inboundStops = flight.itineraries[1].segments.length - 1;
                inboundItineraryArrival =
                  flight.itineraries[1].segments[
                    flight.itineraries[1].segments.length - 1
                  ].arrival;
              }
              let length = flight.itineraries.length;

              return (
                <Card
                  key={flight.id}
                  className="mb-3"
                  style={{ fontWeight: "bold" }}
                  // style={{ width: "68%", marginLeft: "auto" }}
                >
                  <Card.Body>
                    <Row className="mb-2">
                      <Col
                        xs={2}
                        className={length === 1 ? "align-self-center" : ""}
                      >
                        <Image
                          src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${flight.itineraries[0].segments[0].carrierCode}`}
                          fluid
                        />
                      </Col>
                      <Col
                        xs={7}
                        className={length === 1 ? "align-self-center" : ""}
                      >
                        {`${outboundItineraryDeparture.iataCode} ${
                          outboundItineraryDeparture.at.split("T")[1]
                        }`}
                        <FontAwesomeIcon
                          icon={["fas", "long-arrow-alt-right"]}
                          className="mr-3 ml-3"
                          style={{ color: "blue" }}
                          size="lg"
                        />
                        {`${outboundTime[0]}H ${
                          outboundTime[1]
                        }  |  ${outboundStops} ${
                          outboundStops > 1 ? "stops" : "stop"
                        }`}
                        <FontAwesomeIcon
                          icon={["fas", "long-arrow-alt-right"]}
                          className="mr-3 ml-3"
                          style={{ color: "blue" }}
                          size="lg"
                        />{" "}
                        {`${outboundItineraryArrival.iataCode} ${
                          outboundItineraryArrival.at.split("T")[1]
                        }`}
                      </Col>

                      <Col xs={3}>
                        {/* {`${prices.length} ${
                                prices.length > 1 ? "deals" : "deal"
                              } from`} */}
                        <div>
                          <span>&#8358;</span>
                          {`${flight.price.total}`}
                        </div>

                        <div
                          className="mt-2 mb-2"
                          style={{
                            border: "1px solid green",
                            width: "fit-content",
                            padding: "0.5em"
                          }}
                        >
                          {`${flight.numberOfBookableSeats} seats left`}
                        </div>

                        <div>
                          <Button
                            onClick={() => this.handleCheckOffer(flight.id)}
                          >
                            {/* <a href="#" style={{ color: "white" }}> */}
                            Select
                            {/* </a> */}
                          </Button>
                        </div>
                      </Col>
                      <br />
                      <br />

                      {flight.itineraries.length > 1 ? (
                        <React.Fragment>
                          <Col xs={2}>
                            <Image
                              src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${
                                flight.itineraries[1].segments[
                                  flight.itineraries[1].segments.length - 1
                                ].carrierCode
                              }`}
                              fluid
                            />
                          </Col>

                          <Col xs={7}>
                            {`${inboundItineraryDeparture.iataCode} ${
                              inboundItineraryDeparture.at.split("T")[1]
                            }`}{" "}
                            <FontAwesomeIcon
                              icon={["fas", "long-arrow-alt-right"]}
                              className="mr-3 ml-3"
                              style={{ color: "blue" }}
                              size="lg"
                            />
                            {`${inboundTime[0]}H ${
                              inboundTime[1]
                            }  |  ${inboundStops} ${
                              inboundStops > 1 ? "stops" : "stop"
                            }`}{" "}
                            <FontAwesomeIcon
                              icon={["fas", "long-arrow-alt-right"]}
                              className="mr-3 ml-3"
                              style={{ color: "blue" }}
                              size="lg"
                            />{" "}
                            {`${inboundItineraryArrival.iataCode} ${
                              inboundItineraryArrival.at.split("T")[1]
                            }`}
                          </Col>
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                    </Row>
                  </Card.Body>
                </Card>
              );
            })
          : "No result matches your search"}
      </React.Fragment>
    );
  }
}

export default FlightResultList;
