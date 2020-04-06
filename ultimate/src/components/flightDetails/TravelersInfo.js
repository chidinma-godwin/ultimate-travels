import React from "react";
import { Card, Form, Col, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Mutation } from "react-apollo";
import { addTraveler } from "../../queries/queries";
import CustomForm from "../CustomForm";

const TravelersInfo = (props) => {
  const stringifyNumber = (n) => {
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
      "Nineteenth",
    ];
    let deca = [
      "Twent",
      "Thirt",
      "Fort",
      "Fift",
      "Sixt",
      "Sevent",
      "Eight",
      "Ninet",
    ];

    if (n < 20) return special[n];
    if (n % 10 === 0) return deca[Math.floor(n / 10) - 2] + "ieth";
    return deca[Math.floor(n / 10) - 2] + "y-" + special[n % 10];
  };

  let {
    flightOffer,
    dateOfBirth,
    firstName,
    middleName,
    lastName,
    title,
    email,
    phone,
  } = props.data;
  let {
    handleDateChange,
    handleEmailChange,
    handleChangeFirstName,
    handleChangeMiddleName,
    handleChangeLastName,
    handleChangeTitle,
    onChangePhone,
    handleSubmit,
  } = props;
  flightOffer.countAdult = 0;
  flightOffer.countChildren = 0;
  flightOffer.countInfant = 0;
  return (
    <Mutation mutation={addTraveler}>
      {(addTraveler) => (
        <Card>
          <Card.Header
            style={{
              fontSize: "1.5em",
              backgroundColor: "#f68220",
              color: "white",
            }}
          >
            TRAVELLER'S INFORMATION
          </Card.Header>
          <Card.Body className="mb-3 p-3">
            <Form>
              {flightOffer[0].travelerPricings.map((traveler) => {
                let type = "";
                let passengerPosition = 0;
                if (traveler.travelerType === "ADULT") {
                  flightOffer.countAdult += 1;
                  type = "Adult";
                  passengerPosition = stringifyNumber(flightOffer.countAdult);
                }
                if (traveler.travelerType === "CHILD") {
                  flightOffer.countChildren += 1;
                  type = "Child";
                  passengerPosition = stringifyNumber(
                    flightOffer.countChildren
                  );
                }
                if (traveler.travelerType === "INFANT") {
                  flightOffer.countInfant += 1;
                  type = "Infant";
                  passengerPosition = stringifyNumber(flightOffer.countInfant);
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
                        name={`firstname${type}${traveler.travelerId}`}
                        placeholder="Enter First Name"
                        value={firstName.get(
                          `firstname${type}${traveler.travelerId}`
                        )}
                        onChange={handleChangeFirstName}
                        lg="4"
                        md="6"
                        sm="12"
                      />

                      <CustomForm
                        controlId={`middlename${traveler.travelerId}`}
                        label="Middle Name"
                        name={`middlename${type}${traveler.travelerId}`}
                        placeholder="Enter Middle Name"
                        value={middleName.get(
                          `middlename${type}${traveler.travelerId}`
                        )}
                        onChange={handleChangeMiddleName}
                        lg="4"
                        md="6"
                        sm="12"
                      />

                      <CustomForm
                        controlId={`lastname${traveler.travelerId}`}
                        label="Last Name"
                        name={`lastname${type}${traveler.travelerId}`}
                        placeholder="Enter Last Name"
                        value={lastName.get(
                          `lastname${type}${traveler.travelerId}`
                        )}
                        onChange={handleChangeLastName}
                        lg="4"
                        md="6"
                        sm="12"
                      />

                      <CustomForm
                        controlId={`title${traveler.travelerId}`}
                        label="Title"
                        name={`title${type}${traveler.travelerId}`}
                        elementType="select"
                        value={title.get(`title${type}${traveler.travelerId}`)}
                        onChange={handleChangeTitle}
                        option={
                          <>
                            <option>Mr</option>
                            <option>Mrs</option>
                            <option>Miss</option>
                          </>
                        }
                        lg="6"
                        md="6"
                        sm="12"
                      />

                      <CustomForm
                        controlId={`date-of-birth${traveler.travelerId}`}
                        elementType="div"
                        label="Date of Birth"
                        name={`dateOfBirth-${type}${traveler.travelerId}`}
                        value={dateOfBirth.get(
                          `dateOfBirth-${type}${traveler.travelerId}`
                        )}
                        id="date"
                        onChange={handleDateChange.bind(
                          this,
                          `dateOfBirth-${type}${traveler.travelerId}`
                        )}
                        placeholderText="DD/MM/YYYY"
                        selected={dateOfBirth.get(
                          `dateOfBirth-${type}${traveler.travelerId}`
                        )}
                        lg="6"
                        md="6"
                        sm="12"
                      />

                      {traveler.travelerId === "1" ? (
                        <>
                          <Form.Group
                            controlId={`email${traveler.travelerId}`}
                            as={Col}
                            lg="6"
                            md="6"
                            sm="12"
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
                            lg="6"
                            md="6"
                            sm="12"
                          >
                            <Form.Label>Phone Number</Form.Label>
                            <PhoneInput
                              inputProps={{
                                id: `phonenumber${traveler.travelerId}`,
                                className: "form-control phone-form-control",
                                required: true,
                                autoFocus: true,
                              }}
                              country={"ng"}
                              value={phone}
                              onChange={(phone) => onChangePhone(phone)}
                            />
                          </Form.Group>
                        </>
                      ) : (
                        ""
                      )}
                    </Form.Row>
                  </div>
                );
              })}

              <Button
                type="submit"
                onClick={async (evt) => {
                  evt.preventDefault();
                  handleSubmit();
                  await addTraveler({ variables: { input: props.traveler } });
                }}
              >
                Continue
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Mutation>
  );
};

export default TravelersInfo;
