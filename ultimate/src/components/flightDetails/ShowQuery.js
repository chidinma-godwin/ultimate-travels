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

              {data.flightDetails.Legs.map(flight => {
                let outbound = data.flightDetails.Itineraries.filter(
                  Itinerary => Itinerary.OutboundLegId == flight.Id
                );

                let inbound = data.flightDetails.Itineraries.filter(
                  Itinerary => Itinerary.InboundLegId == flight.Id
                );
                console.log(outbound);
                console.log(inbound);

                let outboundImageSrc = data.flightDetails.Carriers.filter(
                  src => {
                    console.log(outbound);
                    return src.Id == outbound[0].Carriers[0];
                  }
                );

                let inboundImageSrc = data.flightDetails.Carriers.filter(
                  src => src.Id == inbound[0].Carriers[0]
                );

                let outboundOriginPlaceCode = data.flightDetails.Places.filter(
                  place => place.Id == outbound[0].OriginStation
                );

                let inboundOriginPlaceCode = data.flightDetails.Places.filter(
                  place => place.Id == inbound[0].OriginStation
                );

                let outboundDestinationPlaceCode = data.flightDetails.Places.filter(
                  place => place.Id == outbound[0].DestinationStation
                );

                let inboundDestinationPlaceCode = data.flightDetails.Places.filter(
                  place => place.Id == inbound[0].DestinationStation
                );

                return (
                  <Row key={flight.id} className="mb-2">
                    <Col xs={2}>
                      <img
                        src={outboundImageSrc[0].ImageUrl}
                        style={{ maxWidth: "60px" }}
                        alt="Carrier logo"
                      />
                    </Col>
                    <Col xs={10}>
                      {`${outboundOriginPlaceCode[0].Code} ${
                        outbound.Departure.split("T")[1]
                      } ----------------- ${
                        outboundDestinationPlaceCode[0].Code
                      } ${outbound.Arrival.split("T")[1]}`}
                    </Col>

                    <Col xs={2}>
                      <img
                        src={inboundImageSrc[0].ImageUrl}
                        style={{ maxWidth: "60px" }}
                        alt="Carrier logo"
                      />
                    </Col>
                    <Col xs={10}>
                      {`${inboundOriginPlaceCode[0].Code} ${
                        inbound.Departure.split("T")[1]
                      } ----------------- ${
                        inboundDestinationPlaceCode[0].Code
                      } ${inbound.Arrival.split("T")[1]}`}
                    </Col>
                  </Row>
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
