import React from "react";
import Oneway from "./Oneway";
import { Card, Nav, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Booking extends React.Component {
  render() {
    return (
      <React.Fragment>
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

            <Card.Text>
              <Oneway />
            </Card.Text>
            
            <Button variant="primary">Search flight</Button>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

export default Booking;
