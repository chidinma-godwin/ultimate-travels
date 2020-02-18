import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FlightResultHeading extends React.Component {
  constructor(props) {
    super(props);
    let info = this.props.userInfo;
    this.state = {
      info
    };
  }

  render() {
    let info = this.state.info;
    let originCity = info.from[0][1].address.cityName;
    let originLocationCode = info.from[0][1].iataCode;
    let destinationCity = info.to[info.to.length - 1][1].address.cityName;
    let destinationLocationCode = info.to[info.to.length - 1][1].iataCode;
    let departureDate = info.departureDate[0][1].toISOString().split("T")[0];
    let lastDepartureDate =
      info.departureDate.length > 1
        ? info.departureDate[info.departureDate.length - 1][1]
            .toISOString()
            .split("T")[0]
        : "";
    return (
      <Row
        style={{
          // backgroundColor: "rgb(65, 65, 66)",
          backgroundColor: "#157ec2",
          borderRadius: "115px",
          color: "white",
          padding: "1.5em",
          marginBottom: "1.5em"
        }}
      >
        <Col xs={9}>
          <div className="text-center">
            {`${originCity} (${originLocationCode})`}
            <FontAwesomeIcon
              icon={["fas", "exchange-alt"]}
              className="mr-3 ml-3"
              style={{ color: "white" }}
              size="lg"
            />
            {`${destinationCity} (${destinationLocationCode})`}
          </div>
          <div className="text-center">{`${departureDate} - ${
            info.returnDate ? info.returnDate : lastDepartureDate
          }  |  ${info.adults} 
                  ${info.adults === "1" ? "Adult" : "Adults"}  | ${
            info.children > 1
              ? info.children + " children |"
              : info.children == 1
              ? info.children + " child |"
              : ""
          }  ${
            info.infants > 1
              ? info.infants + " infants |"
              : info.infants == 1
              ? info.infants + " infant |"
              : ""
          }
                   ${info.travelClass}`}</div>
        </Col>
        <Col xs={3}>
          <Button
            style={{
              backgroundColor: "#41225f",
              marginRight: "0.5em"
            }}
          >
            Change
          </Button>
        </Col>
      </Row>
    );
  }
}

export default FlightResultHeading;
