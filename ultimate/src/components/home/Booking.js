import React from "react";
import {
  Card,
  Nav,
  Button,
  InputGroup,
  FormControl,
  Form,
  Row,
  Col,
  Popover,
  ButtonToolbar,
  OverlayTrigger
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const popover = <Popover style={{width:"30%", padding: "1em"}}>
  <Row　className="mb-2">
    <Col xs={12} sm={6}>Adults <div>(11+ yrs)</div></Col>
    <Col xs={12} sm={6}><span>-</span> <span>1</span> <span>+</span></Col>
  </Row>
  <Row className="mb-2">
    <Col xs={12} sm={6}>Children <div>(2-11 yrs)</div></Col>
    <Col xs={12} sm={6}><span>-</span> <span>1</span> <span>+</span></Col>
  </Row>
  <Row className="mb-2">
    <Col xs={12} sm={6}>Infants <div>(below 2 yrs)</div></Col>
    <Col xs={12} sm={6}><span>-</span> <span>1</span> <span>+</span></Col>
  </Row>
</Popover>;

class Booking extends React.Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link href="#first">
                <FontAwesomeIcon
                  icon={["fas", "plane-departure"]}
                  className="mr-2"
                  style={{ color: "blue" }}
                  size="lg"
                />
                FLights
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link">
                <FontAwesomeIcon
                  icon={["fas", "bed"]}
                  className="mr-2"
                  style={{ color: "blue" }}
                  size="lg"
                />
                HOTELS
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#">
                <FontAwesomeIcon
                  icon={["fas", "car"]}
                  className="mr-2"
                  style={{ color: "blue" }}
                  size="lg"
                />
                CAR
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="d-none d-lg-block">
              <Nav.Link href="#disabled" disabled>
                <FontAwesomeIcon
                  icon={["fas", "book-open"]}
                  className="mr-2"
                  //   style={{ color: "blue" }}
                  size="lg"
                />
                Check my trip
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          {/* <Card.Title>Special title treatment</Card.Title> */}

          <Card.Text>
            <Form>
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
                    <FontAwesomeIcon
                      icon={["fas", "users"]}
                      style={{ size: "lg" }}
                    />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <ButtonToolbar>
                  <OverlayTrigger
                    trigger="click"
                    rootClose
                    overlay={popover}
                    placement="top"
                  >
                    <input id="num-passengers" value="1 Adult, 0 Child, 0 infant" />
                  </OverlayTrigger>
                </ButtonToolbar>
              </InputGroup>
            </Form>
          </Card.Text>
          <Button variant="primary">Search flight</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Booking;
