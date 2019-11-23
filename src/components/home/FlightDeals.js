import React from "react";
import { Card, Button, CardColumns } from "react-bootstrap";

const FlightDeals = (props) => {
  const { deals } = props;
  const dealList = deals.map(deal => {
    const city = deal.city;
    return (
      <Card>
        <Card.Img variant="top" src={deal.src[city]} fluid thumbnail/>
        <Card.Body>
          <Card.Title>{deal.title}</Card.Title>
          <Card.Text>
            {deal.text}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  });
  return (
    <CardColumns>
      {dealList}
    </CardColumns>
  )
};

export default FlightDeals;
