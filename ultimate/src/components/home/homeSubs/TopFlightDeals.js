import React from "react";
import { Col, Row, Card, Button, CardDeck } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TopFlightDeals extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: null
    };
    this.userInfo = {};
  }

  handleBook = () => {
    this.setState({ redirect: "/flightDetails" });
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: this.state.redirect,
            state: { userInfo: this.userInfo }
          }}
        />
      );
    }

    let {
      data,
      meta,
      dictionaries,
      showNextPage,
      showPreviousPage,
      pageNumbers,
      currentPage
    } = this.props;
    return (
      <Row>
        {currentPage == 1 ? (
          <Col sm={1}></Col>
        ) : (
          <Col sm={12} md={12} lg={1} className="align-self-center">
            <div onClick={showPreviousPage}>
              <FontAwesomeIcon
                icon={["fas", "chevron-circle-left"]}
                style={{
                  color: "purple",
                  fontSize: "4em"
                }}
              />
            </div>
          </Col>
        )}
        <Col
          sm={10}
          className="flight_deals"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <CardDeck>
            {data.map(flight => {
              let originLocation = dictionaries.locations.filter(
                location => flight.origin === location.id
              );
              let destinationLocation = dictionaries.locations.filter(
                location => flight.destination === location.id
              );
              let departureDate = new Date(flight.departureDate)
                .toString()
                .split(" ");
              let returnDate = new Date(flight.returnDate)
                .toString()
                .split(" ");
              //let from = ["firstCity", {iataCode: }]

              // Collect the query variables from the link provided in the data and save them in an object
              let flightUrl = flight.links.flightOffers;
              let variables = flightUrl
                .split("?")[1]
                .split("&")
                .map(v => v.split("="));
              variables.map(v => {
                this.userInfo[v[0]] = v[1];
              });
              this.userInfo.departureDate = [
                ["firstCity", new Date(this.userInfo.departureDate)]
              ];
              this.userInfo.from = [
                [
                  "firstCity",
                  {
                    iataCode: this.userInfo.originLocationCode,
                    address: {
                      cityName: originLocation[0].details.detailedName
                    }
                  }
                ]
              ];
              this.userInfo.to = [
                [
                  "firstCity",
                  {
                    iataCode: this.userInfo.destinationLocationCode,
                    address: {
                      cityName: originLocation[0].details.detailedName
                    }
                  }
                ]
              ];
              this.userInfo.travelClass = "ECONOMY";
              this.userInfo.originCity = originLocation[0].details.detailedName;
              this.userInfo.destinationCity =
                destinationLocation[0].details.detailedName;
              console.log(this.userInfo);

              return (
                // <Col md={4} lg={3} key={flight.destination} className="mb-3">
                <Card key={flight.destination}>
                  <Card.Header
                    style={{ backgroundColor: "#f68220", color: "white" }}
                  >
                    {originLocation[0].details.detailedName} to{" "}
                    {destinationLocation[0].details.detailedName}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <span>
                        From {flight.price.total} {meta.currency}
                      </span>
                      Available from
                      <span>
                        {`${departureDate[0]}, ${departureDate[2]} ${departureDate[1]}. ${departureDate[3]} - 
                  ${returnDate[0]}, ${returnDate[2]} ${returnDate[1]}. ${returnDate[3]}`}
                      </span>
                      <br />
                      Airline
                    </Card.Text>
                    <Button variant="primary" onClick={this.handleBook}>
                      Book Now
                    </Button>
                  </Card.Body>
                </Card>
                // </Col>
              );
            })}
          </CardDeck>
        </Col>
        {currentPage < Math.max(...pageNumbers) ? (
          <Col sm={12} md={12} lg={1} className="align-self-center">
            <span onClick={showNextPage}>
              <FontAwesomeIcon
                icon={["fas", "chevron-circle-right"]}
                style={{
                  color: "purple",
                  fontSize: "4em"
                }}
              />
            </span>
          </Col>
        ) : (
          <Col sm={1}>""</Col>
        )}
      </Row>
    );
  }
}

export default TopFlightDeals;
