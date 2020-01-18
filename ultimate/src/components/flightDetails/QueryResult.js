import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FilterResults from "./FilterResults";
import FlightResultList from "./FlightResultList";
import SortResult from "./SortResult";
import FlightResultHeading from "./FlightResultHeading";

class QueryResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryData: this.props.data.flightDetails,
      flightData: this.props.data.flightDetails.data,
      userInfo: this.props.userInfo,
      showAllResultBtn: false,
      checkedStops: new Map(),
      checkedAirlines: new Map()
    };
    this.priceList = this.getPrices(this.props.data.flightDetails.data);
    this.durationList = this.getDuration(this.props.data.flightDetails.data);
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
        itinerary.durationMins = mins;
        return mins;
      });

      // Declare a variable for the price of each returned flight
      let price = flight.price.total * 1;

      // get the average duration from each flight
      let sumDuration = time.reduce((total, each) => total + each, 0);
      let averageDuration = sumDuration / time.length;

      // add the average duration to the flight data array
      flight.averageDuration = averageDuration;

      // return an array containing the average durations and its corresponding price
      //return durationArray.push(averageDuration);
      return durationArray.push([price, averageDuration]);
    });
    return durationArray;
  };

  handleSortCheapest = () => {
    this.handleShowAll();
    let compareFunction = (a, b) => {
      let firstPrice = a.price.total * 1;
      let secondPrice = b.price.total * 1;
      return firstPrice < secondPrice ? -1 : firstPrice > secondPrice ? 1 : 0;
    };
    this.setState(prevState => {
      let sortedArray = prevState.flightData.sort(compareFunction);
      console.log(sortedArray);
      return {
        flightData: sortedArray
      };
    });
  };

  handleSortFastest = () => {
    this.handleShowAll();
    let compareFunction = (a, b) => {
      let firstDuration = a.averageDuration;
      let secondDuration = b.averageDuration;
      return firstDuration < secondDuration
        ? -1
        : firstDuration > secondDuration
        ? 1
        : 0;
    };
    this.setState(prevState => {
      let sortedArray = prevState.flightData.sort(compareFunction);
      console.log(sortedArray);
      return {
        flightData: sortedArray
      };
    });
  };

  handleShowAll = () => {
    this.setState({
      flightData: this.props.data.flightDetails.data,
      showAllResultBtn: false
    });
  };

  handleCheapestCardClick = () => {
    this.handleShowAll();
    this.setState(prevState => {
      const flightData = prevState.flightData.filter(
        flight => flight.price.total <= Math.min(...this.priceList)
      );
      return {
        flightData,
        showAllResultBtn: true
      };
    });
  };

  handleFastestCardClick = () => {
    this.handleShowAll();
    this.setState(prevState => {
      const flightData = prevState.flightData.filter(
        flight =>
          flight.averageDuration <=
          Math.min(...this.durationList.map(item => item[1]))
      );
      console.log(flightData);
      return {
        flightData,
        showAllResultBtn: true
      };
    });
  };

  onChangePrice = (render, handle, value, un, percent) => {
    let queryData = this.props.data.flightDetails.data;
    let array = queryData.filter(
      flight =>
        (flight.price.total >= value[0]) &
        (flight.price.total <= Math.round(value[1]))
    );
    this.setState({
      flightData: array,
      showAllResultBtn: true
    });
  };

  onChangeDuration = (render, handle, value, un, percent) => {
    console.log(value);
    let queryData = this.props.data.flightDetails.data;
    let array = queryData.filter(flight => flight.averageDuration <= value[0]);
    this.setState({
      flightData: array,
      showAllResultBtn: true
    });
  };

  onChangeDepartureTime = (render, handle, value, un, percent) => {
    let queryData = this.props.data.flightDetails.data;
    this.getPrices(queryData);
    let array = queryData.filter(
      flight => flight.itineraries[0].durationMins <= value[1]
    );
    this.setState({
      flightData: array,
      showAllResultBtn: true
    });
  };

  onChangeArrivalTime = (render, handle, value, un, percent) => {
    let queryData = this.props.data.flightDetails.data;
    this.getPrices(queryData);
    let array = queryData.filter(
      flight => flight.itineraries[1].durationMins <= value[1]
    );
    this.setState({
      flightData: array,
      showAllResultBtn: true
    });
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

  onChangeStops = e => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const queryData = this.props.data.flightDetails.data;
    let mapValues = [];
    this.setState(prevState => {
      prevState.checkedStops.set(item, isChecked);
      for (let entry of this.state.checkedStops) {
        if (entry[1] === false) {
          mapValues.push(entry[0] * 1);
        }
      }
      console.log(mapValues);
      console.log(this.state.checkedStops);
      return {
        checkedStops: prevState.checkedStops
      };
    });

    this.setState(() => {
      // return an array of flights in which no itinerary contains segments with the given number of stops
      let array = queryData.filter(flight => {
        let stopList = [];
        flight.itineraries.map(itinerary => {
          // Set number of stops greater than 2 to 3 for simplicity ans push the nums to an array
          if (itinerary.segments.length > 2) itinerary.segments.length = 3;
          stopList.push(itinerary.segments.length);
        });
        console.log(stopList);
        console.log(mapValues);
        flight.numStops = stopList;

        let filterResult = flight.numStops.map(numStop =>
          mapValues.includes(numStop)
        );
        console.log(filterResult);
        return filterResult.every(item => item === false);
      });

      return {
        flightData: array,
        showAllResultBtn: true
      };
    });
  };
  //let stopsCount = data.reduce((total,itinerary)=> total + itinerary.segments.length, 0);

  onChangeAirline = e => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const queryData = this.props.data.flightDetails.data;
    let mapValues = [];
    this.setState(prevState => {
      prevState.checkedAirlines.set(item, isChecked);
      // Create alist of unchecked airlines
      for (let entry of this.state.checkedAirlines) {
        if (entry[1] === false) {
          mapValues.push(entry[0]);
        }
      }
      return {
        checkedAirlines: prevState.checkedAirlines
      };
    });

    this.setState(() => {
      // return an array of flights in which no itinerary contains segments with the given airline
      let array = queryData.filter(flight => {
        let airlineList = [];
        let uniqueAirlinesList = [];
        flight.itineraries.map(itinerary => {
          itinerary.segments.map(segment =>
            airlineList.push(segment.carrierCode)
          );
        });
        uniqueAirlinesList = [...new Set(airlineList)];
        flight.uniqueAirlinesList = uniqueAirlinesList;

        let filterResult = flight.uniqueAirlinesList.map(airline =>
          mapValues.includes(airline)
        );
        return filterResult.every(item => item === false);
      });

      return {
        flightData: array,
        showAllResultBtn: true
      };
    });
  };

  render() {
    let flightData = this.state.flightData;
    console.log(this.state.queryData);

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
              flightData={flightData}
              flightDetails={this.state.queryData}
              priceList={this.priceList}
              durationList={this.durationList}
              onChangePrice={this.onChangePrice}
              onChangeDuration={this.onChangeDuration}
              none={this.state.none}
              oneStop={this.state.oneStop}
              twoMoreStop={this.state.twoMoreStop}
              onChangeStops={this.onChangeStops}
              checkedStops={this.state.checkedStops}
              onChangeArrivalTime={this.onChangeArrivalTime}
              onChangeDepartureTime={this.onChangeDepartureTime}
              onChangeAirline={this.onChangeAirline}
              checkedAirlines={this.state.checkedAirlines}
            />
          </Col>

          <Col lg={9}>
            {/* Component displaying sort options */}
            <SortResult
              handleSortCheapest={this.handleSortCheapest}
              handleSortFastest={this.handleSortFastest}
              displayTime={this.displayTime}
              durationList={this.durationList}
              priceList={this.priceList}
              handleCheapestCardClick={this.handleCheapestCardClick}
              handleFastestCardClick={this.handleFastestCardClick}
            />

            {/* Show a button to display all result only if the data has been filtered or sorted */}
            {this.state.showAllResultBtn ? (
              <div className="ml-md-auto">
                <Button onClick={this.handleShowAll}>Show All Results</Button>
              </div>
            ) : (
              ""
            )}

            {/* Component displaying flight results */}
            <FlightResultList flightData={flightData} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default QueryResult;
