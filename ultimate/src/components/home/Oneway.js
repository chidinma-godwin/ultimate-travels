import React from "react";
import {
  InputGroup,
  FormControl,
  Form,
  Row,
  Col,
  Popover,
  Button,
  ButtonToolbar,
  OverlayTrigger,
  Table
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



class OneWay extends React.Component {

  handleSubmit=(evt)=> {
    evt.preventDefault();
    console.log("Submit this form");
  }
  
render() {
  const popover = (
    <Popover style={{ width: "30%", padding: "1em" }}>
      <Row className="mb-2">
        <Col xs={12} sm={6}>
          Adults <div>(11+ yrs)</div>
        </Col>
        <Col xs={12} sm={6}>
          <Table bordered>
            <tr>
              <td className="custom-btn">-</td>
              <td>0</td>
              <td className="custom-btn">+</td>
            </tr>
          </Table>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col xs={12} sm={6}>
          Children <div>(2-11 yrs)</div>
        </Col>
        <Col xs={12} sm={6}>
          <Table bordered>
            <tr>
              <td className="custom-btn">-</td>
              <td>0</td>
              <td className="custom-btn">+</td>
            </tr>
          </Table>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col xs={12} sm={6}>
          Infants <div>(below 2 yrs)</div>
        </Col>
        <Col xs={12} sm={6}>
          <Table bordered>
            <tbody>
            <tr>
              <td className="custom-btn">-</td>
              <td>0</td>
              <td className="custom-btn">+</td>
            </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Popover>
  );
  

  return (
    <Form onSubmit={this.handleSubmit}>
      <Row>
        <Col sm={12} md={6}>
          <label htmlFor="from">Flying from: </label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <FontAwesomeIcon
                  icon={["fas", "plane-departure"]}
                  style={{ size: "lg" }}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="from"
              placeholder="Enter city name or airport"
              aria-label="city or airport"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Col>

        <Col sm={12} md={6}>
          <label htmlFor="destination">Flying to: </label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="addon2">
                <FontAwesomeIcon
                  icon={["fas", "plane-arrival"]}
                  style={{ size: "lg" }}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="destination"
              placeholder="Enter city name or airport"
              aria-label="city or airpot"
              aria-describedby="addon2"
            />
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col sm={12} md={6}>
          <label htmlFor="date">Departure date: </label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="addon3">
                <FontAwesomeIcon
                  icon={["fas", "calendar-alt"]}
                  style={{ size: "lg" }}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <DatePicker id="date" selected={Date.now()} />
          </InputGroup>
        </Col>

        <Col sm={12} md={6}>
          <label htmlFor="cabin-type">Cabin class: </label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="addon4">
                <FontAwesomeIcon
                  icon={["fas", "chair"]}
                  style={{ size: "lg" }}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="cabin-type" as="select">
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </FormControl>
          </InputGroup>
        </Col>
      </Row>

      <label htmlFor="num-passengers">No. of Passengers</label>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="addon4">
            <FontAwesomeIcon icon={["fas", "users"]} style={{ size: "lg" }} />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <ButtonToolbar>
          <OverlayTrigger
            trigger="click"
            rootClose
            overlay={popover}
            placement="top"
          >
            <FormControl
              id="num-passengers"
              value="1 Adult, 0 Child, 0 infant"
              readOnly
            />
          </OverlayTrigger>
        </ButtonToolbar>
      </InputGroup>

      <Button variant="primary">Search flight</Button>
    </Form>
  )
}
}

export default OneWay;
