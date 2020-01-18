import React from "react";
import PropTypes from "prop-types";
import { FormCheck } from "react-bootstrap";

const Checkbox = ({
  type = "checkbox",
  name,
  checked = true,
  onChange,
  label
}) => (
  <FormCheck
    type={type}
    label={label}
    name={name}
    checked={checked}
    onChange={onChange}
  />
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default Checkbox;
