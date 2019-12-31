import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Query } from "react-apollo";
import { getFlightDetails } from "../../queries/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ShowQuery extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    let { sessionKey, from, to, userInfo } = this.props.location.state;
    this.state = {
      sessionKey,
      from,
      to,
      userInfo
    };
  }

  render() {
    return (
      <Query
        query={getFlightDetails}
        variables={{ sessionKey: this.state.sessionKey }}
      >
        {({ error, loading, data }) => {
          if (loading) return "loading data";
          if (error) {
            console.log(error);
            return "Please fill the flight form";
          }
          console.log(data);

          return (
            <Container
              style={{
                marginTop: "2em"
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
                  } ${
                    this.state.userInfo.adults === "1" ? "Adult" : "Adults"
                  }  |  ${this.state.userInfo.cabinClass}`}</div>
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
                  outboundDestinationPlaceId;
                if (outbound[0].Id == itinerary.OutboundLegId) {
                  outboundImageId = outbound[0].Carriers[0];
                  outboundDeparture = outbound[0].Departure;
                  outboundArrival = outbound[0].Arrival;
                  outboundOriginPlaceId = outbound[0].OriginStation;
                  outboundDestinationPlaceId = outbound[0].DestinationStation;
                }

                let outboundImageSrc = data.flightDetails.Carriers.filter(
                  src => src.Id == outboundImageId
                );

                let inboundImageId,
                  inboundDeparture,
                  inboundArrival,
                  inboundOriginPlaceId,
                  inboundDestinationPlaceId;
                if (inbound[0].Id == itinerary.InboundLegId) {
                  inboundImageId = inbound[0].Carriers[0];
                  inboundDeparture = inbound[0].Departure;
                  inboundArrival = inbound[0].Arrival;
                  inboundOriginPlaceId = inbound[0].OriginStation;
                  inboundDestinationPlaceId = inbound[0].DestinationStation;
                }

                let inboundImageSrc = data.flightDetails.Carriers.filter(
                  src => src.Id == inboundImageId
                );

                let outboundOriginPlaceCode = data.flightDetails.Places.filter(
                  place => place.Id == outboundOriginPlaceId
                );

                let inboundOriginPlaceCode = data.flightDetails.Places.filter(
                  place => place.Id == inboundOriginPlaceId
                );

                let outboundDestinationPlaceCode = data.flightDetails.Places.filter(
                  place => place.Id == outboundDestinationPlaceId
                );

                let inboundDestinationPlaceCode = data.flightDetails.Places.filter(
                  place => place.Id == inboundDestinationPlaceId
                );

                let prices = itinerary.PricingOptions.map(price => price.Price);

                return (
                  <Card key={itinerary.OutboundLegId}>
                    <Card.Body>
                      <Row className="mb-2">
                        <Col xs={2}>
                          <img
                            src={outboundImageSrc[0].ImageUrl}
                            style={{ maxWidth: "60px" }}
                            alt="Carrier logo"
                          />
                        </Col>
                        <Col xs={7}>
                          {`${outboundOriginPlaceCode[0].Code} ${
                            outboundDeparture.split("T")[1]
                          } ----------------- ${
                            outboundDestinationPlaceCode[0].Code
                          } ${outboundArrival.split("T")[1]}`}
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
                                href={itinerary.PricingOptions[0].DeeplinkUrl}
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
                          } ----------------- ${
                            inboundDestinationPlaceCode[0].Code
                          } ${inboundArrival.split("T")[1]}`}
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                );
              })}
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default ShowQuery;
