import React from "react";
import { Col, Row, Card, Button, CardDeck } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TopFlightDeals extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
      redirectState: {},
    };
  }

  handleBook = (userInfo) => {
    this.setState({ redirect: "/flightDetails", redirectState: userInfo });
  };

  render() {
    const { redirect, redirectState } = this.state;
    if (redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: redirect,
            state: { userInfo: redirectState },
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
      currentPage,
    } = this.props;
    console.log(pageNumbers, currentPage);
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
                  fontSize: "4em",
                }}
              />
            </div>
          </Col>
        )}
        <Col
          sm={
            currentPage != 1 || currentPage < Math.max(...pageNumbers) ? 10 : 11
          }
          className="flight_deals"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <CardDeck>
            {data.map((flight) => {
              let originLocation = dictionaries.locations.filter(
                (location) => flight.origin === location.id
              );
              let destinationLocation = dictionaries.locations.filter(
                (location) => flight.destination === location.id
              );
              let departureDate = new Date(flight.departureDate)
                .toString()
                .split(" ");
              let returnDate = new Date(flight.returnDate)
                .toString()
                .split(" ");
              //let from = ["firstCity", {iataCode: }]

              // Collect the query variables from the link provided in the data and save them in a userInfo object
              let flightUrl = flight.links.flightOffers;
              let variables = flightUrl
                .split("?")[1]
                .split("&")
                .map((v) => v.split("="));

              const userInfo = {};

              variables.map((v) => {
                userInfo[v[0]] = v[1];
              });

              userInfo.departureDate = [
                ["firstCity", new Date(userInfo.departureDate)],
              ];
              userInfo.from = [
                [
                  "firstCity",
                  {
                    subType: originLocation[0].details.subType,
                    name: originLocation[0].details.detailedName,
                    iataCode: userInfo.originLocationCode,
                    address: {
                      cityName: originLocation[0].details.detailedName,
                    },
                  },
                ],
              ];
              userInfo.to = [
                [
                  "firstCity",
                  {
                    subType: destinationLocation[0].details.subType,
                    name: destinationLocation[0].details.detailedName,
                    iataCode: userInfo.destinationLocationCode,
                    address: {
                      cityName: destinationLocation[0].details.detailedName,
                    },
                  },
                ],
              ];
              userInfo.travelClass = "ECONOMY";
              userInfo.originCity = originLocation[0].details.detailedName;
              userInfo.destinationCity =
                destinationLocation[0].details.detailedName;
              console.log(userInfo);

              return (
                // <Col md={4} lg={3} key={flight.destination} className="mb-3">
                <Card key={flight.destination} className="mb-4">
                  <Card.Header
                    style={{ backgroundColor: "#f68220", color: "white" }}
                  >
                    {originLocation[0].details.detailedName} to{" "}
                    {destinationLocation[0].details.detailedName}
                  </Card.Header>
                  <Card.Body className="p-3">
                    <Card.Text>
                      <span className="d-block">
                        From {flight.price.total} {meta.currency}
                      </span>
                      Available from
                      <span className="d-block">
                        {`${departureDate[0]}, ${departureDate[2]} ${departureDate[1]}. ${departureDate[3]} - 
                  ${returnDate[0]}, ${returnDate[2]} ${returnDate[1]}. ${returnDate[3]}`}
                      </span>
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => this.handleBook(userInfo)}
                    >
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
                  fontSize: "4em",
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
