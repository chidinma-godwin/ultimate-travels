import React from "react";
import { Container, Row, Col, Card, ProgressBar, Table } from "react-bootstrap";
import { Query } from "react-apollo";
import { getHotelOffers } from "../../queries/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HotelOffers from "./HotelOffers";

const ShowMore = props => {
  let { hotelData, userInfo } = props.location.state;
  let args = {};
  let searchParams = hotelData.self.split("?")[1].split("&");
  searchParams.map(item => {
    let str = item.split("=");
    if (str[0] === "adults") str[1] = str[1] * 1;
    if (str[0] === "roomQuantity") str[1] = str[1] * 1;
    args[str[0]] = str[1];
  });
  console.log(userInfo);

  // Display star ratings
  let ratings = [];
  let hotelRatings = hotelData.hotel.rating;
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
    <Container fluid>
      <Row>
        <Col lg={5}>
          <Card className="mb-3">
            <Card.Body>
              <h2 className="font-weight-bold">{hotelData.hotel.name}</h2>
              <h3>{hotelData.hotel.address.lines.join(", ")}</h3>
              <p className="mb-3">
                {numRatings ? ratings : "No ratings available"}
              </p>
              <p className="mb-3">{hotelData.hotel.description.text}</p>

              <Table>
                <tr>
                  <td className="font-weight-bold">From</td>
                  <td className="font-weight-bold">
                    {hotelData.offers[0].price.currency}{" "}
                    {hotelData.offers[0].price.total}
                  </td>
                </tr>
                <tr>
                  <td>Check In</td>
                  <td>
                    {userInfo.userInfo.checkIn.toISOString().split("T")[0]}
                  </td>
                </tr>
                <tr>
                  <td>Check Out</td>
                  <td>
                    {userInfo.userInfo.checkOut.toISOString().split("T")[0]}
                  </td>
                </tr>
                <tr>
                  <td>Number of Rooms</td>
                  <td>{userInfo.userInfo.rooms}</td>
                </tr>
                <tr>
                  <td>Number of Adults</td>
                  <td>{userInfo.userInfo.adult}</td>
                </tr>
                <tr>
                  <td>Number of Children</td>
                </tr>
              </Table>
            </Card.Body>
          </Card>

          <Card className="mb-2">
            <Card.Body>
              <h3 className="mb-3 font-weight-bold">Amenities</h3>
              {hotelData.hotel.amenities.map(amenity => (
                <ol key={amenity}>{amenity.split("_").join(" ")}</ol>
              ))}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <Query query={getHotelOffers} variables={args}>
            {({ error, loading, data }) => {
              if (loading) return <ProgressBar now={25} />;
              if (error) {
                console.log(error);
                return "More info not available presently, please try again";
              }

              console.log(data);
              return <HotelOffers hotelOffers={data.hotelOffers.data} />;
            }}
          </Query>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowMore;
