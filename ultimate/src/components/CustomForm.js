import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const CustomForm = ({
  controlId,
  elementType,
  placeholder,
  label,
  value,
  name,
  onChange
}) => (
  <Form.Group controlId={controlId} as={Col}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      as={elementType}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    ></Form.Control>
  </Form.Group>
);

CustomForm.propTypes = {
  controlId: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  elementType: PropTypes.string
};

export default CustomForm;
