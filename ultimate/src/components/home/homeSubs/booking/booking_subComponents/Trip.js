import React from "react";
import {
  FormControl,
  Form,
  Col,
  Button,
  ButtonToolbar,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "./Autocomplete";
import PassengersCabinPopover from "./PassengersCabinPopover";
import { Redirect } from "react-router-dom";
import { Map } from "immutable";

class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.userInfo = {};
    let {
      from,
      to,
      travelClass,
      departureDate,
      returnDate,
      adults,
      infants,
      children,
    } = this.props.queryVariables;
    this.state = {
      from: from ? from : new Map(),
      destination: to ? to : new Map(),
      date: departureDate
        ? departureDate
        : new Map([["firstCity", new Date()]]),
      returnDate: returnDate
        ? returnDate
        : new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
      cabin: travelClass ? travelClass : "Economy",
      adults: adults ? adults : 1,
      infants: infants ? infants : 0,
      children: children ? children : 0,
      redirect: null,
    };
  }

  handleDateChange = (name, date) => {
    const item = name;
    const value = date;
    this.setState((prevState) => ({
      date: prevState.date.set(item, value),
      returnDate: date.getTime() + 1 * 24 * 60 * 60 * 1000,
    }));
  };

  handleReturnDateChange = (returnDate) => {
    this.setState({
      returnDate: returnDate,
    });
  };

  handleFromLocationChange = (name, selected) => {
    const item = name;
    const value = selected[0];
    this.setState((prevState) => ({
      from: prevState.from.set(item, value),
    }));
  };

  handleToLocationChange = (name, selected) => {
    const item = name;
    const value = selected[0];
    this.setState((prevState) => ({
      destination: prevState.destination.set(item, value),
    }));
  };

  increment = (evt) => {
    const className = evt.target.className.split(" ")[0];
    this.setState((prevState) => ({
      [className]: prevState[className] + 1,
    }));
  };

  decrement = (evt) => {
    const className = evt.target.className.split(" ")[0];
    if (className === "adults") {
      this.setState((prevState) => ({
        [className]: prevState[className] > 1 ? prevState[className] - 1 : 1,
      }));
    } else {
      this.setState((prevState) => ({
        [className]: prevState[className] ? prevState[className] - 1 : 0,
      }));
    }
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.id]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    // Declare variables to store the inputted traveler info
    let origin = [];
    let destination = [];
    let departureDate = [];

    // Push the key value pair of traveler details to the variables declared above
    this.state.from.forEach((val, key) => origin.push([key, val]));
    this.state.destination.forEach((val, key) => destination.push([key, val]));
    this.state.date.forEach((val, key) => departureDate.push([key, val]));

    const cabin = this.state.cabin.toUpperCase();

    this.userInfo = {
      travelClass:
        cabin === "Premium Economy"
          ? cabin.trim().split(" ").join("_")
          : cabin === "First Class"
          ? cabin.trim().split(" ")[0]
          : cabin,
      children: this.state.children,
      infants: this.state.infants,
      currencyCode: this.props.currency,
      departureDate: departureDate,
      returnDate: this.props.singleTrip
        ? undefined
        : this.props.multipletrip
        ? undefined
        : this.state.returnDate.toISOString().split("T")[0],
      adults: this.state.adults,
      from: origin,
      to: destination,
    };
    console.log(this.userInfo);
    this.setState({ redirect: "/flightDetails" });
  };

  render() {
    console.log(this.state);
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: this.state.redirect,
            state: {
              userInfo: this.userInfo,
              singleTrip: this.props.singleTrip,
            },
          }}
        />
      );
    }

    let travellers =
      Number(this.state.adults) +
      Number(this.state.children) +
      Number(this.state.infants);
    const popover = (
      <Popover style={{ width: "fitContent", padding: "1em" }}>
        <PassengersCabinPopover
          handleChange={this.handleChange}
          increment={this.increment}
          decrement={this.decrement}
          cabin={this.state.cabin}
          adults={this.state.adults}
          children={this.state.children}
          infants={this.state.infants}
          numAdults={6}
          numChildren={4}
          show={true}
        />
      </Popover>
    );

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          {this.props.selectedCityOptions.map((city, i) => {
            return (
              <React.Fragment key={i}>
                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  lg={this.props.multipletrip ? 4 : 2}
                  className="mb-2"
                >
                  <Form.Label className="mr-1">Flying from</Form.Label>
                  <Autocomplete
                    selectedOptions={
                      this.props.queryVariables.from &&
                      this.state.from.get(city)
                    }
                    handleAsyncChange={this.handleFromLocationChange.bind(
                      this,
                      city
                    )}
                  />
                </Col>

                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  lg={this.props.multipletrip ? 4 : 2}
                  className="mb-2"
                >
                  <Form.Label className="mr-1">Flying to</Form.Label>
                  <Autocomplete
                    selectedOptions={
                      this.props.queryVariables.to &&
                      this.state.destination.get(city)
                    }
                    handleAsyncChange={this.handleToLocationChange.bind(
                      this,
                      city
                    )}
                  />
                </Col>

                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  lg={this.props.multipletrip ? 4 : 2}
                  className="mb-2"
                >
                  <Form.Label className="mr-1">Depart</Form.Label>
                  <Form.Control
                    size="sm"
                    as="div"
                    style={{ border: "none", padding: "0" }}
                  >
                    <DatePicker
                      calenderClassName="form-control"
                      dateFormat="dd/MM/yyyy"
                      selected={this.state.date.get(city)}
                      value={this.state.date.get(city)}
                      name={city}
                      onChange={this.handleDateChange.bind(this, city)}
                      minDate={new Date()}
                      showDisabledMonthNavigation
                    />
                  </Form.Control>
                </Col>
              </React.Fragment>
            );
          })}

          {this.props.multipletrip === false ? (
            <Col xs={12} sm={6} md={4} lg={2} className="mb-2">
              <Form.Label className="mr-1">Return</Form.Label>
              <Form.Control
                size="sm"
                as="div"
                style={{ border: "none", padding: "0" }}
              >
                <DatePicker
                  calenderClassName="form-control"
                  dateFormat="dd/MM/yyyy"
                  selected={
                    this.props.singleTrip ? null : this.state.returnDate
                  }
                  onChange={this.handleReturnDateChange}
                  minDate={
                    new Date(
                      this.state.date.get("firstCity").getTime() +
                        1 * 24 * 60 * 60 * 1000
                    )
                  }
                  showDisabledMonthNavigation
                  placeholderText="(oneway)"
                  disabled={this.props.singleTrip}
                />
              </Form.Control>
            </Col>
          ) : (
            ""
          )}

          <Col
            xs={12}
            sm={6}
            md={5}
            lg={this.props.multipletrip ? 4 : 2}
            className="mb-2"
          >
            <Form.Label className="mr-1">Cabin & Passengers</Form.Label>
            <ButtonToolbar>
              <OverlayTrigger
                trigger="click"
                rootClose
                overlay={popover}
                placement="top"
              >
                <FormControl
                  id="passengers"
                  className="form-control-sm"
                  value={`${travellers} ${
                    (travellers === 1) & (this.state.adults === 1)
                      ? "adult"
                      : "travellers"
                  }, ${this.state.cabin}`}
                  readOnly
                />
              </OverlayTrigger>
            </ButtonToolbar>
          </Col>

          <Col xs={12} sm={6} md={3} lg={this.props.multipletrip ? 4 : 2}>
            <Form.Label className="mr-1"></Form.Label>
            <div style={{ width: "fit-content" }}>
              <Button variant="primary" type="submit">
                Search flight
              </Button>
            </div>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

export default Trip;
