import React from "react";
import PropTypes from "prop-types";
import { Form, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";

const CustomForm = ({
  controlId,
  elementType,
  placeholder,
  placeholderText,
  label,
  lg,
  md,
  sm,
  xs,
  value = "",
  name,
  onChange,
  option,
  selected = "",
  labelClassName,
  formGroupClassName,
  showMore = true,
  minDate = undefined,
  plaintext = false,
  type = "text"
}) => {
  if (elementType === "select") {
    return (
      <Form.Group
        controlId={controlId}
        className={formGroupClassName}
        as={Col}
        lg={lg}
        md={md}
        sm={sm}
        xs={xs}
      >
        <Form.Label className={labelClassName}>{label}</Form.Label>
        <Form.Control
          as={elementType}
          value={value}
          onChange={onChange}
          name={name}
          size="sm"
          plaintext={plaintext}
        >
          {option}
        </Form.Control>
      </Form.Group>
    );
  } else if (elementType === "div") {
    return (
      <Form.Group
        controlId={controlId}
        as={Col}
        lg={lg}
        md={md}
        sm={sm}
        xs={xs}
      >
        <Form.Label className={labelClassName}>{label}</Form.Label>
        <Form.Control
          as={elementType}
          size="sm"
          style={{ border: "none", padding: "0" }}
        >
          <DatePicker
            selected={selected}
            dateFormat="dd/MM/yyyy"
            name={name}
            placeholderText={placeholderText}
            peekNextMonth={showMore}
            showMonthDropdown={showMore}
            showYearDropdown={showMore}
            dropdownMode={showMore ? "select" : undefined}
            minDate={minDate}
            onChange={onChange}
          />
        </Form.Control>
      </Form.Group>
    );
  } else {
    return (
      <Form.Group
        controlId={controlId}
        as={Col}
        lg={lg}
        md={md}
        sm={sm}
        xs={xs}
      >
        <Form.Label className={labelClassName}>{label}</Form.Label>
        <Form.Control
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          size="sm"
          type={type}
          plaintext={plaintext}
        ></Form.Control>
      </Form.Group>
    );
  }
};

CustomForm.propTypes = {
  controlId: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  elementType: PropTypes.string,
  option: PropTypes.node,
  labelClassName: PropTypes.string,
  formGroupClassName: PropTypes.string,
  showMore: PropTypes.bool,
  minDate: PropTypes.node,
  plaintext: PropTypes.bool,
  lg: PropTypes.string,
  md: PropTypes.string,
  sm: PropTypes.string,
  xs: PropTypes.string
};

export default CustomForm;
