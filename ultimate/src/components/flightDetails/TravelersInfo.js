import React from "react";
import { Card, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CustomForm from "../CustomForm";

class TravelersInfo extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  stringifyNumber = n => {
    let special = [
      "Zeroth",
      "First",
      "Second",
      "Third",
      "Fourth",
      "Fifth",
      "Sixth",
      "Seventh",
      "Eighth",
      "Ninth",
      "Tenth",
      "Eleventh",
      "Twelfth",
      "Thirteenth",
      "Fourteenth",
      "Fifteenth",
      "Sixteenth",
      "Seventeenth",
      "Eighteenth",
      "Nineteenth"
    ];
    let deca = [
      "Twent",
      "Thirt",
      "Fort",
      "Fift",
      "Sixt",
      "Sevent",
      "Eight",
      "Ninet"
    ];

    if (n < 20) return special[n];
    if (n % 10 === 0) return deca[Math.floor(n / 10) - 2] + "ieth";
    return deca[Math.floor(n / 10) - 2] + "y-" + special[n % 10];
  };

  render() {
    let { flightOffer, DOB, handleDateChange, handleChange } = this.props;
    flightOffer.countAdult = 0;
    flightOffer.countChildren = 0;
    flightOffer.countInfant = 0;
    return (
      <Card>
        <Card.Header
          style={{
            fontSize: "1.5em",
            backgroundColor: "lightslategrey",
            color: "white"
          }}
        >
          TRAVELLER'S INFORMATION
        </Card.Header>
        <Card.Body key={traveler.travelerId} className="mb-3">
          <Form>
            {flightOffer.travelerPricings.map(traveler => {
              let type = "";
              let passengerPosition = 0;
              if (traveler.travelerType === "ADULT") {
                flightOffer.countAdult += 1;
                type = "Adult";
                passengerPosition = this.stringifyNumber(
                  flightOffer.countAdult
                );
              }
              if (traveler.travelerType === "CHILD") {
                flightOffer.countChildren += 1;
                type = "Child";
                passengerPosition = this.stringifyNumber(
                  flightOffer.countChildren
                );
              }
              if (traveler.travelerType === "INFANT") {
                flightOffer.countInfant += 1;
                type = "Infant";
                passengerPosition = this.stringifyNumber(
                  flightOffer.countInfant
                );
              }
              return (
                <React.Fragment>
                  <Card.Title>
                    {traveler.travelerId === "1"
                      ? "Adult (Primary Contact)"
                      : `${passengerPosition} ${type}`}
                  </Card.Title>
                  <Form.Row>
                    <Form.Group
                      controlId={`firstname${traveler.travelerId}`}
                      as={Col}
                    >
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        placeholder="First name"
                        value={}
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group
                      controlId={`middlename${traveler.travelerId}`}
                      as={Col}
                    >
                      <Form.Label>Middle Name</Form.Label>
                      <Form.Control
                        placeholder="Middle name"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group
                      controlId={`lastname${traveler.travelerId}`}
                      as={Col}
                    >
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        placeholder="Last name"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group
                      controlId={`title${traveler.travelerId}`}
                      as={Col}
                    >
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        size="sm"
                        as="select"
                        onChange={handleChange}
                        value={""}
                      >
                        <option>MR</option>
                        <option>MRS</option>
                        <option>MISSS</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group
                      controlId={`date-of-birth${traveler.travelerId}`}
                      as={Col}
                    >
                      {/* <Col xs={12} sm={6} md={4} lg={2} className="mb-2"> */}
                      <Form.Label>Date Of Birth</Form.Label>
                      <Form.Control
                        size="sm"
                        as="div"
                        style={{ border: "none", padding: "0" }}
                      >
                        <DatePicker
                          selected={DOB}
                          onChange={handleDateChange}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group
                      controlId={`email${traveler.travelerId}`}
                      as={Col}
                    >
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        onChange={handleChange}
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group
                      controlId={`phonenumber${traveler.travelerId}`}
                      as={Col}
                    >
                      <Form.Label>Phone Number</Form.Label>
                      <PhoneInput
                        inputProps={{
                          id: `phonenumber${traveler.travelerId}`,
                          className: "form-control phone-form-control",
                          required: true,
                          autoFocus: true
                        }}
                        country={"ng"}
                        value={this.state.phone}
                        onChange={phone => {
                          this.setState({ phone });
                        }}
                      />
                    </Form.Group>
                  </Form.Row>
                </React.Fragment>
              );
            })}
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default TravelersInfo;
