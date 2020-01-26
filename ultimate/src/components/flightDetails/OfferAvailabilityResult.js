import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import TravelersInfo from "./TravelersInfo";
import SelectedFlightInfo from "./SelectedFlightInfo";
import { Map } from "immutable";

class OfferAvailabilityResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flightOffer: this.props.data.checkOffer.data.flightOffers[0],
      dateOfBirth: new Map(),
      showAlert: true,
      firstName: new Map(),
      middleName: new Map(),
      lastName: new Map(),
      title: new Map(),
      email: "",
      phone: ""
    };
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
    {
      this.setState({ phone });
    }
    console.log(this.state);
  };

  handleDateChange = (name, date) => {
    const item = name;
    const value = date;
    this.setState(prevState => ({
      dateOfBirth: prevState.dateOfBirth.set(item, value)
    }));
  };

  handleSubmit = evt => {
    evt.preventDefault();
    console.log("it worked");
    let firstName = {};
    let middleName = {};
    let lastName = {};
    let dateOfBirth = {};
    let title = {};
    this.state.firstName.forEach((val, key) => (firstName[key] = val));
    this.state.lastName.forEach((val, key) => (lastName[key] = val));
    this.state.middleName.forEach((val, key) => (middleName[key] = val));
    this.state.dateOfBirth.forEach(
      (val, key) => (dateOfBirth[key] = val.toIsoString().split("T")[0])
    );
    this.state.title.forEach((val, key) => (title[key] = val));
    console.log(firstName, middleName, lastName, dateOfBirth, title);
    return [
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      title,
      this.state.email,
      this.state.phone
    ];
  };

  render() {
    const flightOffer = this.state.flightOffer;
    const warnings = this.props.data.checkOffer.warnings;
    const userInfo = this.props.userInfo;
    console.log(this.state);

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
              data={this.state}
              handleDateChange={this.handleDateChange}
              handleEmailChange={this.handleEmailChange}
              handleChangeFirstName={this.handleChangeFirstName}
              handleChangeMiddleName={this.handleChangeMiddleName}
              handleChangeLastName={this.handleChangeLastName}
              handleChangeTitle={this.handleChangeTitle}
              onChangePhone={this.onChangePhone}
              handleSubmit={this.handleSubmit}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default OfferAvailabilityResult;
