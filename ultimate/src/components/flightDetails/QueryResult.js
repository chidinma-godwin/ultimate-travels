import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FilterResults from "./FilterResults";
import FlightResultList from "./FlightResultList";
import SortResult from "./SortResult";
import FlightResultHeading from "./FlightResultHeading";
import { Map } from "immutable";

class QueryResult extends React.Component {
  constructor(props) {
    super(props);

    // Add computed number of stops to the flightData
    this.formattedData = this.props.allData
      .map(tripData => tripData.flightDetails.data)
      .map(trip =>
        trip.map(flight => {
          let stopList = [];
          flight.itineraries.map(itinerary => {
            // Set number of stops greater than 2 to 3 for simplicity and push the nums to an array
            if (itinerary.segments.length > 2) itinerary.segments.length = 3;
            stopList.push(itinerary.segments.length);
          });
          console.log(stopList);
          flight.numStops = stopList;
          return flight;
        })
      );
    this.state = {
      dictionaryData: this.props.allData.map(
        tripData => tripData.flightDetails.dictionaries.carriers
      ),
      // flightData: this.props.allData.flightDetails.data,
      flightData: this.formattedData,
      showAllResultBtn: false,
      checkedStops: new Map(),
      checkedAirlines: new Map()
    };
    this.priceList = this.getPrices(this.state.flightData);
    this.durationList = this.getDuration(this.state.flightData);
  }

  // Function to put all flight prices in an array
  getPrices = tripData => {
    console.log(tripData);
    let priceArray = [];
    tripData[0].map((trip, index) => {
      let total = trip.price.total * 1;
      for (let i = 1; i < tripData.length; i++) {
        total += tripData[i][index].price.total * 1;
      }
      priceArray.push(total);
    });
    // a.reduce((total, i) => total + i[1], 0);
    // tripData.map(trip =>
    //   trip.map(flight => priceArray.push(flight.price.total * 1))
    // );
    // allJoinedData.map(joinedData =>
    //   priceArray.push(
    //     joinedData.reduce((total, trip) => total + trip.price.total * 1)
    //   )
    // );
    return priceArray;
  };

