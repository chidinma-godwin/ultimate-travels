import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";

class FlightResultHeading extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: null,
      redirectState: null,
    };
  }

  changeFlightQuery = () => {
    const {
      from,
      to,
      departureDate,
      returnDate,
      travelClass,
      children,
      infants,
      adults,
    } = this.props.userInfo;
    const redirectState = {
      from: new Map(from),
      to: new Map(to),
      departureDate: new Map(departureDate),
      returnDate: returnDate ? new Date(returnDate) : undefined,
      travelClass:
        travelClass === "PREMIUM_ECONOMY"
          ? "Premium Economy"
          : travelClass === "First"
          ? "First Class"
          : travelClass,
      children,
      infants,
      adults,
      currencyCode: this.props.currency,
    };
    console.log(redirectState);

    this.setState({
      redirect: "/",
      redirectState,
    });
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: this.state.redirect,
            state: {
              queryVariables: this.state.redirectState,
            },
          }}
        />
      );
    }

    let info = this.props.userInfo;
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
      <div
        style={{
          // backgroundColor: "rgb(65, 65, 66)",
          backgroundColor: "#dee2e6",
          borderRadius: "20px",
          color: "black",
          padding: "1.5em",
          marginBottom: "1.5em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div className="text-center">
            {`${originCity} (${originLocationCode})`}
            <FontAwesomeIcon
              icon={
                this.props.singleTrip
                  ? ["fas", "long-arrow-alt-right"]
                  : ["fas", "exchange-alt"]
              }
              className="mr-3 ml-3"
              style={{ color: "#f68220" }}
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
        </div>
        <div>
          <Button
            style={{
              // backgroundColor: "#41225f",
              display: "block",
              marginLeft: "auto",
              borderRadius: "10px",
            }}
            onClick={this.changeFlightQuery}
          >
            Change
          </Button>
        </div>
      </div>
    );
  }
}

export default FlightResultHeading;
