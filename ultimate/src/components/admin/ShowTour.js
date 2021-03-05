import React from "react";
import { Redirect } from "react-router-dom";
import { getNames } from "country-list";
import {
  Form,
  OverlayTrigger,
  Tooltip,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import { Picky } from "react-picky";
import TourAvailabilityQuery from "./TourAvailabilityQuery";
import TourQuery from "./TourQuery";

class ShowTour extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCountries: [],
      selectedPlaces: [],
      city: "",
      checkAvailability: false,
      redirect: null,
    };
  }

  removeCountry = (country) => {
    this.setState((prevState) => {
      let newCountriesList = prevState.countries.filter(
        (item) => country !== item
      );
      return {
        countries: newCountriesList,
      };
    });
  };

  onSelect = (values) => {
    this.setState((prevState) => {
      return {
        selectedCountries: values,
        selectedPlaces: prevState.selectedPlaces.concat(values),
        checkAvailability: false,
      };
    });
  };

  checkAvailability = async () => {
    let { selectedCountries, city } = this.state;
    // If countries have been selected set chekAvailability to true
    if (selectedCountries.length || city.length) {
      await this.setState((prevState) => {
        //　The city will come from the user as a string that is a comma seperated city names
        // Remove any white space in the string and split by the commas to get an array of cities
        let placesList = [];
        if (city) placesList = city.replace(/ /g, "").split(",");

        // Add selected tour to tour list
        let joinedData = prevState.selectedPlaces.concat(placesList);

        // Remove duplicates
        let uniqueJoinedData = Array.from(new Set(joinedData));
        let citiesUrl = "/";
        uniqueJoinedData.forEach((city) => (citiesUrl += `${city}/`));
        return {
          selectedPlaces: uniqueJoinedData,
          redirect: this.props.match.url + citiesUrl,
        };
      });

      this.setState({ checkAvailability: true });
    }
  };

  handleCityChange = (evt) => {
    let value = evt.target.value;
    this.setState({ city: value, checkAvailability: false });
  };

  render() {
    let { selectedCountries, checkAvailability, city, redirect } = this.state;

    return (
      <React.Fragment>
        <h2 className="mt-3 mb-3">View and change the tour countries </h2>
        <Col className="mb-4">
          <TourQuery removeCountry={this.removeCountry} />
        </Col>

        <Col className="mb-4">
          <Form
            style={{
              width: "fit-content",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "left",
            }}
          >
            <Row className="mb-4">
              <Col sm={12} md={6}>
                <Picky
                  id="picky"
                  options={getNames()}
                  value={selectedCountries}
                  multiple={true}
                  includeSelectAll={false}
                  includeFilter={true}
                  dropdownHeight={400}
                  onChange={this.onSelect}
                  placeholder="Choose Countries"
                  manySelectedPlaceholder="%s coutries selected"
                  clearFilterOnClose={true}
                  defaultFocusFilter={true}
                  filterPlaceholder="Type name"
                />
              </Col>
              <Col sm={12} md={1}>
                <span className="d-flex justify-content-center mt-2 mb-2">
                  OR
                </span>
              </Col>
              <Col sm={12} md={5}>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip>
                      For more than one place seperate places names by comma e.g
                      London, Safari
                    </Tooltip>
                  }
                >
                  <Form.Control
                    placeholder="Enter city or place"
                    size="sm"
                    value={city}
                    onChange={this.handleCityChange}
                  />
                </OverlayTrigger>
              </Col>
            </Row>
            <Button
              onClick={this.checkAvailability}
              disabled={checkAvailability}
            >
              Check availability
            </Button>
          </Form>
        </Col>
        {redirect && <Redirect push to={redirect} />}
        {this.props.match.params.city1 && checkAvailability && (
          <TourAvailabilityQuery placesUrl={this.props.match.params} />
        )}
      </React.Fragment>
    );
  }
}

export default ShowTour;
