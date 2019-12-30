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
                let imageSrc = data.flightDetails.Carriers.filter(
                  src => src.Id == flight.Carriers[0]
                );

                let originPlaceCode = data.flightDetails.Places.filter(
                  place => place.Id == flight.OriginStation
                );

                let destinationPlaceCode = data.flightDetails.Places.filter(
                  place => place.Id == flight.DestinationStation
                );
                return (
                  <Row key={flight.id} className="mb-2">
                    <Col xs={2}>
                      <img
                        src={imageSrc[0].ImageUrl}
                        style={{ maxWidth: "60px" }}
                        alt="Carrier logo"
                      />
                    </Col>
                    <Col xs={10}>
                      {`${originPlaceCode[0].Code} ${
                        flight.Departure.split("T")[1]
                      } ----------------- ${destinationPlaceCode[0].Code} ${
                        flight.Arrival.split("T")[1]
                      }`}
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
