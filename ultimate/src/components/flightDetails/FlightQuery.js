import React from "react";
import { Container, Row, Col, ProgressBar, Button } from "react-bootstrap";
import { Query } from "react-apollo";
import { getFlightDetails } from "../../queries/queries";
import FilterResults from "./FilterResults";
import FlightResultList from "./FlightResultList";
import SortResult from "./SortResult";
import FlightResultHeading from "./FlightResultHeading";

let neededData = [];

class FlightQuery extends React.Component {
  constructor(props) {
    super(props);
    this.flightDetailsArray = [];
    this.priceList = [];
    this.durationList = [];
    let { userInfo } = this.props.location.state;
    this.state = {
      userInfo,
      flightData: [],
      // showAllResultBtn: false,
      filter: false
    };
  }

  // Function to put all flight prices in an array
  getPrices = data => {
    let priceArray = [];
    data.map(flight => priceArray.push(flight.price.total * 1));
    return priceArray;
  };

  // Function to put average duration of outbound and inbound flight in an array
  getDuration = data => {
    let durationArray = [];
    data.map(flight => {
      // map through the itineraries to get the duration in two decimal places
      let time = flight.itineraries.map(itinerary => {
        let timeArray = itinerary.duration.slice(2, -1).split("H");
        // If there is no minute set the minute to 0
        if (timeArray.length === 1) timeArray.push(0);

        // convert the time to numbers then to minutes
        let mins = timeArray[0] * 60 + timeArray[1] * 1;
        return mins;
      });

      // Declare a variable for the price of each returned flight
      let price = flight.price.total * 1;

      // get the average duration from each flight
      let sumDuration = time.reduce((total, each) => total + each, 0);
      let averageDuration = sumDuration / time.length;

      // add the average duration to the flight data array
      flight.averageDuration = averageDuration;

      // add the average duration to the flightdetails array
      this.flightDetailsArray.push([price, averageDuration]);

      // return an array containing the average durations
      return durationArray.push(averageDuration);
    });
    return durationArray;
  };

  displayTime = number => {
    let hour = Math.floor(number / 60);
    let min = number % 60;
    let calcTime;
    if (min < 10) {
      calcTime = `${hour}h 0${min}m`;
    } else {
      calcTime = `${hour}h ${min}m`;
    }
    return calcTime;
  };

  handleSortCheapest = () => {
    let compareFunction = (a, b) => {
      let firstPrice = a.price.total * 1;
      let secondPrice = b.price.total * 1;
      return firstPrice < secondPrice ? -1 : firstPrice > secondPrice ? 1 : 0;
    };
    this.setState(prevState => {
      let sortedArray = prevState.flightData.sort(compareFunction);
      return {
        flightData: sortedArray
      };
    });
  };

  handleSortFastest = () => {
    let compareFunction = (a, b) => {
      let firstDuration = a.averageDuration;
      let secondDuration = b.averageDuration;
      return firstDuration < secondDuration
        ? -1
        : firstDuration > secondDuration
        ? 1
        : 0;
    };
    //array.sort(compareFunction);
    this.setState(prevState => {
      let sortedArray = prevState.flightData.sort(compareFunction);
      return {
        flightData: sortedArray
      };
    });
  };

  handleShowAll = (array, show) => {
    this.setState({
      flightData: array,
      showAllResultBtn: show,
      filter: false
    });
  };

  handleCheapestCardClick = () => {
    this.setState(prevState => {
      const flightData = prevState.flightData.filter(
        flight => flight.price.total <= Math.min(...this.priceList)
      );
      return {
        flightData
      };
    });
    console.log(this.state.flightData);
  };

  handleFastestCardClick = () => {
    this.setState(prevState => {
      const flightData = prevState.flightData.filter(
        flight => flight.averageDuration <= Math.min(...this.durationList)
      );
      console.log(flightData);
      return (
        {
          flightData
        },
        () => console.log(this.state.flightData)
      );
    });
  };

  onChangePrice = (render, handle, value, un, percent) => {
    let array = neededData.filter(
      flight =>
        (flight.price.total >= value[0]) &
        (flight.price.total <= Math.round(value[1]))
    );
    console.log(array);
    this.setState({
      flightData: array,
      showAllResultBtn: true
    });
  };

  handleQueryCompleted = data => {
    if (this.state.flightData.length === 0) {
      this.state.flightData = data.flightDetails.data;
    }
  };

  render() {
    let info = this.state.userInfo;
    return (
      <Query
        query={getFlightDetails}
        variables={{
          originLocationCode: info.originLocationCode,
          destinationLocationCode: info.destinationLocationCode,
          departureDate: info.departureDate,
          returnDate: info.returnDate,
          adults: info.adults,
          children: info.children,
          infants: info.infants,
          travelClass: info.travelClass,
          currencyCode: "USD"
        }}
      >
        {({ error, loading, data }) => {
          if (loading) return <ProgressBar now={25} />;
          if (error) {
            console.log(error);
            return "Please fill the flight form";
          }

          console.log(data);
          this.handleQueryCompleted(data);

          this.priceList = this.getPrices(this.state.flightData);
          this.durationList = this.getDuration(this.state.flightData);

          return (
            <Container
              fluid
              style={{
                marginTop: "2em",
                padding: "5em",
                paddingTop: "0"
              }}
            >
              {/* Component showing result heading */}
              <FlightResultHeading userInfo={this.state.userInfo} />

              <Row>
                <Col lg={3}>
                  {/* Component for filter options */}
                  <FilterResults
                    flightData={this.state.flightData}
                    flightDetails={data.flightDetails}
                    priceList={this.priceList}
                    durationList={this.durationList}
                    onChangePrice={this.onChangePrice}
                  />
                </Col>

                <Col lg={9}>
                  {/* Component displaying sort options */}
                  <SortResult
                    handleSortCheapest={this.handleSortCheapest}
                    handleSortFastest={this.handleSortFastest}
                    displayTime={this.displayTime}
                    flightDetailsArray={this.flightDetailsArray}
                    durationList={this.durationList}
                    priceList={this.priceList}
                    handleCheapestCardClick={this.handleCheapestCardClick}
                    handleFastestCardClick={this.handleFastestCardClick}
                  />

                  {/* Show a button to display all result only if the data has been filtered or sorted */}
                  {this.state.showAllResultBtn ? (
                    <div className="ml-md-auto">
                      <Button
                        onClick={() =>
                          this.handleShowAll(
                            this.state.data.flightDetails.data,
                            false
                          )
                        }
                      >
                        Show Cheapest Result
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* Component displaying flight results */}
                  <FlightResultList flightData={this.state.flightData} />
                </Col>
              </Row>
            </Container>
          );
        }}
      </Query>
    );
  }
}

export default FlightQuery;
