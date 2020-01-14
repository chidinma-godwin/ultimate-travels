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

    return (
      <Row
        style={{
          backgroundColor: "rgb(65, 65, 66)",
          color: "white",
          padding: "1.5em",
          marginBottom: "1.5em"
        }}
      >
        <Col xs={9}>
          <div className="text-center">
            {`${info.from["address"].cityName} (${info.originLocationCode})`}
            <FontAwesomeIcon
              icon={["fas", "exchange-alt"]}
              className="mr-3 ml-3"
              style={{ color: "white" }}
              size="lg"
            />
            {`${info.to["address"].cityName} (${info.destinationLocationCode})`}
          </div>
          <div className="text-center">{`${info.departureDate} - ${
            info.returnDate
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
              backgroundColor: "rgb(123, 123, 204)",
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
