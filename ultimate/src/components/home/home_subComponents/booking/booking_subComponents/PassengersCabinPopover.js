import React from "react";
import { FormControl, Form, Table, Col, Row, Button } from "react-bootstrap";

function PassengersCabinPopover(props) {
  let {
    increment,
    decrement,
    handleChange,
    cabin,
    adults,
    children,
    infants
  } = props;
  return (
    <React.Fragment>
      <Row className="mb-2">
        <Col>
          <Form.Label controlId="cabin" className="mr-1">
            Cabin class:
          </Form.Label>
          <FormControl
            id="cabin"
            className="form-control-sm"
            as="select"
            onChange={handleChange}
            value={cabin}
          >
            <option>--Choose a cabin class--</option>
            <option>ECONOMY</option>
            <option>Premium Economy</option>
            <option>BUSINESS</option>
            <option>First Class</option>
          </FormControl>
        </Col>
      </Row>
      <Row className="mb-2">
        <Form.Group as={Col} xs={12} sm={6}>
          Adults <div>(11+ yrs)</div>
        </Form.Group>
        <Form.Group as={Col} xs={12} sm={6}>
          <Table bordered>
            <tbody>
              <tr>
                <td className="adults custom-btn" onClick={decrement}>
                  -
                </td>
                <td>{adults}</td>
                <td className="adults custom-btn" onClick={increment}>
                  +
                </td>
              </tr>
            </tbody>
          </Table>
        </Form.Group>
      </Row>
      <Row className="mb-2">
        <Form.Group as={Col} xs={12} sm={6}>
          Children <div>(2-11 yrs)</div>
        </Form.Group>
        <Form.Group as={Col} xs={12} sm={6}>
          <Table bordered>
            <tbody>
              <tr>
                <td className="children custom-btn" onClick={decrement}>
                  -
                </td>
                <td>{children}</td>
                <td className="children custom-btn" onClick={increment}>
                  +
                </td>
              </tr>
            </tbody>
          </Table>
        </Form.Group>
      </Row>
      <Row className="mb-2">
        <Form.Group as={Col} xs={12} sm={6}>
          Infants <div>(below 2 yrs)</div>
        </Form.Group>
        <Form.Group as={Col} xs={12} sm={6}>
          <Table bordered>
            <tbody>
              <tr>
                <td className="infants custom-btn" onClick={decrement}>
                  -
                </td>
                <td>{infants}</td>
                <td className="infants custom-btn" onClick={increment}>
                  +
                </td>
              </tr>
            </tbody>
          </Table>
        </Form.Group>
      </Row>
      <Button onClick={() => document.body.click()}>Done</Button>
    </React.Fragment>
  );
}

export default PassengersCabinPopover;
