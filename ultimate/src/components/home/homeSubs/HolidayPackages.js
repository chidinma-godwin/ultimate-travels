import React from "react";
import { Card, Button, CardDeck, Row, Col } from "react-bootstrap";

class HolidayPackages extends React.Component {
  constructor(props) {
    super(props);
    const { tours } = this.props;
    this.state = {
      tours
    };
  }

  render() {
    const { tours } = this.state;
    return (
      <CardDeck className="holiday">
        {tours.map(tour => (
          // const city = deal.city;
          <Card key={tour.id} className="mb-4">
            <Card.Img
              variant="top"
              src={tour.images[0].image_href}
              thumbnail="true"
            />
            <Card.Body className="pb-1">
              <Card.Title>{tour.name}</Card.Title>
              {/* <Card.Text>{deal.text}</Card.Text> */}
              <Button
                variant="primary"
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              >
                View more
              </Button>
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    );
  }
}

export default HolidayPackages;
