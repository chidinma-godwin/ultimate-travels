import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ProgressBar,
  Dropdown,
  DropdownButton,
  Image
} from "react-bootstrap";
import { Query } from "react-apollo";
import { getFlightDetails } from "../../queries/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterResults from "./FilterResults";

class FlightQuery extends React.Component {
  constructor(props) {
    super(props);
    this.flightDetailsArray = [];
    this.priceList = [];
    this.durationList = [];
    let { userInfo } = this.props.location.state;
    this.state = {
      userInfo
    };
  }

  // Function to put all flight prices in an array
  getPrices = () => {
    let priceArray = [];
    this.state.flightDetails.data.map(flight =>
      priceArray.push(flight.price.total * 1)
    );
    return priceArray;
  };

  // Function to put average duration of outbound and inbound flight in an array
  getDuration = () => {
    let durationArray = [];
    this.state.flightDetails.data.map(flight => {
      // map through the itineraries to get the duration in two decimal places
      let time = flight.itineraries.map(itinerary => {
        let timeArray = itinerary.duration.slice(2, -1).split("H");
        return (`${timeArray[0]}.${timeArray[1]}` * 1).toFixed(2);
      });

      // Declare a variable for the price of each returned flight
      let price = flight.price.total * 1;

      // get the average duration from each flight
      let averageDuration =
        time.reduce((total, each) => total + each) / time.length;

      // add the average duration to the array
      return durationArray.push([price, averageDuration]);
    });
    return durationArray;
  };

  displayoutboundTime = number => {
    let hour = Math.floor(number / 60);
    let min = number % 60;
    let calcoutboundTime;
    if (min < 10) {
      calcoutboundTime = `${hour}h 0${min}m`;
    } else {
      calcoutboundTime = `${hour}h ${min}m`;
    }
    return calcoutboundTime;
  };

  render() {
    let info = this.state.userInfo;
    return (
      <Query
        query={getFlightDetails}
        variables={{
          originLocationCode: info.originLocationCode,
          destinationLocationCode: info.destinationLocationCode,
          departureDate: info.departureDate,
          returnDate: info.returnDate,
          adults: info.adults,
          children: info.children,
          infants: info.infants,
          travelClass: info.travelClass,
          currencyCode: "USD"
        }}
      >
        {({ error, loading, data }) => {
          if (loading) return <ProgressBar now={25} />;
          if (error) {
            console.log(error);
            return "Please fill the flight form";
          }
          console.log(data);

          // Get the Duration of the cheapest flight and the price of the fastest flight
          priceList = this.getPrices();
          durationList = this.getDuration();

          return (
            <Container
              fluid
              style={{
                marginTop: "2em",
                padding: "5em",
                paddingTop: "0"
              }}
            >
              <Row
                style={{
                  backgroundColor: "rgb(65, 65, 66)",
                  color: "white",
                  padding: "1.5em",
                  marginBottom: "1.5em"
                }}
              >
                <Col xs={9}>
                  <div className="text-center">
                    {`${info.from["address"].cityName} (${info.originLocationCode})`}
                    <FontAwesomeIcon
                      icon={["fas", "exchange-alt"]}
                      className="mr-3 ml-3"
                      style={{ color: "white" }}
                      size="lg"
                    />
                    {`${info.to["address"].cityName} (${info.destinationLocationCode})`}
                  </div>
                  <div className="text-center">{`${info.departureDate} - ${
                    info.returnDate
                  }  |  ${info.adults} 
                  ${info.adults === "1" ? "Adult" : "Adults"}  | ${
                    info.children > 1
                      ? info.children + " children |"
                      : info.children == 1
                      ? info.children + " child |"
                      : ""
                  }  ${
                    info.infants > 1
                      ? info.infants + " infants |"
                      : info.infants == 1
                      ? info.infants + " infant |"
                      : ""
                  }
                   ${info.travelClass}`}</div>
                </Col>
                <Col xs={3}>
                  <Button
                    style={{
                      backgroundColor: "rgb(123, 123, 204)",
                      marginRight: "0.5em"
                    }}
                  >
                    Change
                  </Button>
                </Col>
              </Row>

              <Row>
                <Col lg={3}>
                  <FilterResults
                    flightDetails={data.flightDetails}
                    priceList={this.priceList}
                    durationList={this.durationList}
                  />
                </Col>

                <Col lg={9}>
                  <div
                    style={{
                      width: "50%",
                      marginLeft: "auto",
                      marginBottom: "1.5em",
                      display: "flex"
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>Sort By</span>
                    <span>
                      <Button>Cheapest</Button>
                    </span>
                    <span>
                      <Button>Fastest</Button>
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      position: "relative",
                      width: "100%",
                      justifyContent: "space-around",
                      marginBottom: "1.7em"
                    }}
                  >
                    <Card style={{ width: "45%" }}>
                      <Card.Header style={{ fontWeight: "bolder" }}>
                        Fastest
                      </Card.Header>

                      <Card.Title>
                        <div
                          style={{
                            color: "blue",
                            fontSize: "18px",
                            paddingLeft: "1em",
                            paddingTop: "1em"
                          }}
                        >
                          <span>&#8358;</span>
                          {this.flightDetailsArray[lestDuration][0]}
                        </div>
                      </Card.Title>

                      <Card.Body>{Math.min(...durationList)}</Card.Body>
                    </Card>

                    <Card style={{ width: "45%" }}>
                      <Card.Header style={{ fontWeight: "bolder" }}>
                        Cheapest
                      </Card.Header>

                      <Card.Title>
                        <div
                          style={{
                            color: "blue",
                            fontSize: "18px",
                            paddingLeft: "1em",
                            paddingTop: "1em"
                          }}
                        >
                          <span>&#8358;</span>
                          {Math.min(...this.priceList)}
                        </div>
                      </Card.Title>

                      <Card.Body>
                        {this.displayoutboundTime(
                          Math.floor(this.flightDetailsArray[lowestPrice][3])
                        )}
                      </Card.Body>
                    </Card>
                  </div>

                  {data.flightDetails.data.map(flight => {
                    // declare outbound flight variables
                    let outboundTime = flight.itineraries[0].duration
                      .slice(2)
                      .split("H");
                    let outboundItineraryDeparture =
                      flight.itineraries[0].segments[0].departure;
                    let outboundStops =
                      flight.itineraries[0].segments.length - 1;
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
                    let inboundStops =
                      flight.itineraries[1].segments.length - 1;
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

                            {/* this is where i stopped */}
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
                                  <a href="" style={{ color: "white" }}>
                                    Select
                                  </a>
                                </Button>
                              </div>
                            </Col>
                            <br />
                            <br />
                            <Col xs={2}>
                              <img
                                src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${
                                  flight.itineraries[0].segments[
                                    flight.itineraries[0].segments.length - 1
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
                  })}
                </Col>
              </Row>
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default FlightQuery;
