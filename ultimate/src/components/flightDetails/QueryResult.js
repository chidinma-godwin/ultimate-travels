import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FilterResults from "./FilterResults";
import FlightResultList from "./FlightResultList";
import SortResult from "./SortResult";
import FlightResultHeading from "./FlightResultHeading";
import { Map } from "immutable";
import FlightResultPagination from "./FlightResultPagination";
import {
  getPrices,
  getDuration,
  formatData,
  resizeData,
  mergeData,
} from "../../utils";

class QueryResult extends React.Component {
  constructor(props) {
    super(props);

    // Add computed number of stops and unique airline list to the flightData
    this.formattedData = formatData(this.props.allData);
    this.resizeData = resizeData;
    this.getPrices = getPrices;
    this.getDuration = getDuration;
    this.mergeData = mergeData;
    this.priceList = this.getPrices(this.resizeData(this.formattedData));
    this.durationList = this.getDuration(this.resizeData(this.formattedData));

    this.state = {
      dictionaryData: this.props.allData.map(
        (tripData) => tripData.flightDetails.dictionaries.carriers
      ),
      flightData: this.resizeData(this.formattedData),
      showAllResultBtn: false,
      checkedStops: new Map(),
      checkedAirlines: new Map(),
      currentPage: 1,
      flightsPerPage: 10,
      durationOfFastest: [],
      durationOfCheapest: [],
      durationArray: this.getDuration(this.resizeData(this.formattedData)),
      priceArray: this.getPrices(this.resizeData(this.formattedData)),
      outboundTime: [0, 1439],
      inboundTime: [0, 1439],
      durationValue: [0, 100],
      priceValue: [Math.min(...this.priceList), Math.max(...this.priceList)],
      durationValue: [
        Math.round(Math.min(...this.durationList.map((item) => item[1]))),
        Math.round(Math.max(...this.durationList.map((item) => item[1]))),
      ],
    };
    this.unCheckedStops = [];
    this.unCheckedAirlines = [];
  }

  handleSortCheapest = () => {
    // this.handleShowAll();
    let compareFunction = (a, b) => {
      let firstPrice = a.price.total * 1;
      let secondPrice = b.price.total * 1;
      return firstPrice < secondPrice ? -1 : firstPrice > secondPrice ? 1 : 0;
    };
    this.setState((prevState) => {
      let sortedArray = prevState.flightData.map((tripData) =>
        tripData.sort(compareFunction)
      );

      return {
        flightData: prevState.flightData,
        durationOfCheapest: [],
        durationOfFastest: [],
        priceArray: this.getPrices(sortedArray),
        durationArray: this.getDuration(sortedArray),
      };
    });
  };

  handleSortFastest = () => {
    // this.handleShowAll();
    let compareFunction = (a, b) => {
      let firstDuration = a.averageDuration;
      let secondDuration = b.averageDuration;
      return firstDuration < secondDuration
        ? -1
        : firstDuration > secondDuration
        ? 1
        : 0;
    };
    this.setState((prevState) => {
      let sortedArray = prevState.flightData.map((tripData) =>
        tripData.sort(compareFunction)
      );

      return {
        flightData: prevState.flightData,
        durationOfCheapest: [],
        durationOfFastest: [],
        priceArray: this.getPrices(sortedArray),
        durationArray: this.getDuration(sortedArray),
      };
    });
  };

  handleShowAll = () => {
    this.unCheckedStops = [];
    this.unCheckedAirlines = [];
    this.setState({
      flightData: this.resizeData(this.formattedData),
      showAllResultBtn: false,
      currentPage: 1,
    });
  };

  handleCheapestCardClick = () => {
    // this.handleShowAll();
    this.setState((prevState) => {
      let array = prevState.flightData.map((trip) => {
        let low = 0;

        trip.map((item, index, arr) => {
          if (item.accumulatedPrice < arr[low].accumulatedPrice) low = index;
        });

        const cheapestFlight = trip.filter(
          (item) => item.accumulatedPrice === trip[low].accumulatedPrice
        );
        return cheapestFlight;
      });

      const flightData = this.resizeData(array);
      let durationOfCheapest = this.getDuration(flightData);
      return {
        flightData,
        showAllResultBtn: true,
        durationOfCheapest: durationOfCheapest[0],
      };
    });
  };

  handleFastestCardClick = () => {
    // this.handleShowAll();
    this.setState((prevState) => {
      const flightArray = prevState.flightData.map((trip) => {
        let low = 0;

        trip.map((item, index, arr) => {
          if (item.averageDuration < arr[low].averageDuration) low = index;
        });

        const fastestFlight = trip.filter(
          (item) => item.averageDuration === trip[low].averageDuration
        );

        return fastestFlight;
      });
      const flightData = this.resizeData(flightArray);
      let durationOfFastest = this.getDuration(flightData);
      return {
        flightData,
        showAllResultBtn: true,
        durationOfFastest: durationOfFastest[0],
      };
    });
  };

