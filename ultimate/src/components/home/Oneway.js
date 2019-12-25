import React from "react";
import {
  InputGroup,
  FormControl,
  Form,
  Popover,
  Table,
  Col,
  Row,
  Button,
  ButtonToolbar,
  OverlayTrigger
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import Autocomplete from "./Autocomplete";

class OneWay extends React.Component {
  constructor() {
    super();
    this.state = {
      from: "",
      destination: "",
      date: new Date(),
      cabin: "",
      adults: 1,
      infants: 0,
      children: 0,
      // places: [],
      fromSelectedOption: [],
      toSelectedOption: [],
    };
  }

  handleSubmit = evt => {
    evt.preventDefault();
    console.log(this.state);
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

  handleFromLocationChange = selected => {
    this.setState({
      fromSelectedOption: selected,
      from: selected[0].PlaceName
    });
  };

  handleToLocationChange = selected => {
    this.setState({
      toSelectedOption: selected,
      destination: selected[0].PlaceName
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
    const popover = (
      <Popover style={{ width: "fitContent", padding: "1em" }}>
        <Row className="mb-2">
          <Form.Group as={Col} xs={12} sm={6}>
            Adults <div>(11+ yrs)</div>
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6}>
            <Table bordered>
              <tbody>
                <tr>
                  <td className="adults custom-btn" onClick={this.decrement}>
                    -
                  </td>
                  <td>{this.state.adults}</td>
                  <td className="adults custom-btn" onClick={this.increment}>
                    +
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} xs={12} sm={6}>
            Children <div>(2-11 yrs)</div>
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6}>
            <Table bordered>
              <tbody>
                <tr>
                  <td className="children custom-btn" onClick={this.decrement}>
                    -
                  </td>
                  <td>{this.state.children}</td>
                  <td className="children custom-btn" onClick={this.increment}>
                    +
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} xs={12} sm={6}>
            Infants <div>(below 2 yrs)</div>
          </Form.Group>
          <Form.Group as={Col} xs={12} sm={6}>
            <Table bordered>
              <tbody>
                <tr>
                  <td className="infants custom-btn" onClick={this.decrement}>
                    -
                  </td>
                  <td>{this.state.infants}</td>
                  <td className="infants custom-btn" onClick={this.increment}>
                    +
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form.Group>
        </Row>
        <Button onClick={() => document.body.click()}>Done</Button>
      </Popover>
    );
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <Form.Group as={Col} sm={12} md={6} lg={4}>
          <Form.Label htmlFor="from">Flying from:</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <FontAwesomeIcon
                  icon={["fas", "plane-departure"]}
                  style={{ size: "lg" }}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            {/* <Typeahead
            id="fillCity"
              onChange={(selected) => {
                this.setState({ selected });
              }}
              options={this.state.places}
              selected={this.state.selected}
            /> */}
            {/* <FormControl
              id="from"
              className="form-control-sm"
              placeholder="Enter city name or airport"
              aria-Form.Label="city or airport"
              aria-describedby="basic-addon1"
              onChange={this.handleChange}
              value={this.state.from}
            /> */}
            <Autocomplete handleAsyncChange={this.handleFromLocationChange} />
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6} lg={4}>
          <Form.Label htmlFor="destination">Flying to: </Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="addon2">
                <FontAwesomeIcon
                  icon={["fas", "plane-arrival"]}
                  style={{ size: "lg" }}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Autocomplete handleAsyncChange={this.handleToLocationChange} />
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6} lg={4}>
          <Form.Label htmlFor="date">Departure date: </Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="addon3">
                <FontAwesomeIcon
                  icon={["fas", "calendar-alt"]}
                  style={{ size: "lg" }}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <DatePicker
              id="date"
              className="form-control"
              selected={this.state.date}
              onChange={this.handleDateChange}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6} lg={4}>
          <Form.Label htmlFor="cabin">Cabin class: </Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="addon4">
                <FontAwesomeIcon
                  icon={["fas", "chair"]}
                  style={{ size: "lg" }}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="cabin"
              className="form-control-sm"
              as="select"
              onChange={this.handleChange}
              value={this.state.cabin}
            >
              <option>--Choose a cabin class--</option>
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </FormControl>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6} lg={4}>
          <Form.Label htmlFor="passengers">No. of Passengers</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="addon5">
                <FontAwesomeIcon
                  icon={["fas", "users"]}
                  style={{ size: "lg" }}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
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
                  value={`${this.state.adults} ${
                    this.state.adults > 1 ? "adults" : "adult"
                  }, ${this.state.children} ${
                    this.state.children > 1 ? "children" : "child"
                  }, ${this.state.infants} ${
                    this.state.infants > 1 ? "infants" : "infant"
                  }`}
                  readOnly
                />
              </OverlayTrigger>
            </ButtonToolbar>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} sm={12} md={6} lg={4}>
          <Link to={{pathname: "/flightDetails", state: {userData: this.state}}}>
          <Button variant="primary" type="submit">
            Search flight
          </Button>
          </Link>
        </Form.Group>
      </Form>
    );
  }
}

export default OneWay;
