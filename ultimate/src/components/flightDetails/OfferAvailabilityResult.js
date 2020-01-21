import React from "react";
import { Container, Row, Col, Card, Alert, Form } from "react-bootstrap";
import TravelersInfo from "./TravelersInfo";
import SelectedFlightInfo from "./SelectedFlightInfo";

class OfferAvailabilityResult extends React.Component {
  constructor() {
    super();
    this.state = {
      DOB: new Map(["date", new Date()]),
      showAlert: true,
      firstName: new Map(),
      middleName: new Map(),
      lastName: new Map(),
      title: new Map(),
      email: new Map(),
      phone: new Map()
    };
  }

  handleChange = evt => {
    const item = evt.target.name;
    //const isChecked = evt.target.checked;
    //const queryData = this.props.data.flightDetails.data;
    let mapValues = [];
    this.setState(prevState => {
      prevState.checkedStops.set(item, isChecked);
      for (let entry of this.state.checkedStops) {
        if (entry[1] === false) {
          mapValues.push(entry[0] * 1);
        }
      }
      console.log(mapValues);
      console.log(this.state.checkedStops);
      return {
        checkedStops: prevState.checkedStops
      };
    });
    // this.setState({
    //   [evt.target.id]: evt.target.value
    // });
  };

  handleDateChange = date => {
    this.setState({
      DOB: date
    });
  };

  render() {
    const flightOffer = this.props.data.checkOffer.data.flightOffers[0];
    const warnings = this.props.data.checkOffer.warnings;
    const userInfo = this.props.userInfo;

    return (
      <Container
        fluid
        style={{
          marginTop: "2em",
          padding: "5em",
          paddingTop: "0"
        }}
      >
        {this.state.showAlert && warnings
          ? warnings.map(warn => {
              if (warn.status === 200) {
                return (
                  <Alert
                    key={warn.code}
                    variant="warning"
                    onClose={() => this.setState({ showAlert: false })}
                    dismissible
                    className="mb-3"
                  >
                    <Alert.Heading>
                      {warn.title.split(/(?=[A-Z])/).join(" ")}
                    </Alert.Heading>
                    <p>{warn.detail}</p>
                  </Alert>
                );
              } else {
                return "";
              }
            })
          : ""}

        <Row>
          <Col lg={3} className="mb-5">
            <SelectedFlightInfo userInfo={userInfo} flightOffer={flightOffer} />
          </Col>

          <Col lg={9}>
            <TravelersInfo
              flightOffer={flightOffer}
              DOB={this.state.DOB}
              handleDateChange={this.handleDateChange}
              handleChange={this.handleChange}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default OfferAvailabilityResult;
