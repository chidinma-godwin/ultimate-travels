import React from "react";
import { Card, Row, Col, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class HotelResultList extends React.Component {
  constructor() {
    super();
    this.state = {
      // redirect: null
    };
  }

  render() {
    let { hotelData, userInfo } = this.props;
    console.log(userInfo);

    return (
      <React.Fragment>
        {/* present the flight result in an array of cards */}
        {hotelData.length > 0
          ? hotelData.map(hotel => {
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
                        icon={["fas", "star"]}
                        style={{ color: "orange" }}
                        size="lg"
                      />
                    );
                  } else {
                    ratings.push(
                      <FontAwesomeIcon
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
                  key={hotel.id}
                  className="mb-3"
                  style={{ fontWeight: "bold" }}
                  // style={{ width: "68%", marginLeft: "auto" }}
                >
                  <Card.Body>
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
                          {hotel.offers[0].room.typeEstimated.category
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
                            color: "white"
                          }}
                        >
                          <Link
                            push
                            to={{
                              pathname: "/showMore",
                              state: {
                                hotelData: hotel,
                                userInfo: { userInfo }
                              }
                            }}
                          >
                            View More
                          </Link>
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
                          {`From 
                            ${hotel.offers[0].price.currency} ${hotel.offers[0].price.total}`}
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
