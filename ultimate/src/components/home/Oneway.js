import React from "react";
import {
  InputGroup,
  FormControl,
  Form,
  Col,
  Popover,
  Table,
  Row,
  Button,
  ButtonToolbar,
  OverlayTrigger,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
import AsyncAutocomplete from "./AsyncAutocomplete";

class OneWay extends React.Component {
  constructor() {
    super();
    this.state = {
      from: "",
      destination: "",
      date: Date.now(),
      cabin: "",
      adults: 1,
      infants: 0,
      children: 0,
      places: [],
      selected: []
    };
  }

  // componentDidMount() {
  //   axios.get('http://localhost:4000/api/flights/lond')
  //     .then(response => {
  //         console.log(response.data);
  //         this.setState({
  //           places: response.data.map(place => place.PlaceName)
  //       })
  //     })
  //     .then(()=> console.log(this.state.places))
  //     .catch(err => console.log(err))
  // }

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

  increment = evt => {
    const className = evt.target.className.split(" ")[0];
    this.setState(prevState => ({
      [className]: prevState[className] + 1
    }))
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
          <Col xs={12} sm={6}>
            Adults <div>(11+ yrs)</div>
          </Col>
          <Col xs={12} sm={6}>
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
          </Col>
        </Row>
        <Row className="mb-2">
          <Col xs={12} sm={6}>
            Children <div>(2-11 yrs)</div>
          </Col>
          <Col xs={12} sm={6}>
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
          </Col>
        </Row>
        <Row className="mb-2">
          <Col xs={12} sm={6}>
            Infants <div>(below 2 yrs)</div>
          </Col>
          <Col xs={12} sm={6}>
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
          </Col>
        </Row>
        <Button onClick={() => document.body.click()}>Done</Button>
      </Popover>
    )
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <Col sm={12} md={6} lg={4}>
          <label htmlFor="from">Flying from: </label>
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
              aria-label="city or airport"
              aria-describedby="basic-addon1"
              onChange={this.handleChange}
              value={this.state.from}
            /> */}
            <AsyncAutocomplete />
          </InputGroup>
        </Col>

        <Col sm={12} md={6} lg={4}>
          <label htmlFor="destination">Flying to: </label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="addon2">
                <FontAwesomeIcon
                  icon={["fas", "plane-arrival"]}
                  style={{ size: "lg" }}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="destination"
              className="form-control-sm"
              placeholder="Enter city name or airport"
              aria-label="city or airpot"
              aria-describedby="addon2"
              onChange={this.handleChange}
              value={this.state.destination}
            />
          </InputGroup>
        </Col>

        <Col sm={12} md={6} lg={4}>
          <label htmlFor="date">Departure date: </label>
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
        </Col>

        <Col sm={12} md={6} lg={4}>
          <label htmlFor="cabin">Cabin class: </label>
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
        </Col>

        <Col sm={12} md={6} lg={4}>
          <label htmlFor="passengers">No. of Passengers</label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="addon5">
                <FontAwesomeIcon icon={["fas", "users"]} style={{ size: "lg" }} />
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
        </Col>

        <Col sm={12} md={6} lg={4}>
          <Button variant="primary" type="submit">
            Search flight
        </Button>
        </Col>
      </Form>
    );
  }
}

export default OneWay;