  // Function to put average duration of outbound and inbound flight in an array
  getDuration = tripData => {
    let durationArray = [];
    tripData.map(trip =>
      trip.map(flight => {
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
        return averageDuration;
        // return durationArray.push([price, averageDuration]);
      })
    );
    let totalAvgDuration = 0;
    let totalPrice = 0;
    tripData[0].map((trip, index) => {
      totalAvgDuration = trip.averageDuration;
      totalPrice = trip.price.total * 1;
      for (let i = 1; i < tripData.length; i++) {
        totalAvgDuration += tripData[i][index].averageDuration;
        totalPrice += tripData[i][index].price.total * 1;
      }
      durationArray.push([totalPrice, totalAvgDuration]);
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
      // let sortedArray = prevState.flightData.sort(compareFunction);
      let sortedArray = prevState.flightData.map(tripData =>
        tripData.sort(compareFunction)
      );
      console.log(sortedArray);
      return {
        flightData: prevState.flightData
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
      let sortedArray = prevState.flightData.map(tripData =>
        tripData.sort(compareFunction)
      );
      console.log(sortedArray);
      return {
        flightData: prevState.flightData
      };
    });
  };

  handleShowAll = () => {
    this.setState({
      flightData: this.formattedData,
      showAllResultBtn: false
    });
  };

  handleCheapestCardClick = () => {
    this.handleShowAll();
    this.setState(prevState => {
      const flightData = prevState.flightData.map((trip, index) => {
        let low = 0;
        if (trip[index].price.total * 1 < trip[low].price.total * 1) {
          low = index;
        }
        return trip.filter(
          item => item.price.total * 1 === trip[low].price.total * 1
        );
        // return [trip[low]];
      });
      // const flightData = prevState.flightData.map(trip =>
      //   trip.filter((flight, i) => {
      //     return flight.price.total <= Math.min(...this.priceList)
      //   })
      // );
      return {
        flightData,
        showAllResultBtn: true
      };
    });
  };

  handleFastestCardClick = () => {
    this.handleShowAll();
    this.setState(prevState => {
      const flightData = prevState.flightData.map((trip, index) => {
        let low = 0;
        if (trip[index].averageDuration < trip[low].averageDuration) {
          low = index;
        }
        return [trip[low]];
      });
      // const flightData = prevState.flightData.map(trip =>
      //   trip.filter(
      //     flight =>
      //       flight.averageDuration <=
      //       Math.min(...this.durationList.map(item => item[1]))
      //   )
      // );
      console.log(flightData);
      return {
        flightData,
        showAllResultBtn: true
      };
    });
  };

  onChangePrice = (render, handle, value, un, percent) => {
    let flightData = this.formattedData;
    // let allJoinedData = []
    // flightData[0].map((flight, index) => {
    //   let joinedData = [];
    //   joinedData.push(flight);
    //   for (let i = 1; i < this.props.flightData.length; i++) {
    //     joinedData.push(this.props.flightData[i][index]);
    //   };
    //   allJoinedData.push(joinedData);
    // });

    let array = flightData.map(trip =>
      trip.filter(
        flight =>
          (flight.price.total >= value[0]) &
          (flight.price.total <= Math.round(value[1]))
      )
    );
    this.setState({
      flightData: array,
      showAllResultBtn: true
    });
  };

  onChangeDuration = (render, handle, value, un, percent) => {
    console.log(value);
    let flightData = this.props.allData.map(
      tripData => tripData.flightDetails.data
    );
    let array = flightData.map(trip =>
      trip.filter(flight => flight.averageDuration <= value[0])
    );
    this.setState({
      flightData: array,
      showAllResultBtn: true
    });
  };

  onChangeDepartureTime = (render, handle, value, un, percent) => {
    let flightData = this.props.allData.map(
      tripData => tripData.flightDetails.data
    );
    this.getPrices(flightData);
    let array = flightData.map(trip =>
      trip.filter(flight => flight.itineraries[0].durationMins <= value[1])
    );
    this.setState({
      flightData: array,
      showAllResultBtn: true
    });
  };

  onChangeArrivalTime = (render, handle, value, un, percent) => {
    let flightData = this.props.allData.map(
      tripData => tripData.flightDetails.data
    );
    this.getPrices(flightData);
    let array = flightData.map(trip =>
      trip.filter(flight => {
        if ((flight.itineraries.length = 1)) {
          let arrivalTime =
            flight.itineraries[0].segments[
              flight.itineraries[0].segments.length - 1
            ].arrival.at;
          let formattedArrivalTimeArray = arrivalTime.split("T")[1].split(":");
          let formattedArrivalTime =
            formattedArrivalTimeArray[0] * 60 +
            formattedArrivalTimeArray[1] * 1;
          return (
            formattedArrivalTime >= value[0] && formattedArrivalTime <= value[1]
          );
        } else {
          return (
            flight.itineraries[1].durationMins >= value[0] &&
            flight.itineraries[1].durationMins <= value[1]
          );
        }
      })
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
    let flightData = this.formattedData;
    let unChecked = [];
    this.setState(prevState => {
      console.log(prevState.flightData);
      return {
        checkedStops: prevState.checkedStops.set(item, isChecked)
      };
    });
    console.log(this.formattedData);

    let arrayUnchecked = [];
    let arrayChecked = [];
    let uniqueArrayChecked = [];
    // let filteredArray = [];
    this.setState(prevState => {
      // return an array of flights in which no itinerary contains segments with the given number of stops
      if (!isChecked) {
        arrayUnchecked = prevState.flightData.map(trip =>
          trip.filter(flight => {
            console.log(flight);
            return !flight.numStops.includes(item * 1);
          })
        );
        unChecked.push(item);
      }

      // return an array of flights which contains segments with the given number of stops
      if (isChecked) {
        unChecked.filter(stop => stop !== item);
        console.log(flightData);
        arrayChecked = flightData.map(trip =>
          trip.filter(flight => {
            console.log(flight);
            console.log(flight.numStops);
            return (
              flight.numStops.includes(item * 1) &&
              !flight.numStops.some(item => unChecked.includes(item))
            );
          })
        );
      }
      let resizedArrayUnchecked = this.resizeData(arrayUnchecked);
      let newArrayChecked = prevState.flightData.map(trip =>
        trip.concat(...this.resizeData(arrayChecked))
      );
      console.log(this.resizeData(arrayChecked));

      console.log(newArrayChecked);

      // Remove duplicates
      for (const trip of newArrayChecked) {
        const stopMap = new Map();
        let uniqueList = [];
        for (const item of trip) {
          if (!stopMap.has(item.id)) {
            stopMap.set(item.id, true); // set any value to Map
            uniqueList.push({
              ...item
            });
          }
        }
        uniqueArrayChecked.push(uniqueList);
      }
      console.log(uniqueArrayChecked);
      // let array = flightData.map(trip =>
      //   trip.filter(flight => {
      //     let stopList = [];
      //     flight.itineraries.map(itinerary => {
      //       // Set number of stops greater than 2 to 3 for simplicity ans push the nums to an array
      //       if (itinerary.segments.length > 2) itinerary.segments.length = 3;
      //       stopList.push(itinerary.segments.length);
      //     });
      //     console.log(stopList);
      //     console.log(mapValues);
      //     f;light.numStops = stopList;

      //     let filterResult = flight.numStops.map(numStop =>
      //       mapValues.includes(numStop)
      //     );
      //     console.log(filterResult);
      //     return filterResult.every(item => item === false);
      //   })
      // );
      return {
        flightData: isChecked ? uniqueArrayChecked : resizedArrayUnchecked,
        showAllResultBtn: true
      };
    });
  };
  //let stopsCount = data.reduce((total,itinerary)=> total + itinerary.segments.length, 0);

  onChangeAirline = e => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    let flightData = this.props.allData.map(
      tripData => tripData.flightDetails.data
    );
    let mapValues = [];
    this.setState(prevState => {
      // prevState.checkedAirlines.set(item, isChecked);
      // Create alist of unchecked airlines
      for (let entry of this.state.checkedAirlines) {
        if (entry[1] === false) {
          mapValues.push(entry[0]);
        }
      }
      return {
        checkedAirlines: prevState.checkedAirlines.set(item, isChecked)
      };
    });

    this.setState(() => {
      // return an array of flights in which no itinerary contains segments with the given airline
      let array = flightData.map(trip =>
        trip.filter(flight => {
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
        })
      );

      return {
        flightData: array,
        showAllResultBtn: true
      };
    });
  };

  resizeData = data => {
    let minLength = Math.min(...data.map(trip => trip.length));
    let sameSizeData = data.map(trip => {
      trip.length > minLength
        ? (trip.length = minLength)
        : (trip.length = trip.length);
      return trip;
    });
    return sameSizeData;
  };

  render() {
    let { dictionaryData, flightData } = this.state;
    console.log(dictionaryData);
    console.log(flightData);
    console.log(this.priceList, this.durationList);

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
        <FlightResultHeading userInfo={this.props.userInfo} />

        <Row>
          <Col lg={3}>
            {/* Component for filter options */}
            <FilterResults
              flightData={flightData}
              dictionaryData={dictionaryData}
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
            <FlightResultList
              flightData={flightData}
              userInfo={this.props.userInfo}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default QueryResult;
