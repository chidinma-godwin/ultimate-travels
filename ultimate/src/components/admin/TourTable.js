import React from "react";
import { Card, OverlayTrigger, Tooltip, Row, Col } from "react-bootstrap";
import { Mutation } from "react-apollo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeTourMutation, getToursFromDatabase } from "../../queries/tour";

export default class TourTable extends React.Component {
  removeTour = async (removeTour, id, data) => {
    try {
      data = await removeTour({
        variables: { id },
        update: (store, { data: { removeTour } }) => {
          if (!removeTour) return;

          let data = store.readQuery({ query: getToursFromDatabase });
          data = data.getDatabaseTours.filter(
            (tour) => Number(tour.id) !== Number(id)
          );
          let newData = {};
          newData.getDatabaseTours = data;

          store.writeQuery({ query: getToursFromDatabase, data: newData });
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <Mutation mutation={removeTourMutation}>
        {(removeTour, { data, loading, error }) => (
          <Card
            className="mt-2 mb-4"
            style={{
              width: "fit-content",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Card.Header>
              Tours currently displayed on the home page are:
            </Card.Header>
            <Card.Body className="p-3">
              {this.props.tours.map((tour) => (
                <React.Fragment key={tour.id}>
                  <Row>
                    <Col sm={3} className="text-left">
                      {tour.name.split(":")[0]}
                    </Col>
                    <Col sm={6} className="text-left">
                      <a
                        style={{ textDecoration: "none" }}
                        href={tour.site_links[0].href}
                      >
                        {tour.site_links[0].href}
                      </a>
                    </Col>
                    <Col sm={2} className="text-left">
                      {tour.advertised_departures.length
                        ? new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: tour.advertised_departures[0].currency,
                          }).format(
                            Math.round(
                              Number(tour.advertised_departures[0].amount)
                            )
                          )
                        : "No price available"}
                    </Col>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip>
                          Remove this country from tour destinations
                        </Tooltip>
                      }
                    >
                      <FontAwesomeIcon
                        icon={["fas", "times"]}
                        size="lg"
                        style={{ color: "rgb(168, 38, 38)" }}
                        onClick={() =>
                          this.removeTour(removeTour, tour.id, data)
                        }
                      />
                    </OverlayTrigger>
                  </Row>
                  <hr />
                </React.Fragment>
              ))}
            </Card.Body>
          </Card>
        )}
      </Mutation>
    );
  }
}
