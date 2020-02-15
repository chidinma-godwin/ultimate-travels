import React from "react";
import { Form, Table, Col, Row, Button } from "react-bootstrap";

function PassengersCabinPopover(props) {
  let {
    increment,
    decrement,
    handleChange,
    cabin,
    adults,
    children,
    infants,
    show,
    numAdults,
    numChildren,
    age
  } = props;
  let childAge = [];
  for (let i = 0; i < 18; i++) {
    childAge.push(i);
  }

  let ageForm = [];
  for (let i = 0; i < age; i++) {
    ageForm.push(
      <Form.Group key={i} as={Col} sm="6">
        <Form.Control as="select" size="sm">
          {childAge.map(age => (
            <>
              <option>{age}</option>
            </>
          ))}
        </Form.Control>
      </Form.Group>
    );
  }
  return (
    <React.Fragment>
      {show ? (
        <Row className="mb-2">
          <Col>
            <Form.Group controlId="cabin"></Form.Group>
            <Form.Label id="cabin" className="mr-1">
              Cabin class:
            </Form.Label>
            <Form.Control
              id="cabin"
              size="sm"
              as="select"
              onChange={handleChange}
              value={cabin}
            >
              <option>--Choose a cabin class--</option>
              <option>ECONOMY</option>
              <option>Premium Economy</option>
              <option>BUSINESS</option>
              <option>First Class</option>
            </Form.Control>
          </Col>
        </Row>
      ) : (
        ""
      )}
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
                <td
                  className="adults custom-btn"
                  onClick={adults < numAdults ? increment : null}
                >
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
                <td
                  className="children custom-btn"
                  onClick={children < numChildren ? increment : null}
                >
                  +
                </td>
              </tr>
            </tbody>
          </Table>
        </Form.Group>
      </Row>
      {show ? (
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
      ) : (
        ""
      )}

      <Form.Row>{ageForm}</Form.Row>
      <Button onClick={() => document.body.click()}>Done</Button>
    </React.Fragment>
  );
}

export default PassengersCabinPopover;