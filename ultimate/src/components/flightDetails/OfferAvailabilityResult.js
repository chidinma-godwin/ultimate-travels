import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import TravelersInfo from "./TravelersInfo";
import SelectedFlightInfo from "./SelectedFlightInfo";
import { Map } from "immutable";

class OfferAvailabilityResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flightOffer: this.props.data.map(
        trip => trip.checkOffer.data.flightOffers[0]
      ),
      dateOfBirth: new Map(),
      showAlert: true,
      firstName: new Map(),
      middleName: new Map(),
      lastName: new Map(),
      title: new Map(),
      email: "",
      phone: ""
    };
    this.traveler = {};
  }

  handleChangeFirstName = evt => {
    const item = evt.target.name;
    const value = evt.target.value;
    this.setState(prevState => ({
      firstName: prevState.firstName.set(item, value)
    }));
  };

  handleChangeMiddleName = evt => {
    const item = evt.target.name;
    const value = evt.target.value;
    this.setState(prevState => ({
      middleName: prevState.middleName.set(item, value)
    }));
  };

  handleChangeLastName = evt => {
    const item = evt.target.name;
    const value = evt.target.value;
    this.setState(prevState => ({
      lastName: prevState.lastName.set(item, value)
    }));
  };

  handleChangeTitle = evt => {
    const item = evt.target.name;
    const value = evt.target.value;
    this.setState(prevState => ({
      title: prevState.title.set(item, value)
    }));
  };

  handleEmailChange = evt => {
    this.setState({ email: evt.target.value });
    console.log(this.state);
  };

  onChangePhone = phone => {
    this.setState({ phone });
    console.log(this.state);
  };

  handleDateChange = (name, date) => {
    const item = name;
    const value = date;
    this.setState(prevState => ({
      dateOfBirth: prevState.dateOfBirth.set(item, value)
    }));
  };

  handleSubmit = () => {
    // Declare variables to store the inputted traveler info
    let firstName = [];
    let middleName = [];
    let lastName = [];
    let dateOfBirth = [];
    let title = [];

    // Push the key value pair of traveler details to the variables declared above
    this.state.firstName.forEach((val, key) => firstName.push([key, val]));
    this.state.lastName.forEach((val, key) => lastName.push([key, val]));
    this.state.middleName.forEach((val, key) => middleName.push([key, val]));
    this.state.dateOfBirth.forEach((val, key) => dateOfBirth.push([key, val]));
    this.state.title.forEach((val, key) => title.push([key, val]));

    // Store the formatted variable in an objectthis.
    this.traveler.firstName = firstName;
    this.traveler.middleName = middleName;
    this.traveler.lastName = lastName;
    this.traveler.dateOfBirth = dateOfBirth;
    this.traveler.title = title;
    this.traveler.email = this.state.email;
    this.traveler.phoneNum = this.state.phone;
    console.log(this.traveler);
    return this.traveler;
  };

  render() {
    const flightOffer = this.state.flightOffer;
    const warnings = this.props.data.map(trip => trip.checkOffer.warnings);
    const userInfo = this.props.userInfo;
    console.log(this.state);
    console.log(warnings);
    let hasWarnings;
    if (warnings.includes(null)) {
      hasWarnings = false;
    } else {
      hasWarnings = true;
    }

    return (
      <Container
        fluid
        style={{
          marginTop: "2em",
          padding: "5em",
          paddingTop: "0"
        }}
      >
        {this.state.showAlert && hasWarnings
          ? warnings.map(warnList =>
              warnList.map(warn => {
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
            )
          : ""}

        <Row>
          <Col md={12} lg={4} className="mb-5">
            <SelectedFlightInfo userInfo={userInfo} flightOffer={flightOffer} />
          </Col>

          <Col md={12} lg={8}>
            <TravelersInfo
              data={this.state}
              handleDateChange={this.handleDateChange}
              handleEmailChange={this.handleEmailChange}
              handleChangeFirstName={this.handleChangeFirstName}
              handleChangeMiddleName={this.handleChangeMiddleName}
              handleChangeLastName={this.handleChangeLastName}
              handleChangeTitle={this.handleChangeTitle}
              onChangePhone={this.onChangePhone}
              handleSubmit={this.handleSubmit}
              traveler={this.traveler}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default OfferAvailabilityResult;
