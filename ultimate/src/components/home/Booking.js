import React from "react";
import Oneway from "./Oneway";
import { Tabs, Tab, Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Booking extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Card style={{border:"solid 2px blue"}}>
          <Card.Header>
            <Tabs variant="tabs" defaultActiveKey="flights">
              <Tab
                title={
                  <div>
                    <FontAwesomeIcon
                      icon={["fas", "plane-departure"]}
                      className="mr-2"
                      style={{ color: "blue" }}
                      size="lg"
                    />
                    <span>Flights</span>
                  </div>
                }
                eventKey="flights"
              ></Tab>

              <Tab
                title={
                  <div>
                    <FontAwesomeIcon
                      icon={["fas", "bed"]}
                      className="mr-2"
                      style={{ color: "blue" }}
                      size="lg"
                    />
                    <span>Hotels</span>
                  </div>
                }
                eventKey="hotel"
              ></Tab>

              <Tab
                title={
                  <div>
                    <FontAwesomeIcon
                      icon={["fas", "car"]}
                      className="mr-2"
                      style={{ color: "blue" }}
                      size="lg"
                    />
                    <span>Car</span>
                  </div>
                }
                eventKey="car"
              ></Tab>
            </Tabs>
            {/* <Nav.Item className="d-none d-lg-block">
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
            </Nav> */}
          </Card.Header>
          <Card.Body>
              <Tabs defaultActiveKey="oneway" variant="pills">
                <Tab title="One way" eventKey="oneway">
                  <br />
                  <Container>
                    <Oneway />
                    </Container>
                </Tab>

                <Tab title="Round Trip" eventKey="roundtrip">
                  <br />
                  <Container>
                  This is for Round trip
                  </Container>
                </Tab>

                <Tab title="Multiple Destinations" eventKey="multiple">
                  <br />
                  <Container>
                  This is for multiple destinations
                  </Container>
                </Tab>
              </Tabs>

          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

export default Booking;