  onChangePrice = (render, handle, value, un, percent) => {
    let flightData = this.resizeData(this.formattedData);
    this.priceList = this.getPrices(flightData);

    this.setState((prevState) => {
      // if (flightData.length === 1) {
      let array = flightData.map((trip) =>
        trip.filter((flight) => {
          this.priceList = this.priceList.filter(
            (price) => price >= value[0] && price <= Math.round(value[1])
          );

          return (
            flight.accumulatedPrice >= value[0] &&
            flight.accumulatedPrice <= Math.round(value[1]) &&
            !flight.numStops.some((item) =>
              this.unCheckedStops.includes(item)
            ) &&
            !flight.uniqueAirlinesList.some((item) =>
              this.unCheckedAirlines.includes(item)
            )
          );
        })
      );
      // }
      let newArrayChecked = this.resizeData(array);

      return {
        flightData: newArrayChecked,
        showAllResultBtn: true,
        durationOfCheapest: [],
        durationOfFastest: [],
        priceArray: this.getPrices(newArrayChecked),
        durationArray: this.getDuration(newArrayChecked),
      };
    });
  };

  onChangeDuration = (render, handle, value, un, percent) => {
    let flightData = this.resizeData(this.formattedData);

    this.setState((prevState) => {
      let array = flightData.map((trip) =>
        trip.filter((flight) => {
          return (
            flight.averageDuration <= Number(value[0].toFixed(2)) &&
            !flight.numStops.some((item) =>
              this.unCheckedStops.includes(item)
            ) &&
            !flight.uniqueAirlinesList.some((item) =>
              this.unCheckedAirlines.includes(item)
            ) &&
            this.priceList.some((item) => flight.accumulatedPrice == item)
          );
        })
      );
      return {
        flightData: array,
        showAllResultBtn: true,
        durationOfCheapest: [],
        durationOfFastest: [],
        priceArray: this.getPrices(array),
        durationArray: this.getDuration(array),
      };
    });
  };

  onChangeDepartureTime = (render, handle, value, un, percent) => {
    let flightData = this.resizeData(this.formattedData);

    this.setState(() => {
      let array = flightData.map((trip) =>
        trip.filter((flight) => {
          // Split the flight time to get only hours and minutes
          let splittedTimeArray = flight.itineraries[0].segments[0].departure.at
            .split("T")[1]
            .split(":");

          // Convert the flight time to minutes
          let calculatedTime =
            splittedTimeArray[0] * 60 + splittedTimeArray[1] * 1;

          return (
            calculatedTime >= Math.round(value[0]) &&
            calculatedTime <= Math.round(value[1]) &&
            !flight.numStops.some((item) =>
              this.unCheckedStops.includes(item)
            ) &&
            !flight.uniqueAirlinesList.some((item) =>
              this.unCheckedAirlines.includes(item)
            ) &&
            this.priceList.some((item) => flight.accumulatedPrice == item)
          );
        })
      );
      let resizedArray = this.resizeData(array);
      return {
        flightData: resizedArray,
        showAllResultBtn: true,
        durationOfCheapest: [],
        durationOfFastest: [],
        priceArray: this.getPrices(resizedArray),
        durationArray: this.getDuration(resizedArray),
      };
    });
  };

  onChangeArrivalTime = (render, handle, value, un, percent) => {
    let flightData = this.resizeData(this.formattedData);
    this.getPrices(flightData);

    this.setState(() => {
      let array = flightData.map((trip) =>
        trip.filter((flight) => {
          // Split the flight time to get only hours and minutes
          let splittedTimeArray = flight.itineraries[0].segments[
            flight.itineraries[0].segments.length - 1
          ].arrival.at
            .split("T")[1]
            .split(":");

          // Convert the flight time to minutes
          let calculatedTime =
            splittedTimeArray[0] * 60 + splittedTimeArray[1] * 1;

          return (
            calculatedTime >= Math.round(value[0]) &&
            calculatedTime <= Math.round(value[1]) &&
            !flight.numStops.some((item) =>
              this.unCheckedStops.includes(item)
            ) &&
            !flight.uniqueAirlinesList.some((item) =>
              this.unCheckedAirlines.includes(item)
            ) &&
            this.priceList.some((item) => flight.accumulatedPrice == item)
          );
        })
      );

      let resizedArray = this.resizeData(array);
      return {
        flightData: resizedArray,
        showAllResultBtn: true,
        durationOfCheapest: [],
        durationOfFastest: [],
        priceArray: this.getPrices(resizedArray),
        durationArray: this.getDuration(resizedArray),
      };
    });
  };

