import React from 'react';
import  { Card, Button } from 'react-bootstrap';

const FlightDeals = ()=> {
    return(
        <Card>
            <Card.Header>
                From X to Y
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    Price and availability period
                    <p>Airline</p>
                </Card.Text>
                <Button variant="primary">Book Now</Button>
            </Card.Body>
        </Card>
    );
};

export default FlightDeals;