import React from "react";
import { Table, Form, Button, Alert } from "react-bootstrap";
import { Picky } from "react-picky";
import { Mutation } from "react-apollo";
import {
  saveTourToDatabase,
  getToursFromDatabase
} from "../../queries/queries";
import { Redirect } from "react-router-dom";

class TourDetailsResult extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedTourDetails: [],
      saved: false,
      errorText: null,
      redirect: null
    };
  }

  onChange = evt => {
    const { name, checked } = evt.target;
    console.log(checked, name);
    this.setState(prevState => {
      // Add selected tour to tour list
      let joinedData = prevState.selectedTourDetails.concat(name);

      // Remove duplicates
      let uniqueJoinedData = Array.from(new Set(joinedData));
      return {
        selectedTourDetails: checked
          ? uniqueJoinedData
          : prevState.selectedTourDetails
      };
    });
  };

  handleAddTour = async (saveTour, data) => {
    const { selectedTourDetails } = this.state;
    const newData = this.props.allData;
    const selectedTours = newData
      .map(tour => {
        // Return the price in USD only, and also keep only the currency and amount info
        const advertised_departures = tour.TourDetails.advertised_departures;
        const formattedTour = advertised_departures.filter(
          departure => departure.currency === "USD"
        );
        tour.TourDetails.advertised_departures = formattedTour;

        console.log(advertised_departures);
        console.log(formattedTour);

        // Get only the tour overview link
        tour.TourDetails.site_links = tour.TourDetails.site_links.filter(
          link => link.type === "OVERVIEW"
        );

        // Get banner type image only;
        tour.TourDetails.images = tour.TourDetails.images.filter(
          image => image.type === "BANNER"
        );

        // Get the first five details of the tour
        tour.TourDetails.details = tour.TourDetails.details.slice(0, 4);
        return tour.TourDetails;
      })
      .filter(tour => selectedTourDetails.includes(tour.id));
    console.log(selectedTours);
    try {
      data = await saveTour({
        variables: { input: selectedTours },
        update: (store, { data: { saveTour } }) => {
          const { ok } = saveTour;
          console.log(ok);
          if (!ok) return;
          let data = store.readQuery({ query: getToursFromDatabase });
          data.getDatabaseTours.push(...selectedTours);
          console.log(data);
          store.writeQuery({ query: getToursFromDatabase, data });
        }
      });
      this.setState({ saved: true });
    } catch (err) {
      console.log(err);
    }
    console.log(data);

    if (!data.data.saveTour.ok) {
      this.setState({
        errorText: "Unable to save tour details. Please try again letter."
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
    console.log(allData);

    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />;
    }
    return (
      <Mutation mutation={saveTourToDatabase}>
        {(saveTour, { loading, error, data }) => (
          <>
            <Table
              bordered
              striped
              className="text-left"
              style={{ fontSize: 14 }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Country</th>
                  <th>Visited Countries</th>
                  <th>Include</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {allData.map(tour => {
                  let tourDetails = tour.TourDetails;
                  let selectedCurrency = {};
                  let price = "";
                  if (tourDetails.advertised_departures) {
                    if (tourDetails.advertised_departures.length) {
                      selectedCurrency = tourDetails.advertised_departures.filter(
                        item => item.currency === "USD"
                      );

                      price = new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: selectedCurrency[0].currency
                      }).format(Number(selectedCurrency[0].amount).toFixed(2));
                    }
                  }

                  const visitedCountries = tourDetails.geography.visited_countries.map(
                    country => country.name
                  );

                  const tourOverviewLink = tourDetails.site_links.filter(
                    link => link.type === "OVERVIEW"
                  );

                  console.log(tourOverviewLink);
                  return (
                    <tr key={tourDetails.id}>
                      <td>{tourDetails.name}</td>
                      <td>{tourDetails.description}</td>
                      <td>{price ? price : "No price available"}</td>
                      <td>{tourDetails.geography.primary_country.name}</td>
                      <td>{visitedCountries.join(", ")}</td>
                      <td>
                        <Form.Check
                          type="checkbox"
                          name={tourDetails.id}
                          onChange={this.onChange}
                        />
                      </td>
                      <td>
                        <a
                          style={{ textDecoration: "none" }}
                          href={tourOverviewLink[0].href}
                          target="_blank"
                        >
                          {tourOverviewLink[0].href}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
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
