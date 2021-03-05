import React from "react";
import { Card, Row, Col, Form, Button, Alert } from "react-bootstrap";
// import { Picky } from "react-picky";
import { Mutation } from "react-apollo";
import { saveTourToDatabase, getToursFromDatabase } from "../../queries";
import { Redirect } from "react-router-dom";

class TourDetailsResult extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTourDetails: [],
      saved: false,
      errorText: null,
      redirect: null,
    };
  }

  onChange = (evt) => {
    const { name, checked } = evt.target;
    this.setState((prevState) => {
      // Add selected tour to tour list
      let joinedData = prevState.selectedTourDetails.concat(name);

      // Remove duplicates
      let uniqueJoinedData = Array.from(new Set(joinedData));
      return {
        selectedTourDetails: checked
          ? uniqueJoinedData
          : prevState.selectedTourDetails,
      };
    });
  };

  handleAddTour = async (saveTour, data) => {
    const { selectedTourDetails } = this.state;
    const newData = this.props.allData;
    const selectedTours = newData
      .map((tour) => {
        // Return the price in USD only, and also keep only the currency and amount info
        const advertised_departures = tour.TourDetails.advertised_departures;
        const formattedTour = advertised_departures.filter(
          (departure) => departure.currency === "USD"
        );
        tour.TourDetails.advertised_departures = formattedTour;

        // Get only the tour overview link
        tour.TourDetails.site_links = tour.TourDetails.site_links.filter(
          (link) => link.type === "OVERVIEW"
        );

        // Get banner type image only;
        tour.TourDetails.images = tour.TourDetails.images.filter(
          (image) => image.type === "BANNER"
        );

        // Get the first five details of the tour
        tour.TourDetails.details = tour.TourDetails.details.slice(0, 4);
        return tour.TourDetails;
      })
      .filter((tour) => selectedTourDetails.includes(tour.id));
    try {
      data = await saveTour({
        variables: { input: selectedTours },
        update: (store, { data: { saveTour } }) => {
          const { ok } = saveTour;
          if (!ok) return;
          let data = store.readQuery({ query: getToursFromDatabase });
          data.getDatabaseTours.push(...selectedTours);
          store.writeQuery({ query: getToursFromDatabase, data });
        },
      });
      this.setState({ saved: true });
    } catch (err) {
      console.log(err);
    }

    if (!data.data.saveTour.ok) {
      this.setState({
        errorText: "Unable to save tour details. Please try again letter.",
      });
    }
  };

  closeSuccessAlert = () => {
    this.setState({ saved: false });
  };

  handleShowTours = () => {
    this.setState({ redirect: "/admin/show-tour" });
  };

  render() {
    const { allData } = this.props;

    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />;
    }
    return (
      <Mutation mutation={saveTourToDatabase}>
        {(saveTour, { loading, error, data }) => (
          <>
            <Card
              className="mt-2 mb-4"
              style={{
                width: "fit-content",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Card.Header className="d-none d-lg-block">
                <Row style={{ fontWeight: "bold" }}>
                  <Col lg={2}>Name</Col>
                  <Col lg={4}>Description</Col>
                  <Col lg={1}>Price</Col>
                  <Col lg={1}>Country</Col>
                  <Col lg={1}>Visited Countries</Col>
                  <Col lg={1}>Include</Col>
                  <Col lg={2}>Link</Col>
                </Row>
              </Card.Header>
              <Card.Body className="p-3">
                {allData.map((tour) => {
                  let tourDetails = tour.TourDetails;
                  let selectedCurrency = {};
                  let price = "";
                  if (tourDetails.advertised_departures) {
                    if (tourDetails.advertised_departures.length) {
                      selectedCurrency = tourDetails.advertised_departures.filter(
                        (item) => item.currency === "USD"
                      );

                      price = new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: selectedCurrency[0].currency,
                      }).format(Number(selectedCurrency[0].amount).toFixed(2));
                    }
                  }

                  const visitedCountries = tourDetails.geography.visited_countries.map(
                    (country) => country.name
                  );

                  const tourOverviewLink = tourDetails.site_links.filter(
                    (link) => link.type === "OVERVIEW"
                  );

                  return (
                    <React.Fragment key={tourDetails.id}>
                      <Row>
                        <Col lg={2} className="text-left">
                          <Row>
                            <Col sm="2" className="d-lg-none font-weight-bold">
                              Name:
                            </Col>
                            <Col>{tourDetails.name} </Col>
                          </Row>
                        </Col>

                        <Col lg={4} className="text-left">
                          <Row>
                            <Col sm="2" className="d-lg-none font-weight-bold">
                              Description:
                            </Col>
                            <Col> {tourDetails.description}</Col>
                          </Row>
                        </Col>

                        <Col lg={1} className="text-left">
                          <Row>
                            <Col sm="2" className="d-lg-none font-weight-bold">
                              Price:
                            </Col>
                            <Col> {price ? price : "No price available"}</Col>
                          </Row>
                        </Col>

                        <Col lg={1} className="text-left">
                          <span className="d-lg-none">Country</span>
                          {tourDetails.geography.primary_country.name}
                        </Col>
                        <Col lg={1} className="text-left">
                          <span className="d-lg-none">Visited Countries</span>
                          {visitedCountries.join(", ")}
                        </Col>
                        <Col lg={1} className="text-left">
                          <span className="d-lg-none">Include</span>
                          <Form.Check
                            type="checkbox"
                            name={tourDetails.id}
                            onChange={this.onChange}
                          />
                        </Col>
                        <Col lg={2} className="text-left">
                          <span className="d-lg-none">Link</span>
                          <a
                            style={{ textDecoration: "none" }}
                            href={tourOverviewLink[0].href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {tourOverviewLink[0].href}
                          </a>
                        </Col>
                      </Row>
                      <hr />
                    </React.Fragment>
                  );
                })}
              </Card.Body>
            </Card>

            <Button
              className="mb-5"
              onClick={() => this.handleAddTour(saveTour, data)}
              disabled={loading}
            >
              {loading ? "saving" : "Add to database"}
            </Button>
            {this.state.saved ? (
              <Alert
                dismissible
                variant="success"
                onClose={this.closeSuccessAlert}
              >
                <p>
                  {this.state.errorText
                    ? this.state.errorText
                    : "Tour details successfully saved to database"}
                </p>
                <Button onClick={this.handleShowTours}>See saved tours</Button>
              </Alert>
            ) : null}
          </>
        )}
      </Mutation>
    );
  }
}

export default TourDetailsResult;
