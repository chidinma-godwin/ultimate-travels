import React from "react";
import { Card, Row, Col, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";

class HotelResultList extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
      redirectHotelData: null,
    };
  }

  showMore = (hotel) => {
    this.setState({
      redirect: "/showMore",
      redirectHotelData: hotel,
    });
  };

  render() {
    let { hotelData, userInfo } = this.props;

    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: this.state.redirect,
            state: {
              hotelData: this.state.redirectHotelData,
              userInfo: { userInfo },
            },
          }}
        />
      );
    }

    return (
      <React.Fragment>
        {/* present the flight result in an array of cards */}
        {hotelData.length > 0
          ? hotelData.map((hotel, index) => {
              if (hotel.hotel.media === null) return "";
              // Display star ratings
              let ratings = [];
              let hotelRatings = hotel.hotel.rating;
              let numRatings = hotelRatings ? hotelRatings * 1 : null;
              if (numRatings) {
                for (let i = 1; i <= 5; i++) {
                  if (numRatings >= i) {
                    ratings.push(
                      <FontAwesomeIcon
                        key={i}
                        icon={["fas", "star"]}
                        style={{ color: "orange" }}
                        size="lg"
                      />
                    );
                  } else {
                    ratings.push(
                      <FontAwesomeIcon
                        key={i}
                        icon={["far", "star"]}
                        style={{ color: "orange" }}
                        size="lg"
                      />
                    );
                  }
                }
              }

              return (
                <Card
                  key={index}
                  className="mb-3"
                  style={{ fontWeight: "bold" }}
                  // style={{ width: "68%", marginLeft: "auto" }}
                >
                  <Card.Body classname="p-3">
                    <Row className="mb-2">
                      <Col xs={3}>
                        <Image src={hotel.hotel.media[0].uri} fluid />
                      </Col>

                      <Col
                        xs={6}
                        className="d-flex flex-column justify-content-between"
                        // className={length === 1 ? "align-self-center" : ""}
                      >
                        <div>
                          <div className="md-2" style={{ fontSize: "16px" }}>
                            {hotel.hotel.name}
                          </div>
                          <span>
                            <FontAwesomeIcon
                              icon={["fas", "map-marker-alt"]}
                              className="mr-2"
                              style={{ color: "orange" }}
                              size="lg"
                            />
                            {hotel.hotel.address.lines.join(", ")}
                          </span>
                        </div>
                        {/* {hotel.hotel.description ? (
                          <div>{hotel.hotel.description.text}</div>
                        ) : (
                          ""
                        )} */}
                        <div>
                          {hotel.offers[0].room.typeEstimated &&
                          hotel.offers[0].room.typeEstimated.category
                            ? hotel.offers[0].room.typeEstimated.category
                                .split("_")
                                .join(" ")
                            : ""}
                        </div>
                        <Button
                          style={{
                            width: "fit-content",
                            backgroundColor: "orange",
                            border: "none",
                            color: "white",
                          }}
                          onClick={this.showMore.bind(this, hotel)}
                        >
                          View more
                        </Button>
                      </Col>

                      <Col
                        className="d-flex flex-column justify-content-center"
                        xs={3}
                      >
                        {/* <span>&#8358;</span> */}
                        <div>
                          {numRatings ? ratings : "No ratings available"}
                        </div>

                        <div>
                          From{" "}
                          {new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: hotel.offers[0].price.currency,
                          }).format(hotel.offers[0].price.total * 1)}
                          {/* {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: hotel.offers[0].price.currency
                          }).format(hotel.offers[0].price.total * 1)} */}
                        </div>

                        <div>
                          <Button
                          // onClick={() => this.handleCheckOffer(flight.id)}
                          >
                            Book Now
                          </Button>
                        </div>
                      </Col>
                      <br />
                      <br />
                    </Row>
                  </Card.Body>
                </Card>
              );
            })
          : "No result matches your search"}
      </React.Fragment>
    );
  }
}

export default HotelResultList;
