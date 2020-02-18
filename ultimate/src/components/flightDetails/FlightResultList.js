import React from "react";
import { Row, Col, Button, Card, Image, CardDeck } from "react-bootstrap";
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
        return data;
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
      <CardDeck>
        {/* present the flight result in an array of cards */}
        {/* a[0].map((b,c)=> {let k=[]; k.push(b); for(let i=1; i<a.length; i++){k.push(a[i][c])}; w.push(k)}) */}
        {this.props.flightData[0].length > 0
          ? this.props.flightData[0].map((flight, index) => {
              let joinedData = [];
              joinedData.push(flight);
              for (let i = 1; i < this.props.flightData.length; i++) {
                joinedData.push(this.props.flightData[i][index]);
              }
              // declare outbound flight variables
              let outboundTime = joinedData.map(flight =>
                flight.itineraries[0].duration.slice(2).split("H")
              );
              let outboundItineraryDeparture = joinedData.map(
                flight => flight.itineraries[0].segments[0].departure
              );
              let outboundStops = joinedData.map(
                flight => flight.itineraries[0].segments.length - 1
              );
              let outboundItineraryArrival = joinedData.map(
                flight =>
                  flight.itineraries[0].segments[
                    flight.itineraries[0].segments.length - 1
                  ].arrival
              );
              // console.log(
              //   outboundItineraryArrival,
              //   outboundItineraryDeparture,
              //   outboundStops,
              //   outboundStops
              // );

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
                      <Col xs={9}>
                        {joinedData.map((flight, i) => {
                          return (
                            <Row key={i}>
                              <Col
                                xs={3}
                                className={
                                  length === 1 ? "align-self-center" : ""
                                }
                              >
                                <Image
                                  src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${flight.itineraries[0].segments[0].carrierCode}`}
                                  fluid
                                />
                              </Col>
                              <Col
                                xs={9}
                                className={
                                  length === 1 ? "align-self-center" : ""
                                }
                              >
                                {`${outboundItineraryDeparture[i].iataCode} ${
                                  outboundItineraryDeparture[i].at.split("T")[1]
                                }`}
                                <FontAwesomeIcon
                                  icon={["fas", "long-arrow-alt-right"]}
                                  className="mr-1 ml-1"
                                  style={{ color: "blue" }}
                                  size="lg"
                                />
                                {`${outboundTime[i][0]}H ${
                                  outboundTime[i][1]
                                }  |  ${outboundStops[i]} ${
                                  outboundStops[i] > 1 ? "stops" : "stop"
                                }`}
                                <FontAwesomeIcon
                                  icon={["fas", "long-arrow-alt-right"]}
                                  className="mr-1 ml-1"
                                  style={{ color: "blue" }}
                                  size="lg"
                                />{" "}
                                {`${outboundItineraryArrival[i].iataCode} ${
                                  outboundItineraryArrival[i].at.split("T")[1]
                                }`}
                              </Col>
                            </Row>
                          );
                        })}

                        {flight.itineraries.length > 1 ? (
                          <Row>
                            <Col xs={3}>
                              <Image
                                src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${
                                  flight.itineraries[1].segments[
                                    flight.itineraries[1].segments.length - 1
                                  ].carrierCode
                                }`}
                                fluid
                              />
                            </Col>

                            <Col xs={9}>
                              {`${inboundItineraryDeparture.iataCode} ${
                                inboundItineraryDeparture.at.split("T")[1]
                              }`}{" "}
                              <FontAwesomeIcon
                                icon={["fas", "long-arrow-alt-right"]}
                                className="mr-1 ml-1"
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
                                className="mr-1 ml-1"
                                style={{ color: "blue" }}
                                size="lg"
                              />{" "}
                              {`${inboundItineraryArrival.iataCode} ${
                                inboundItineraryArrival.at.split("T")[1]
                              }`}
                            </Col>
                          </Row>
                        ) : (
                          ""
                        )}
                      </Col>

                      <Col xs={3}>
                        {/* {`${prices.length} ${
                                prices.length > 1 ? "deals" : "deal"
                              } from`} */}
                        <div>
                          <span>&#8358;</span>
                          {`${joinedData
                            .reduce(
                              (total, tripData) =>
                                total + tripData.price.total * 1,
                              0
                            )
                            .toFixed(2)}`}
                          {/* {`${flight.price.total}`} */}
                        </div>

                        {this.props.flightData.length === 1 ? (
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
                        ) : (
                          ""
                        )}

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
                    </Row>
                  </Card.Body>
                </Card>
              );
            })
          : "No result matches your search"}
      </CardDeck>
    );
  }
}

export default FlightResultList;
