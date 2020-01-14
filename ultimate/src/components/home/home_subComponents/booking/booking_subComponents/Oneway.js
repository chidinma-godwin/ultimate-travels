import React from "react";
import {
  FormControl,
  Form,
  Col,
  Button,
  ButtonToolbar,
  OverlayTrigger,
  Popover
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { withRouter } from "react-router-dom";
import Autocomplete from "./Autocomplete";
import PassengersCabinPopover from "./PassengersCabinPopover";

class OneWay extends React.Component {
  constructor() {
    super();
    this.userInfo = {};
    this.sessionKey = "";
    this.state = {
      from: {},
      destination: {},
      date: new Date(),
      returnDate: new Date(),
      cabin: "ECONOMY",
      adults: 1,
      infants: 0,
      children: 0,
      // places: [],
      fromSelectedOption: [],
      toSelectedOption: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = evt => {
    evt.preventDefault();
    this.userInfo = {
      travelClass: this.state.cabin,
      children: this.state.children,
      infants: this.state.infants,
      currencyCode: "USD",
      originLocationCode: this.state.fromSelectedOption[0].iataCode,
      destinationLocationCode: this.state.toSelectedOption[0].iataCode,
      departureDate: this.state.date.toISOString().split("T")[0],
      returnDate: this.state.returnDate.toISOString().split("T")[0],
      adults: this.state.adults,
      from: this.state.from,
      to: this.state.destination
    };
    console.log(this.userInfo);
    const location = {
      pathname: "/flightDetails",
      state: {
        userInfo: this.userInfo
      }
    };
    console.log(location.state);
    this.props.history.push(location);
  };

  handleChange = evt => {
    this.setState({
      [evt.target.id]: evt.target.value
    });
  };

  handleDateChange = date => {
    this.setState({
      date: date
    });
  };

  handleReturnDateChange = returnDate => {
    this.setState({
      returnDate: returnDate
    });
  };

  handleFromLocationChange = selected => {
    this.setState({
      fromSelectedOption: selected,
      from: selected[0]
    });
  };

  handleToLocationChange = selected => {
    this.setState({
      toSelectedOption: selected,
      destination: selected[0]
    });
  };

  increment = evt => {
    const className = evt.target.className.split(" ")[0];
    this.setState(prevState => ({
      [className]: prevState[className] + 1
    }));
  };

  decrement = evt => {
    const className = evt.target.className.split(" ")[0];
    if (className === "adults") {
      this.setState(prevState => ({
        [className]: prevState[className] > 1 ? prevState[className] - 1 : 1
      }));
    } else {
      this.setState(prevState => ({
        [className]: prevState[className] ? prevState[className] - 1 : 0
      }));
    }
  };

  render() {
    let travellers =
      this.state.adults + this.state.children + this.state.infants;
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
        />
      </Popover>
    );
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Col xs={12} sm={6} md={4} lg={2} className="mb-2">
            <Form.Label controlId="from" className="mr-1">
              Flying from
            </Form.Label>
            <Autocomplete handleAsyncChange={this.handleFromLocationChange} />
          </Col>

          <Col xs={12} sm={6} md={4} lg={2} className="mb-2">
            <Form.Label controlId="destination" className="mr-1">
              Flying to
            </Form.Label>
            <Autocomplete handleAsyncChange={this.handleToLocationChange} />
          </Col>

          <Col xs={12} sm={6} md={4} lg={2} className="mb-2">
            <Form.Label controlId="date" className="mr-1">
              Depart
            </Form.Label>
            <DatePicker
              id="date"
              className="form-control"
              selected={this.state.date}
              onChange={this.handleDateChange}
            />
          </Col>

          <Col xs={12} sm={6} md={4} lg={2} className="mb-2">
            <Form.Label controlId="date" className="mr-1">
              Return
            </Form.Label>
            <DatePicker
              id="returnDate"
              className="form-control"
              selected={this.state.returnDate}
              onChange={this.handleReturnDateChange}
            />
          </Col>

          <Col xs={12} sm={6} md={5} lg={2} className="mb-2">
            <Form.Label controlId="passengers" className="mr-1">
              Cabin class & Passengers
            </Form.Label>
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

          <Col xs={12} sm={6} md={3} lg={2}>
            {/* <Link to={{pathname: "/flightDetails", state: {userData: this.state}}}> */}
            <Form.Label controlId="date" className="mr-1"></Form.Label>
            <div style={{ width: "fit-content" }}>
              <Button variant="primary" type="submit">
                Search flight
              </Button>
              {/* </Link> */}
            </div>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

export default withRouter(OneWay);
