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
    c_age,
    infants,
    show,
    numAdults,
    numChildren,
    age,
  } = props;

  // Put children ages option in an array
  let childrenAge = [];
  for (let i = 0; i < 18; i++) {
    childrenAge.push(i);
  }

  // Put form groups for selecting children ages in an array
  let ageForm = [];
  for (let i = 0; i < age; i++) {
    ageForm.push(
      <Form.Group key={i} as={Col} sm="6">
        <Form.Control
          as="select"
          name="c_age"
          id="c_age"
          defaultValue={c_age}
          size="sm"
        >
          {childrenAge.map((age, i) => (
            <option key={i}>{age}</option>
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
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
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

      {!!ageForm.length && <p>Select age of each child</p>}
      <Form.Row>{ageForm}</Form.Row>
      <Button onClick={() => document.body.click()}>Done</Button>
    </React.Fragment>
  );
}

export default PassengersCabinPopover;
