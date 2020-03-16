import React from "react";
import { Table, Card, Button, Carousel } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class HotelOffers extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
      redirectOffer: null
    };
  }

  handleBook = offer => {
    this.setState({
      redirect: "/guestInfo",
      redirectOffer: offer
    });
  };

  render() {
    let hotelOffers = this.props.hotelOffers;
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: this.state.redirect,
            state: { offerId: this.state.redirectOffer.id }
          }}
        />
      );
    }
    return (
      <React.Fragment>
        {hotelOffers
          ? hotelOffers.hotel.media.map(photo => {
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
            })
          : null}

        {hotelOffers ? (
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
                            {new Intl.NumberFormat("en-NG", {
                              style: "currency",
                              currency: offer.price.currency
                            }).format(Number(offer.price.total))}
                          </p>
                          <Button onClick={this.handleBook.bind(this, offer)}>
                            Book
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        ) : (
          <div className="query_status">
            No Rooms available for this property
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default HotelOffers;
