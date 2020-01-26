import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

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

    let flightInfo = this.props.data.flightInspiration;
    return (
      <Row>
        {flightInfo.data.map(flight => {
          let originLocation = flightInfo.dictionaries.locations.filter(
            location => flight.origin === location.id
          );
          let destinationLocation = flightInfo.dictionaries.locations.filter(
            location => flight.destination === location.id
          );
          let departureDate = new Date(flight.departureDate)
            .toString()
            .split(" ");
          let returnDate = new Date(flight.returnDate).toString().split(" ");

          // Collect the query variables from the link provided in the data and save them in an object
          let flightUrl = flight.links.flightOffers;
          let variables = flightUrl
            .split("?")[1]
            .split("&")
            .map(v => v.split("="));
          variables.map(v => {
            this.userInfo[v[0]] = v[1];
            this.userInfo.travelClass = "ECONOMY";
            this.userInfo.originCity = originLocation[0].details.detailedName;
            this.userInfo.destinationCity =
              destinationLocation[0].details.detailedName;
          });
          console.log(this.userInfo);

          return (
            <Col md={4} lg={3} key={flight.destination} className="mb-3">
              <Card>
                <Card.Header
                  style={{ backgroundColor: "#f68220", color: "white" }}
                >
                  {originLocation[0].details.detailedName} to{" "}
                  {destinationLocation[0].details.detailedName}
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <span>
                      From {flight.price.total} {flightInfo.meta.currency}
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
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default TopFlightDeals;
