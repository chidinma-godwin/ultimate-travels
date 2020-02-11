import React from "react";
import { Table, Card, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const HotelOffers = ({ hotelOffers }) => {
  return (
    <React.Fragment>
      {hotelOffers.hotel.media.map(photo => {
        return (
          <Carousel className="mb-4" key={photo.uri} interval={7000}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                style={{ height: "fit-content", width: "250px" }}
                src={photo.uri}
                alt={photo.category}
              />
              <Carousel.Caption>
                <h3 style={{ color: "orange" }}>{photo.category}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        );
      })}

      <Card className="mt-4">
        <Card.Header style={{ backgroundColor: "#f68220", color: "white" }}>
          Available Room Types
        </Card.Header>
        <Card.Body>
          <Table>
            <thead>
              <tr>
                <th>Room type</th>
                {/* <th>Max guest per room</th> */}
                <th>Price per night</th>
              </tr>
            </thead>
            <tbody>
              {hotelOffers.offers.map(offer => {
                return (
                  <tr key={offer.id}>
                    <td>
                      {offer.room.description.text
                        .split("\n")
                        .map((text, i) => (
                          <p key={i}>{text}</p>
                        ))}
                    </td>
                    <td>
                      <p>
                        {offer.price.total} {offer.price.currency}
                      </p>
                      <Link
                        push
                        to={{
                          pathname: "/guestInfo",
                          state: { offerId: offer.id }
                        }}
                      >
                        <Button>Book</Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default HotelOffers;