  onOutboundTimeSlide = (render, handle, value, un, percent) => {
    this.setState({
      outboundTime: [Math.round(value[0]), Math.round(value[1])],
    });
  };

  onInboundTimeSlide = (render, handle, value, un, percent) => {
    this.setState({
      inboundTime: [Math.floor(value[0]), Math.floor(value[1])],
    });
  };

  onPriceSlide = (render, handle, value, un, percent) => {
    this.setState({
      priceValue: [value[0].toFixed(2), value[1].toFixed(2)],
    });
  };

  onDurationSlide = (render, handle, value, un, percent) => {
    this.setState({
      durationValue: [
        Math.min(Math.round(...this.durationList.map((item) => item[1]))),
        Math.round(value[0]),
      ],
    });
  };

  onChangeStops = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    let flightData = this.formattedData;
    // this.unCheckedStops = [];
    this.setState((prevState) => {
      return {
        checkedStops: prevState.checkedStops.set(item, isChecked),
      };
    });

    let arrayUnchecked = [];
    let arrayChecked = [];
    let uniqueArrayChecked = [];
    let resizedArrayUnchecked = [];
    this.setState((prevState) => {
      // return an array of flights in which no itinerary contains segments with the given number of stops
      if (!isChecked) {
        arrayUnchecked = prevState.flightData.map((trip) =>
          trip.filter((flight) => {
            return !flight.numStops.includes(item * 1);
          })
        );
        this.unCheckedStops.push(item);
        this.unCheckedStops = [...new Set(this.unCheckedStops)];

        resizedArrayUnchecked = this.resizeData(arrayUnchecked);
      }

      // return an array of flights which contains segments with the given number of stops
      if (isChecked) {
        this.unCheckedStops = this.unCheckedStops.filter(
          (stop) => stop !== item
        );
        arrayChecked = flightData.map((trip) =>
          trip.filter((flight) => {
            return (
              flight.numStops.includes(item * 1) &&
              !flight.numStops.some((item) =>
                this.unCheckedStops.includes(item)
              ) &&
              !flight.uniqueAirlinesList.some((item) =>
                this.unCheckedAirlines.includes(item)
              ) &&
              this.priceList.some((item) => flight.accumulatedPrice == item)
            );
          })
        );

        uniqueArrayChecked = this.mergeData(prevState.flightData, arrayChecked);
      }

      return {
        flightData: isChecked ? uniqueArrayChecked : resizedArrayUnchecked,
        showAllResultBtn: true,
        durationOfCheapest: [],
        durationOfFastest: [],
        priceArray: isChecked
          ? this.getPrices(uniqueArrayChecked)
          : this.getPrices(resizedArrayUnchecked),
        durationArray: isChecked
          ? this.getDuration(uniqueArrayChecked)
          : this.getDuration(resizedArrayUnchecked),
      };
    });
  };

  onChangeAirline = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    let flightData = this.formattedData;
    // this.unCheckedAirlines = [];
    this.setState((prevState) => {
      return {
        checkedAirlines: prevState.checkedAirlines.set(item, isChecked),
      };
    });

    let arrayUnchecked = [];
    let arrayChecked = [];
    let uniqueArrayChecked = [];
    let resizedArrayUnchecked = [];
    this.setState((prevState) => {
      // return an array of flights in which no itinerary contains segments with the given airlines
      if (!isChecked) {
        arrayUnchecked = prevState.flightData.map((trip) =>
          trip.filter((flight) => {
            return !flight.uniqueAirlinesList.includes(item);
          })
        );
        this.unCheckedAirlines.push(item);
        this.unCheckedAirlines = [...new Set(this.unCheckedAirlines)];

        resizedArrayUnchecked = this.resizeData(arrayUnchecked);
      }

      // return an array of flights which contains segments with the given airlines
      if (isChecked) {
        this.unCheckedAirlines = this.unCheckedAirlines.filter(
          (airline) => airline !== item
        );
        arrayChecked = flightData.map((trip) =>
          trip.filter((flight) => {
            return (
              flight.uniqueAirlinesList.includes(item) &&
              !flight.uniqueAirlinesList.some((item) =>
                this.unCheckedAirlines.includes(item)
              ) &&
              !flight.numStops.some((item) =>
                this.unCheckedStops.includes(item)
              ) &&
              this.priceList.includes(flight.accumulatedPrice)
            );
          })
        );

        uniqueArrayChecked = this.mergeData(prevState.flightData, arrayChecked);
      }
      return {
        flightData: isChecked ? uniqueArrayChecked : resizedArrayUnchecked,
        showAllResultBtn: true,
        durationOfCheapest: [],
        durationOfFastest: [],
        priceArray: isChecked
          ? this.getPrices(uniqueArrayChecked)
          : this.getPrices(resizedArrayUnchecked),
        durationArray: isChecked
          ? this.getDuration(uniqueArrayChecked)
          : this.getDuration(resizedArrayUnchecked),
      };
    });
  };

  changePage = (number) => {
    this.setState({
      currentPage: number,
    });
  };

  showPrevPage = () => {
    this.setState((prevState) => {
      return {
        currentPage: prevState.currentPage - 1,
      };
    });
  };

  showNextPage = () => {
    this.setState((prevState) => {
      return {
        currentPage: prevState.currentPage + 1,
      };
    });
  };

  handleResetData = () => {
    this.unCheckedStops = [];
    this.unCheckedAirlines = [];
    this.priceList = this.getPrices(this.resizeData(this.formattedData));
    this.setState({
      flightData: this.resizeData(this.formattedData),
      showAllResultBtn: false,
      checkedStops: new Map(),
      checkedAirlines: new Map(),
      durationOfCheapest: [],
      durationOfFastest: [],
      outboundTime: [0, 1439],
      inboundTime: [0, 1439],
      priceValue: [Math.min(...this.priceList), Math.max(...this.priceList)],
      durationValue: [
        Math.round(Math.min(...this.durationList.map((item) => item[1]))),
        Math.round(Math.max(...this.durationList.map((item) => item[1]))),
      ],
      currentPage: 1,
    });
  };

  render() {
    const {
      dictionaryData,
      flightData,
      currentPage,
      flightsPerPage,
      durationArray,
      priceArray,
      durationOfCheapest,
      durationOfFastest,
      inboundTime,
      outboundTime,
      priceValue,
      durationValue,
    } = this.state;

    // Slice the flight data to return a specified result per page
    const indexOfLastFlight = currentPage * flightsPerPage;
    const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
    const currentFlights = flightData.map((trip) =>
      trip.slice(indexOfFirstFlight, indexOfLastFlight)
    );

    return (
      <Container
        fluid
        style={{
          marginTop: "2em",
          padding: "3em",
          paddingTop: "0",
        }}
        className="flightResultContainer"
      >
        {/* Component showing result heading */}
        <FlightResultHeading
          userInfo={this.props.userInfo}
          singleTrip={this.props.singleTrip}
          currency={this.props.currency}
        />

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
              onChangeStops={this.onChangeStops}
              checkedStops={this.state.checkedStops}
              onChangeArrivalTime={this.onChangeArrivalTime}
              onChangeDepartureTime={this.onChangeDepartureTime}
              onChangeAirline={this.onChangeAirline}
              checkedAirlines={this.state.checkedAirlines}
              return={this.props.userInfo.returnDate}
              outboundTime={outboundTime}
              inboundTime={inboundTime}
              priceValue={priceValue}
              durationValue={durationValue}
              onPriceSlide={this.onPriceSlide}
              onDurationSlide={this.onDurationSlide}
              onInboundTimeSlide={this.onInboundTimeSlide}
              onOutboundTimeSlide={this.onOutboundTimeSlide}
            />
          </Col>

          <Col lg={9} className="pl-4">
            {/* Component displaying sort options */}
            {flightData[0].length ? (
              <SortResult
                handleSortCheapest={this.handleSortCheapest}
                handleSortFastest={this.handleSortFastest}
                durationArray={durationArray}
                priceArray={priceArray}
                handleCheapestCardClick={this.handleCheapestCardClick}
                handleFastestCardClick={this.handleFastestCardClick}
                durationOfFastest={durationOfFastest}
                durationOfCheapest={durationOfCheapest}
                currency={this.props.currency}
              />
            ) : null}

            {/* Show a button to display all result only if the data has been filtered or sorted */}
            {this.state.showAllResultBtn ? (
              <div className="d-block ml-auto mb-2">
                <Button onClick={this.handleResetData}>Reset result</Button>
              </div>
            ) : (
              ""
            )}

            {/* Component displaying flight results */}
            <FlightResultList
              flightData={currentFlights}
              userInfo={this.props.userInfo}
              currency={this.props.currency}
            />
            <br />
            <br />

            <FlightResultPagination
              currentPage={currentPage}
              flightsPerPage={flightsPerPage}
              flightData={flightData}
              changePage={this.changePage}
              showPrevPage={this.showPrevPage}
              showNextPage={this.showNextPage}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default QueryResult;
