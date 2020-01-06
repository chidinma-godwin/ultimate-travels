import React from "react";
import {
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import qs from "qs";
import { withRouter } from "react-router-dom";
import Autocomplete from "./Autocomplete";

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
      cabin: "Economy",
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
      cabinClass: this.state.cabin,
      children: this.state.children.toString(),
      infants: this.state.infants.toString(),
      country: "NG",
      currency: "NGN",
      locale: "en-GB",
      originPlace: this.state.fromSelectedOption[0].CityId,
      destinationPlace: this.state.toSelectedOption[0].CityId,
      outboundDate: this.state.date.toISOString().split("T")[0],
      inboundDate: this.state.returnDate.toISOString().split("T")[0],
      adults: this.state.adults.toString(),
      groupPricing: true
    };

    axios
      .post("http://localhost:5000/skyscanner/", qs.stringify(this.userInfo), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => {
        console.log(res.data);
        let key = res.data.split("/");
        this.sessionKey = key[key.length - 1];
        console.log(this.sessionKey);
        const location = {
          pathname: "/flightDetails",
          state: {
            sessionKey: this.sessionKey,
            from: this.state.from,
            userInfo: this.userInfo,
            to: this.state.destination
          }
        };
        console.log(this.userInfo);
        console.log(location.state);
        this.props.history.push(location);
      })
      .catch(error => {
        console.log(error);
      });
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
        <Row className="mb-2">
          <Col>
            <Form.Label controlId="cabin" className="mr-1">
              Cabin class:
            </Form.Label>
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
          </Col>
        </Row>
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
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Col xs={12} sm={6} md={4} lg={2} className="mb-2">
            <Form.Label controlId="from" className="mr-1">
              Flying from
            </Form.Label>
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
