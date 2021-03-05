import React from "react";
import { Image, Card, Tabs, Tab, Container } from "react-bootstrap";

class TourDetails extends React.Component {
  render() {
    const { tour } = this.props.location.state;
    return (
      <React.Fragment>
        <Image
          className="d-block w-100"
          src={tour.images[0].image_href}
          style={{ maxHeight: "400px" }}
        />
        <Container fluid="md">
          <h2 className="mt-5">{tour.name}</h2>
          <div>{tour.description}</div>
          <Card className="mt-5 p-3">
            <Tabs
              className="booking-tabs"
              defaultActiveKey={tour.details[0].id}
              variant="tabs"
              id="tour-details"
            >
              {tour.details.map((detail) => {
                const included = detail.body.split(":");
                return (
                  <Tab
                    key={detail.detail_type.id}
                    eventKey={detail.detail_type.id}
                    title={detail.detail_type.label}
                  >
                    <div className="mt-5">
                      {detail.detail_type.label === "What's Included" ? (
                        <ul>
                          {included.map((item, i) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        detail.body
                      )}
                    </div>
                  </Tab>
                );
              })}
            </Tabs>
          </Card>
          <p className="mt-3">
            For bookings and reservations please call 08161128204 or email
            tours@ultimatetravels.com
          </p>
        </Container>
      </React.Fragment>
    );
  }
}

export default TourDetails;
