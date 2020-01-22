import React from "react";
import { Card, Form, Col } from "react-bootstrap";
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
    let {
      flightOffer,
      dateOfBirth,
      firstName,
      middleName,
      lastName,
      title,
      email,
      phone
    } = this.props.data;
    let {
      handleDateChange,
      handleEmailChange,
      handleChangeFirstName,
      handleChangeMiddleName,
      handleChangeLastName,
      handleChangeTitle,
      onChangePhone
    } = this.props;
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
        <Card.Body className="mb-3">
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
                <div key={traveler.travelerId} className="mb-4">
                  <Card.Title>
                    {traveler.travelerId === "1"
                      ? "Adult (Primary Contact)"
                      : `${passengerPosition} ${type}`}
                  </Card.Title>
                  <Form.Row>
                    <CustomForm
                      controlId={`firstname${traveler.travelerId}`}
                      label="First Name"
                      name={`firstName${traveler.travelerId}`}
                      placeholder="Enter First Name"
                      value={firstName.get(`firstName${traveler.travelerId}`)}
                      onChange={handleChangeFirstName}
                    />

                    <CustomForm
                      controlId={`middlename${traveler.travelerId}`}
                      label="Middle Name"
                      name={`middleName${traveler.travelerId}`}
                      placeholder="Enter Middle Name"
                      value={middleName.get(`middleName${traveler.travelerId}`)}
                      onChange={handleChangeMiddleName}
                    />

                    <CustomForm
                      controlId={`lastname${traveler.travelerId}`}
                      label="Last Name"
                      name={`lastName${traveler.travelerId}`}
                      placeholder="Enter Last Name"
                      value={lastName.get(`lastName${traveler.travelerId}`)}
                      onChange={handleChangeLastName}
                    />
                  </Form.Row>

                  <Form.Row>
                    <CustomForm
                      controlId={`title${traveler.travelerId}`}
                      label="Title"
                      name={`title${traveler.travelerId}`}
                      elementType="select"
                      value={title.get(`title${traveler.travelerId}`)}
                      onChange={handleChangeTitle}
                    />

                    <CustomForm
                      controlId={`date-of-birth${traveler.travelerId}`}
                      elementType="div"
                      label="Date of Birth"
                      name={`dateOfBirth${traveler.travelerId}`}
                      value={dateOfBirth.get(
                        `dateOfBirth${traveler.travelerId}`
                      )}
                      id="date"
                      onChange={handleDateChange.bind(
                        this,
                        `dateOfBirth${traveler.travelerId}`
                      )}
                      placeholderText="YYYY/DD/MM"
                      DOB={dateOfBirth.get(`dateOfBirth${traveler.travelerId}`)}
                    />
                  </Form.Row>

                  {traveler.travelerId === "1" ? (
                    <Form.Row>
                      <Form.Group
                        controlId={`email${traveler.travelerId}`}
                        as={Col}
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          placeholder="Enter Email"
                          onChange={handleEmailChange}
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
                          value={phone}
                          onChange={phone => onChangePhone(phone)}
                        />
                      </Form.Group>
                    </Form.Row>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default TravelersInfo;
