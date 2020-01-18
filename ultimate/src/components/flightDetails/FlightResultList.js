import React from "react";
import { Row, Col, Button, Card, Image } from "react-bootstrap";

const FlightResultList = props => {
  return (
    <React.Fragment>
      {/* present the flight result in an array of cards */}
      {props.flightData.length > 0
        ? props.flightData.map(flight => {
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
            let inboundTime = flight.itineraries[1].duration
              .slice(2)
              .split("H");
            let inboundItineraryDeparture =
              flight.itineraries[1].segments[0].departure;
            let inboundStops = flight.itineraries[1].segments.length - 1;
            let inboundItineraryArrival =
              flight.itineraries[1].segments[
                flight.itineraries[1].segments.length - 1
              ].arrival;
            return (
              <Card
                key={flight.id}
                className="mb-3"
                // style={{ width: "68%", marginLeft: "auto" }}
              >
                <Card.Body>
                  <Row className="mb-2">
                    <Col xs={2}>
                      <Image
                        src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${flight.itineraries[0].segments[0].carrierCode}`}
                        fluid
                      />
                    </Col>
                    <Col xs={7}>
                      {`${outboundItineraryDeparture.iataCode} ${
                        outboundItineraryDeparture.at.split("T")[1]
                      }  ----${outboundTime[0]}H ${
                        outboundTime[1]
                      }  |  ${outboundStops} ${
                        outboundStops > 1 ? "stops" : "stop"
                      } ---- ${outboundItineraryArrival.iataCode} ${
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

                      <div>
                        <Button>
                          <a href="#" style={{ color: "white" }}>
                            Select
                          </a>
                        </Button>
                      </div>
                    </Col>
                    <br />
                    <br />
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
                      }  ----${inboundTime[0]}H ${
                        inboundTime[1]
                      }  |  ${inboundStops} ${
                        inboundStops > 1 ? "stops" : "stop"
                      } ---- ${inboundItineraryArrival.iataCode} ${
                        inboundItineraryArrival.at.split("T")[1]
                      }`}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            );
          })
        : "No result matches your search"}
    </React.Fragment>
  );
};

export default FlightResultList;
