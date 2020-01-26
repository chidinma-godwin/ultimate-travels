import React from "react";
import CustomForm from "../CustomForm";
import { getNames } from "country-list";
import { Form, Col, Row } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";

const PersonalInfo = props => {
  return (
    <Row>
      <CustomForm
        controlId="title"
        labelClassName="font-weight-bold"
        formGroupClassName="mb-3"
        label="Title"
        name="title"
        value={props.title}
        onChange={props.handleChange}
        elementType="select"
        option={
          <>
            <option>Select</option>
            <option>Dr</option>
            <option>Hon</option>
            <option>HRH</option>
            <option>Mr</option>
            <option>MISS</option>
            <option>Mrs</option>
            <option>Prof</option>
            <option>Pst</option>
            <option>Sen</option>
          </>
        }
        lg="4"
        md="6"
        sm="12"
      />

      <CustomForm
        labelClassName="font-weight-bold"
        controlId="firstName"
        formGroupClassName="mb-3"
        label="First Name"
        name="firstName"
        placeholder="Enter First Name"
        value={props.firstName}
        onChange={props.handleChange}
        lg="4"
        md="6"
        sm="12"
      />

      <CustomForm
        labelClassName="font-weight-bold"
        controlId="middleName"
        formGroupClassName="mb-3"
        label="Middle Name"
        name="middleName"
        placeholder="Enter Middle Name"
        value={props.middleName}
        onChange={props.handleChange}
        lg="4"
        md="6"
        sm="12"
      />

      <CustomForm
        labelClassName="font-weight-bold"
        controlId="lastName"
        formGroupClassName="mb-3"
        label="Last Name"
        name="lastName"
        placeholder="Enter Last Name"
        value={props.lastName}
        onChange={props.handleChange}
        lg="4"
        md="6"
        sm="12"
      />

      <CustomForm
        labelClassName="font-weight-bold"
        controlId="dateOfBirth"
        formGroupClassName="mb-3"
        elementType="div"
        label="Date of Birth"
        name="dateOfBirth"
        value={props.dateOfBirth}
        id="date"
        onChange={props.handleDateChange.bind(props, "dateOfBirth")}
        placeholderText="DD/MM/YYYY"
        selected={props.dateOfBirth}
        lg="4"
        md="6"
        sm="12"
      />

      <CustomForm
        labelClassName="font-weight-bold"
        controlId="status"
        formGroupClassName="mb-3"
        label="Marital Status"
        name="status"
        value={props.status}
        onChange={props.handleChange}
        elementType="select"
        option={
          <>
            <option>Select</option>
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
          </>
        }
        lg="4"
        md="6"
        sm="12"
      />

      <CustomForm
        labelClassName="font-weight-bold"
        controlId="gender"
        formGroupClassName="mb-3"
        label="Gender"
        name="gender"
        value={props.gender}
        onChange={props.handleChange}
        elementType="select"
        option={
          <>
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
          </>
        }
        lg="4"
        md="6"
        sm="12"
      />

      <Form.Group
        controlId="phone"
        className="mb-3"
        as={Col}
        lg="4"
        md="6"
        sm="12"
      >
        <Form.Label className="font-weight-bold">Phone Number</Form.Label>
        <PhoneInput
          inputProps={{
            id: "phone",
            className: "form-control phone-form-control",
            required: true,
            autoFocus: true
          }}
          country={"ng"}
          value={props.phone}
          onChange={phone => props.onChangePhone(phone)}
        />
      </Form.Group>

      <CustomForm
        controlId="nationality"
        labelClassName="font-weight-bold"
        formGroupClassName="mb-3"
        label="Nationality"
        name="nationality"
        value={props.nationality}
        onChange={props.handleChange}
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
      />

      <CustomForm
        labelClassName="font-weight-bold"
        controlId="employmentStatus"
        formGroupClassName="mb-3"
        label="Employment Status"
        name="employmentStatus"
        value={props.employmentStatus}
        onChange={props.handleChange}
        elementType="select"
        option={
          <>
            <option>Select</option>
            <option>Employed</option>
            <option>Self Employed</option>
            <option>Unemployed</option>
          </>
        }
        lg="4"
        md="6"
        sm="12"
      />

      <CustomForm
        labelClassName="font-weight-bold"
        controlId="address"
        formGroupClassName="mb-3"
        label="Address"
        name="address"
        placeholder="Enter Address"
        value={props.address}
        onChange={props.handleChange}
        lg="4"
        md="6"
        sm="12"
      />
    </Row>
  );
};

export default PersonalInfo;
