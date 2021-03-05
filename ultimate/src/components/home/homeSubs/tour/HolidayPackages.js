import React from "react";
import { Card, Button, CardDeck, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class HolidayPackages extends React.Component {
  constructor(props) {
    super(props);
    const { tours } = this.props;
    this.state = {
      tours,
      redirect: null,
      redirectState: {},
    };
  }

  viewTourDetails = (tour) => {
    const { slug } = tour;
    this.setState({
      redirect: `/tourDetails/${slug}`,
      redirectState: tour,
    });
  };

  render() {
    const { tours, redirect, redirectState } = this.state;

    if (redirect) {
      return (
        <Redirect
          push
          to={{ pathname: redirect, state: { tour: redirectState } }}
        />
      );
    }

    return (
      <Row>
        <Col
          sm="10"
          className="tour"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <CardDeck className="holiday">
            {tours.map((tour) => (
              // const city = deal.city;
              <Card key={tour.id} className="mb-4">
                <Card.Img
                  variant="top"
                  src={tour.images[0].image_href}
                  thumbnail="true"
                />
                <Card.Body className="p-3 pb-1">
                  <Card.Title>{tour.name}</Card.Title>
                  {/* <Card.Text>{deal.text}</Card.Text> */}
                  <Button
                    variant="primary"
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    onClick={() => this.viewTourDetails(tour)}
                  >
                    View more
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </CardDeck>
        </Col>
      </Row>
    );
  }
}

export default HolidayPackages;
