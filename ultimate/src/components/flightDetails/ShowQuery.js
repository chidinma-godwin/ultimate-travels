import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ProgressBar,
  Dropdown,
  DropdownButton
} from "react-bootstrap";
import { Query } from "react-apollo";
import { getFlightDetails } from "../../queries/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterResults from "./FilterResults";

class ShowQuery extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.flightDetailsArray = [];
    let { sessionKey, from, to, userInfo } = this.props.location.state;
    this.state = {
      sessionKey,
      from,
      to,
      userInfo,
      sortBy: "price",
      displaySortBy: "Cheapest"
    };
  }

  displayTime = number => {
    let hour = Math.floor(number / 60);
    let min = number % 60;
    let calcTime;
    if (min < 10) {
      calcTime = `${hour}h 0${min}m`;
    } else {
      calcTime = `${hour}h ${min}m`;
    }
    return calcTime;
  };

  handleSelect = (eventKey, evt) => {
    let displaySelection = "";
    if (eventKey == "price") displaySelection = "Cheapest";
    if (eventKey == "duration") displaySelection = "Fastest";
    if (eventKey == "outbounddeparttime")
      displaySelection = "Outbound Departure Time";
    if (eventKey == "inbounddeparttime")
      displaySelection = "Inbound Departure Time";
    this.setState({
      sortBy: eventKey,
      displaySortBy: displaySelection,
      fetchPolicy: "cache-only"
    });
    console.log(eventKey);
  };

  render() {
    return (
      <Query
        query={getFlightDetails}
        variables={{
          sessionKey: this.state.sessionKey,
          sortType: this.state.sortBy
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
          data.flightDetails.Itineraries.map(itinerary => {
            let detailArray = [];
            let itineraryPrice = [];

            let outboundDuration = data.flightDetails.Legs.filter(
              leg => leg.Id == itinerary.OutboundLegId
            );
            let inboundDuration = data.flightDetails.Legs.filter(
              leg => leg.Id == itinerary.InboundLegId
            );
            let averageFlightDuration =
              (outboundDuration[0].Duration + inboundDuration[0].Duration) / 2;

            itinerary.PricingOptions.map(option =>
              itineraryPrice.push(option.Price)
            );
            detailArray.push(Math.min(...itineraryPrice));
            detailArray.push(itinerary.OutboundLegId);
            detailArray.push(itinerary.InboundLegId);
            detailArray.push(averageFlightDuration);
            this.flightDetailsArray.push(detailArray);

            return detailArray;
          });

          let lowestPrice = 0;
          let lestDuration = 0;
          for (var i = 1; i < this.flightDetailsArray.length; i++) {
            if (
              this.flightDetailsArray[i][0] <
              this.flightDetailsArray[lowestPrice][0]
            )
              lowestPrice = i;
            if (
              this.flightDetailsArray[i][3] <
              this.flightDetailsArray[lestDuration][3]
            )
              lestDuration = i;
          }

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
                    {`${this.state.from["PlaceName"]} (${this.state.userInfo.originPlace})`}
                    <FontAwesomeIcon
                      icon={["fas", "exchange-alt"]}
                      className="mr-3 ml-3"
                      style={{ color: "white" }}
                      size="lg"
                    />
                    {`${this.state.to["PlaceName"]} (${this.state.userInfo.destinationPlace})`}
                  </div>
                  <div className="text-center">{`${
                    this.state.userInfo.outboundDate
                  } - ${this.state.userInfo.inboundDate}  |  ${
                    this.state.userInfo.adults
                  } 
                  ${
                    this.state.userInfo.adults === "1" ? "Adult" : "Adults"
                  }  | ${
                    this.state.userInfo.children > 1
                      ? this.state.userInfo.children + " children |"
                      : this.state.userInfo.children == 1
                      ? this.state.userInfo.children + " child |"
                      : ""
                  }  ${
                    this.state.userInfo.infants > 1
                      ? this.state.userInfo.infants + " infants |"
                      : this.state.userInfo.infants == 1
                      ? this.state.userInfo.infants + " infant |"
                      : ""
                  }
                   ${this.state.userInfo.cabinClass}`}</div>
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
                  <FilterResults data={data} />
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
                    <DropdownButton
                      id="dropdown-item-button"
                      title={this.state.displaySortBy}
                      onSelect={this.handleSelect}
                    >
                      <Dropdown.Item eventKey="price">Cheapest</Dropdown.Item>
                      <Dropdown.Item eventKey="duration">Fastest</Dropdown.Item>
                      <Dropdown.Item eventKey="outbounddeparttime">
                        Outbound Departure Time
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="inbounddeparttime">
                        Return Departure Time
                      </Dropdown.Item>
                    </DropdownButton>
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

                      <Card.Body>
                        {this.displayTime(
                          Math.floor(this.flightDetailsArray[lestDuration][3])
                        )}
                      </Card.Body>
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
                          {this.flightDetailsArray[lowestPrice][0]}
                        </div>
                      </Card.Title>

                      <Card.Body>
                        {this.displayTime(
                          Math.floor(this.flightDetailsArray[lowestPrice][3])
                        )}
                      </Card.Body>
                    </Card>
                  </div>

                  {data.flightDetails.Itineraries.map(itinerary => {
                    let outbound = data.flightDetails.Legs.filter(
                      leg => itinerary.OutboundLegId == leg.Id
                    );

                    let inbound = data.flightDetails.Legs.filter(
                      leg => itinerary.InboundLegId == leg.Id
                    );

                    let outboundImageId,
                      outboundDeparture,
                      outboundArrival,
                      outboundOriginPlaceId,
                      outboundDestinationPlaceId,
                      outboundDuration,
                      outboundStops;

                    if (outbound[0].Id == itinerary.OutboundLegId) {
                      outboundImageId = outbound[0].Carriers[0];
                      outboundDeparture = outbound[0].Departure;
                      outboundArrival = outbound[0].Arrival;
                      outboundOriginPlaceId = outbound[0].OriginStation;
                      outboundDestinationPlaceId =
                        outbound[0].DestinationStation;
                      outboundDuration = outbound[0].Duration;
                      outboundStops = outbound[0].Stops;
                    }

                    let outboundImageSrc = data.flightDetails.Carriers.filter(
                      src => src.Id == outboundImageId
                    );

                    let outboundOriginPlaceCode = data.flightDetails.Places.filter(
                      place => place.Id == outboundOriginPlaceId
                    );

                    let outboundDestinationPlaceCode = data.flightDetails.Places.filter(
                      place => place.Id == outboundDestinationPlaceId
                    );

                    let inboundImageId,
                      inboundDeparture,
                      inboundArrival,
                      inboundOriginPlaceId,
                      inboundDestinationPlaceId,
                      inboundDuration,
                      inboundStops;
                    if (inbound[0].Id == itinerary.InboundLegId) {
                      inboundImageId = inbound[0].Carriers[0];
                      inboundDeparture = inbound[0].Departure;
                      inboundArrival = inbound[0].Arrival;
                      inboundOriginPlaceId = inbound[0].OriginStation;
                      inboundDestinationPlaceId = inbound[0].DestinationStation;
                      inboundDuration = inbound[0].Duration;
                      inboundStops = inbound[0].Stops;
                    }

                    let inboundImageSrc = data.flightDetails.Carriers.filter(
                      src => src.Id == inboundImageId
                    );

                    let inboundOriginPlaceCode = data.flightDetails.Places.filter(
                      place => place.Id == inboundOriginPlaceId
                    );

                    let inboundDestinationPlaceCode = data.flightDetails.Places.filter(
                      place => place.Id == inboundDestinationPlaceId
                    );

                    let prices = itinerary.PricingOptions.map(
                      price => price.Price
                    );

                    return (
                      <Card
                        key={itinerary.BookingDetailsLink.Uri}
                        className="mb-3"
                        // style={{ width: "68%", marginLeft: "auto" }}
                      >
                        <Card.Body>
                          <Row className="mb-2">
                            <Col xs={2}>
                              <img
                                src={outboundImageSrc[0].ImageUrl}
                                style={{
                                  maxWidth: "60px",
                                  marginLeft: "auto"
                                }}
                                alt="Carrier logo"
                              />
                            </Col>
                            <Col xs={7}>
                              {`${outboundOriginPlaceCode[0].Code} ${
                                outboundDeparture.split("T")[1]
                              } ----${this.displayTime(outboundDuration)}  |  ${
                                outboundStops.length
                              } ${
                                outboundStops.length > 1 ? "stops" : "stop"
                              }---- ${outboundDestinationPlaceCode[0].Code} ${
                                outboundArrival.split("T")[1]
                              }`}
                            </Col>

                            <Col xs={3}>
                              {`${prices.length} ${
                                prices.length > 1 ? "deals" : "deal"
                              } from`}
                              <div>
                                <span>&#8358;</span>
                                {`${Math.min(...prices)}`}
                              </div>

                              <div>
                                <Button>
                                  <a
                                    href={
                                      itinerary.PricingOptions[0].DeeplinkUrl
                                    }
                                    style={{ color: "white" }}
                                  >
                                    Select
                                  </a>
                                </Button>
                              </div>
                            </Col>

                            <Col xs={2}>
                              <img
                                src={inboundImageSrc[0].ImageUrl}
                                style={{ maxWidth: "60px" }}
                                alt="Carrier logo"
                              />
                            </Col>
                            <Col xs={7}>
                              {`${inboundOriginPlaceCode[0].Code} ${
                                inboundDeparture.split("T")[1]
                              } ----${this.displayTime(inboundDuration)}  |  ${
                                inboundStops.length
                              } ${
                                inboundStops.length > 1 ? "stops" : "stop"
                              }---- ${inboundDestinationPlaceCode[0].Code} ${
                                inboundArrival.split("T")[1]
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

export default ShowQuery;
