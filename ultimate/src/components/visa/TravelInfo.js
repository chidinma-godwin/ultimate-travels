import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import CustomForm from "../CustomForm";

const TravelInfo = props => {
  return (
    <Row>
      <CustomForm
        labelClassName="font-weight-bold"
        controlId="departureDate"
        formGroupClassName="mb-3"
        elementType="div"
        label="Intended Departure Date"
        name="departureDate"
        value={props.departureDate}
        id="departureDate"
        onChange={props.handleDateChange.bind(this, "departureDate")}
        selected={props.departureDate}
        minDate={new Date()}
        showMore={false}
        lg="4"
        md="6"
        sm="12"
      />

      <CustomForm
        labelClassName="font-weight-bold"
        controlId="returnDate"
        formGroupClassName="mb-3"
        elementType="div"
        label="Intended Return Date"
        name="returnDate"
        value={props.returnDate}
        id="returnDate"
        onChange={props.handleDateChange.bind(props, "returnDate")}
        selected={props.returnDate}
        minDate={new Date()}
        showMore={false}
        lg="4"
        md="6"
        sm="12"
      />

      <CustomForm
        controlId="destination"
        labelClassName="font-weight-bold"
        formGroupClassName="mb-3"
        label="Destination Country"
        name="destination"
        value={props.destination}
        plainText={true}
        lg="4"
        md="6"
        sm="12"
      />

      {/* <CustomForm
                    controlId="destination"
                    labelClassName="font-weight-bold"
                    formGroupClassName="mb-3"
                    label="Destination Country"
                    name="destination"
                    value={props.destination}
                    // onChange={props.handleChange}
                    elementType="select"
                    option={
                      <>
                        {getNames().map(name => {
                          return <option>{name}</option>;
                        })}
                      </>
                    }
                    lg="4"
                    md="6"
                    sm="12"
                  /> */}
      <CustomForm
        labelClassName="font-weight-bold"
        controlId="passportNum"
        formGroupClassName="mb-3"
        label="Passport Number"
        name="passportNum"
        placeholder="Enter Passport Number"
        value={props.passportNum}
        onChange={props.handleChange}
        lg="4"
        md="6"
        sm="12"
      />

      <CustomForm
        labelClassName="font-weight-bold"
        controlId="passportExpiryDate"
        formGroupClassName="mb-3"
        elementType="div"
        label="Passport Expiry Date"
        name="passportExpiryDate"
        value={props.passportExpiryDate}
        id="passportExpiryDate"
        onChange={props.handleDateChange.bind(props, "passportExpiryDate")}
        selected={props.passportExpiryDate}
        placeholderText="DD/MM/YYYY"
        minDate={new Date()}
        lg="4"
        md="6"
        sm="12"
      />

      {/* <Form.Group
        controlId="phone"
        className="mb-3"
        as={Col}
        lg="4"
        md="6"
        sm="12"
      >
        <Form.Label className="font-weight-bold">Passport Data Page</Form.Label>
        <Form.Control type="file" onChange={props.onChangeFile} />
      </Form.Group> */}

      <CustomForm
        labelClassName="font-weight-bold"
        controlId="travelHistory"
        formGroupClassName="mb-3"
        label="Have you travelled outside your country of residence in the last five years?"
        name="travelHistory"
        value={props.travelHistory}
        onChange={props.handleChange}
        elementType="select"
        option={
          <>
            <option>Select</option>
            <option>Yes</option>
            <option>No</option>
          </>
        }
        lg="4"
        md="6"
        sm="12"
      />
    </Row>
  );
};

export default TravelInfo;
