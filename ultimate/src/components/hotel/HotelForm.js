import React from "react";
import {
  Form,
  Col,
  Button,
  Popover,
  ButtonToolbar,
  OverlayTrigger,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import Autocomplete from "../home/homeSubs/booking/booking_subComponents/Autocomplete";
import PassengersCabinPopover from "../home/homeSubs/booking/booking_subComponents/PassengersCabinPopover";
import { Redirect } from "react-router-dom";

class HotelForm extends React.Component {
  constructor() {
    super();
    this.state = {
      from: {},
      checkIn: new Date(),
      checkOut: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
      adults: 1,
      children: 0,
      childrenAges: [],
      c_age: 0,
      rooms: 1,
      age: 0,
      redirect: null,
    };
  }

  handleDateChange = (name, date) => {
    console.log(date);
    this.setState({
      [name]: date,
    });

    // Make the checkout date a day more than the checkin date
    if (name === "checkIn") {
      this.setState({
        checkOut: date.getTime() + 1 * 24 * 60 * 60 * 1000,
      });
    }
  };

  handleDestinationChange = (selected) => {
    this.setState({
      from: selected[0],
    });
  };

  increment = (evt) => {
    const className = evt.target.className.split(" ")[0];
    this.setState((prevState) => {
      if (className === "adults") {
        return {
          [className]: prevState[className] + 1,
        };
      } else {
        return {
          [className]: prevState[className] + 1,
          age: prevState.age + 1,
        };
      }
    });
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
        age: prevState.age - 1,
        childrenAges: prevState.childrenAges.filter(
          (age, i) => i !== prevState.childrenAges.length - 1
        ),
      }));
    }
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.id]: evt.target.value,
    });
  };

  handleChildrenChange = (evt) => {
    this.setState((prevState) => {
      return {
        [evt.target.id]: evt.target.value,
        childrenAges: prevState.childrenAges.concat(evt.target.value),
      };
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(this.state);
    this.setState({
      redirect: "/hotels",
    });
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: this.state.redirect,
            state: { searchParams: this.state },
          }}
        />
      );
    }
    const popover = (
      <Popover style={{ width: "fitContent", padding: "1.5em" }}>
        <PassengersCabinPopover
          increment={this.increment}
          decrement={this.decrement}
          adults={this.state.adults}
          children={this.state.children}
          infants={this.state.infants}
          handleChildrenChange={this.handleChildrenChange}
          childrenAges={this.state.childrenAges}
          c_age={this.state.c_age}
          numAdults={9}
          numChildren={4}
          age={this.state.age}
          show={false}
        />
      </Popover>
    );

    console.log(this.state.childrenAges);

    let travellers = this.state.adults + this.state.children;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group
            controlId="destination"
            as={Col}
            sm="6"
            md="4"
            lg="2"
            className="mb-2"
          >
            <Form.Label className="mr-1">City or Destination</Form.Label>
            <Autocomplete handleAsyncChange={this.handleDestinationChange} />
          </Form.Group>

          <Form.Group
            controlId="checkIn"
            as={Col}
            sm="6"
            md="4"
            lg="2"
            className="mb-2"
          >
            <Form.Label className="mr-1">Check in</Form.Label>
            <Form.Control
              size="sm"
              as="div"
              style={{ border: "none", padding: "0" }}
            >
              <DatePicker
                calenderClassName="form-control"
                selected={this.state.checkIn}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                showDisabledMonthNavigation
                name="checkIn"
                value={this.state.checkIn}
                id="checkInDate"
                onChange={this.handleDateChange.bind(this, "checkIn")}
              />
            </Form.Control>
          </Form.Group>

          <Form.Group
            controlId="checkOut"
            as={Col}
            sm="6"
            md="4"
            lg="2"
            className="mb-2"
          >
            <Form.Label className="mr-1">Check out</Form.Label>
            <Form.Control
              size="sm"
              as="div"
              style={{ border: "none", padding: "0" }}
            >
              <DatePicker
                calenderClassName="form-control"
                dateFormat="dd/MM/yyyy"
                selected={this.state.checkOut}
                // minDate={new Date()}
                minDate={
                  new Date(
                    this.state.checkIn.getTime() + 1 * 24 * 60 * 60 * 1000
                  )
                }
                showDisabledMonthNavigation
                name="checkOut"
                value={this.state.checkOut}
                id="checkOutDate"
                onChange={this.handleDateChange.bind(this, "checkOut")}
              />
            </Form.Control>
          </Form.Group>

          <Form.Group
            controlId="number-of-rooms"
            as={Col}
            sm="6"
            md="4"
            lg="2"
            className="mb-2"
          >
            <Form.Label className="mr-1">Number of Rooms</Form.Label>
            <Form.Control
              size="sm"
              name="rooms"
              value={this.state.rooms}
              onChange={this.handleChange}
              as="select"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
            </Form.Control>
          </Form.Group>

          <Form.Group
            controlId="guests"
            as={Col}
            sm="6"
            md="4"
            lg="2"
            className="mb-2"
          >
            <Form.Label className="mr-1">Guests</Form.Label>
            <ButtonToolbar>
              <OverlayTrigger
                trigger="click"
                rootClose
                overlay={popover}
                placement="top"
              >
                <Form.Control
                  className="form-control-sm"
                  value={travellers}
                  readOnly
                />
              </OverlayTrigger>
            </ButtonToolbar>
          </Form.Group>

          <Form.Group
            controlId="search"
            as={Col}
            sm="6"
            md="4"
            lg="2"
            className="mb-2"
          >
            <Form.Label className="mr-1"></Form.Label>
            <div style={{ width: "fit-content" }}>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </div>
          </Form.Group>
        </Form.Row>
      </Form>
    );
  }
}

export default HotelForm;
