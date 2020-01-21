import React from "react";
import PropTypes from "prop-types";
import { Form, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";

const CustomForm = ({
  controlId,
  elementType,
  placeholder,
  label,
  value = "",
  name,
  onChange,
  DOB
}) => {
  if (elementType === "select") {
    return (
      <Form.Group controlId={controlId} as={Col}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as={elementType}
          value={value}
          onChange={onChange}
          name={name}
          size="sm"
        >
          <option>MR</option>
          <option>MRS</option>
          <option>MISSS</option>
        </Form.Control>
      </Form.Group>
    );
  } else if (elementType === "div") {
    return (
      <Form.Group controlId={controlId} as={Col}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as={elementType}
          //   placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          size="sm"
          style={{ border: "none", padding: "0" }}
        >
          <DatePicker
            selected={DOB}
            onChange={onChange}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </Form.Control>
      </Form.Group>
    );
  } else {
    return (
      <Form.Group controlId={controlId} as={Col}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          size="sm"
        ></Form.Control>
      </Form.Group>
    );
  }
};

CustomForm.propTypes = {
  controlId: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  elementType: PropTypes.string
};

export default CustomForm;
