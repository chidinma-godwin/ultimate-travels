import React from "react";
import { Row, Col, Button, Card, Image, CardDeck } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FlightResultList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      joinedQueryVariable: {}
    };
  }

  handleCheckOffer = id => {
    this.setState(() => {
      let index;
      let selectedData = [];
      let firstTripData = this.props.flightData[0].filter((flight, i) => {
        index = i;
        return flight.id === id;
      });
      selectedData.push(firstTripData);
      for (let i = 1; i < this.props.flightData.length; i++) {
        selectedData.push([this.props.flightData[i][index]]);
      }
      console.log(index);
      console.log(firstTripData);
      console.log(selectedData);
      console.log(this.props.flightData[0]);

      // Format the data to match the checkOfferQuery argument before passing it
      selectedData.map(trip =>
        trip.map(data => {
          delete data.averageDuration;
          data.itineraries.map(itinerary => delete itinerary.durationMins);
          if (data.numStops) delete data.numStops;
          if (data.uniqueAirlinesList) delete data.uniqueAirlinesList;
          if (data.accumulatedPrice) delete data.accumulatedPrice;
          return data;
        })
      );

      let joinedQueryVariable = [];

      for (let i = 0; i < selectedData.length; i++) {
        let queryVariable = {};
        queryVariable.data = {};
        queryVariable.data.type = "flight-offers-pricing";
        queryVariable.data.flightOffers = selectedData[i];
        joinedQueryVariable.push(queryVariable);
      }

      console.log(joinedQueryVariable);
      return {
        redirect: "/checkOfferAvailability",
        joinedQueryVariable
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
                joinedQueryVariable: this.state.joinedQueryVariable,
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
              let outboundDuration = joinedData.map(flight =>
                flight.itineraries[0].duration.slice(2).split("H")
              );
              let outboundItineraryDeparture = joinedData.map(
                flight => flight.itineraries[0].segments[0].departure
              );
              let outboundDepartureTime = joinedData.map(flight => {
                let time = flight.itineraries[0].segments[0].departure.at.split(
                  "T"
                )[1];
                let splittedTimeArray = time.split(":");
                return `${splittedTimeArray[0]}:${splittedTimeArray[1]}`;
              });
              let outboundStops = joinedData.map(
                flight => flight.itineraries[0].segments.length - 1
              );
              let outboundItineraryArrival = joinedData.map(
                flight =>
                  flight.itineraries[0].segments[
                    flight.itineraries[0].segments.length - 1
                  ].arrival
              );
              let outboundArrivalTime = joinedData.map(flight => {
                let time = flight.itineraries[0].segments[
                  flight.itineraries[0].segments.length - 1
                ].arrival.at.split("T")[1];
                let splittedTimeArray = time.split(":");
                return `${splittedTimeArray[0]}:${splittedTimeArray[1]}`;
              });

              // declare inbound flight variables
              let inboundDuration,
                inboundItineraryDeparture,
                inboundDepartureTime,
                inboundArrivalTime,
                inboundItineraryArrival,
                inboundStops;
              if (flight.itineraries.length > 1) {
                let departureTime = flight.itineraries[0].segments[0].departure.at.split(
                  "T"
                )[1];
                let arrivalTime = flight.itineraries[1].segments[
                  flight.itineraries[1].segments.length - 1
                ].arrival.at.split("T")[1];

                let splittedDepartureTimeArray = departureTime.split(":");
                let splittedArrivalTimeArray = arrivalTime.split(":");
                inboundDuration = flight.itineraries[1].duration
                  .slice(2)
                  .split("H");
                inboundItineraryDeparture =
                  flight.itineraries[1].segments[0].departure;
                inboundDepartureTime = `${splittedDepartureTimeArray[0]}:${splittedDepartureTimeArray[1]}`;

                inboundStops = flight.itineraries[1].segments.length - 1;
                inboundItineraryArrival =
                  flight.itineraries[1].segments[
                    flight.itineraries[1].segments.length - 1
                  ].arrival;
                inboundArrivalTime = `${splittedArrivalTimeArray[0]}:${splittedArrivalTimeArray[1]}`;
              }
              let length = flight.itineraries.length;

              return (
                <Card
                  key={flight.id}
                  className="mb-3"
                  style={{ fontWeight: "bold", borderColor: "#f68220" }}
                  // style={{ width: "68%", marginLeft: "auto" }}
                >
                  <Card.Body>
                    <Row className="mb-2">
                      <Col
                        sm={12}
                        md={10}
                        className={length === 1 ? "align-self-center" : ""}
                      >
                        {joinedData.map((flight, i) => {
                          return (
                            <Row key={i} className="align-items-center">
                              <Col sm={6} md={3}>
                                <Image
                                  src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${flight.itineraries[0].segments[0].carrierCode}`}
                                  fluid
                                />
                              </Col>
                              <Col
                                sm={12}
                                md={9}
                                style={{
                                  display: "flex",
                                  justifyContent: "center"
                                }}
                              >
                                {`${outboundItineraryDeparture[i].iataCode} ${outboundDepartureTime[i]}`}
                                <FontAwesomeIcon
                                  icon={["fas", "long-arrow-alt-right"]}
                                  className="mr-1 ml-1"
                                  style={{ color: "blue" }}
                                  size="lg"
                                />
                                {`${outboundDuration[i][0]}H ${
                                  outboundDuration[i][1]
                                }  |  ${outboundStops[i]} ${
                                  outboundStops[i] > 1 ? "stops" : "stop"
                                }`}
                                <FontAwesomeIcon
                                  icon={["fas", "long-arrow-alt-right"]}
                                  className="mr-1 ml-1"
                                  style={{ color: "blue" }}
                                  size="lg"
                                />{" "}
                                {`${outboundItineraryArrival[i].iataCode} ${outboundArrivalTime[i]}`}
                              </Col>
                            </Row>
                          );
                        })}

                        {flight.itineraries.length > 1 ? (
                          <Row className="align-items-center">
                            <Col sm={6} md={3}>
                              <Image
                                src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${
                                  flight.itineraries[1].segments[
                                    flight.itineraries[1].segments.length - 1
                                  ].carrierCode
                                }`}
                                fluid
                              />
                            </Col>

                            <Col
                              sm={12}
                              md={9}
                              style={{
                                display: "flex",
                                justifyContent: "center"
                              }}
                            >
                              {`${inboundItineraryDeparture.iataCode} ${inboundDepartureTime}`}{" "}
                              <FontAwesomeIcon
                                icon={["fas", "long-arrow-alt-right"]}
                                className="mr-1 ml-1"
                                style={{ color: "blue" }}
                                size="lg"
                              />
                              {`${inboundDuration[0]}H ${
                                inboundDuration[1]
                              }  |  ${inboundStops} ${
                                inboundStops > 1 ? "stops" : "stop"
                              }`}{" "}
                              <FontAwesomeIcon
                                icon={["fas", "long-arrow-alt-right"]}
                                className="mr-1 ml-1"
                                style={{ color: "blue" }}
                                size="lg"
                              />{" "}
                              {`${inboundItineraryArrival.iataCode} ${inboundArrivalTime}`}
                            </Col>
                          </Row>
                        ) : (
                          ""
                        )}
                      </Col>

                      <Col
                        sm={12}
                        md={2}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          paddingRight: "1.5em"
                        }}
                      >
                        {/* {`${prices.length} ${
                                prices.length > 1 ? "deals" : "deal"
                              } from`} */}
                        <div>
                          {new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: this.props.currency
                          }).format(
                            Number(
                              joinedData
                                .reduce(
                                  (total, tripData) =>
                                    total + tripData.price.total * 1,
                                  0
                                )
                                .toFixed(2)
                            )
                          )}
                          {/* <span>&#8358;</span>
                          {`${joinedData
                            .reduce(
                              (total, tripData) =>
                                total + tripData.price.total * 1,
                              0
                            )
                            .toFixed(2)}`} */}
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
