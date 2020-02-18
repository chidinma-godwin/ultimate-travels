import React from "react";
import { Collapse, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import CheckBox from "../CheckBox";

class FilterResults extends React.Component {
  constructor() {
    super();
    this.state = {
      open: true,
      airlines: true,
      prices: false,
      flightTimes: true,
      priceValue: [0, 100],
      priceRange: { min: 0, max: 100 },
      durationValue: [0, 100],
      durationRange: { min: 0, max: 100 },
      outboundTime: [0, 1439],
      outboundTimeRange: { min: 0, max: 1439 },
      inboundTime: [0, 1439],
      inboundTimeRange: { min: 0, max: 1439 }
    };
  }

  onClick = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  onClickAirline = evt => {
    this.setState(prevState => ({
      airlines: !prevState.airlines
    }));
  };

  onClickPrices = () => {
    let priceList = this.props.priceList;
    this.setState(prevState => ({
      prices: !prevState.prices,
      priceValue: [Math.min(...priceList), Math.max(...priceList)],
      priceRange: {
        min: Math.min(...priceList),
        max: Math.max(...priceList)
      }
    }));
  };

  onClickDuration = () => {
    let durationList = this.props.durationList;
    this.setState(prevState => ({
      duration: !prevState.duration,
      durationValue: [
        Math.round(Math.min(...durationList.map(item => item[1]))),
        Math.round(Math.max(...durationList.map(item => item[1])))
      ],
      durationRange: {
        min: Math.min(...durationList.map(item => item[1])),
        max: Math.max(...durationList.map(item => item[1]))
      }
    }));
  };

  onClickFlightTimes = evt => {
    this.setState(prevState => ({
      flightTimes: !prevState.flightTimes
    }));
  };

  onPriceSlide = (render, handle, value, un, percent) => {
    this.setState({
      priceValue: [value[0].toFixed(2), value[1].toFixed(2)]
    });
  };

  onDurationSlide = (render, handle, value, un, percent) => {
    this.setState({
      durationValue: [
        Math.min(Math.round(...this.props.durationList.map(item => item[1]))),
        Math.round(value[0])
      ]
    });
  };

  onOutboundTimeSlide = (render, handle, value, un, percent) => {
    console.log(value);
    this.setState({
      outboundTime: [Math.round(value[0]), Math.round(value[1])]
    });
  };

  onInboundTimeSlide = (render, handle, value, un, percent) => {
    console.log(value);
    this.setState({
      inboundTime: [Math.floor(value[0]), Math.floor(value[1])]
    });
  };

  displayTime = number => {
    let hour = Math.floor(number / 60);
    let min = number % 60;
    let calcTime;
    if (min < 10) {
      calcTime = `${hour}.0${min}`;
    } else {
      calcTime = `${hour}.${min}`;
    }
    return calcTime;
  };

  render() {
    console.log(this.state);
    let dictionaryData = this.props.dictionaryData;
    let uniqueCarrierCodes = [];

    // Remove duplicates
    for (const data of dictionaryData) {
      const matchAirline = new Map();
      let uniqueList = [];
      for (const item of data) {
        if (!matchAirline.has(item[0])) {
          matchAirline.set(item[0], true); // set value to Map
          uniqueList.push({
            ...item
          });
        }
      }
      uniqueCarrierCodes.push(uniqueList);
    }
    console.log(uniqueCarrierCodes);
    return (
      <React.Fragment>
        <div
          style={{
            backgroundColor: "#41225f",
            padding: "0.5em",
            textAlign: "center",
            color: "white"
          }}
        >
          Filter Results
        </div>

        <div style={{ backgroundColor: "white", width: "inherit" }}>
          <Button
            className="filter-btn"
            variant="light"
            onClick={this.onClick}
            aria-expanded={this.state.open}
            aria-controls="stops"
            style={{
              width: "inherit",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "white"
            }}
          >
            <span>Stops</span>
            <FontAwesomeIcon
              icon={["fas", "sort-down"]}
              style={{ color: "black" }}
              size="lg"
            />
          </Button>

          <Collapse in={this.state.open}>
            <div id="stops" style={{ paddingLeft: "3em" }}>
              {[
                ["1", "None"],
                ["2", "1 Stop"],
                ["3", "2+ Stops"]
              ].map(stop => (
                <CheckBox
                  key={stop[0]}
                  type="checkbox"
                  label={stop[1]}
                  id={stop[0]}
                  name={stop[0]}
                  checked={this.props.checkedStops.get(stop[0])}
                  onChange={this.props.onChangeStops}
                />
              ))}
            </div>
          </Collapse>

          <hr />

          <Button
            className="filter-btn"
            variant="light"
            onClick={this.onClickAirline}
            aria-expanded={this.state.airlines}
            aria-controls="airlines"
            style={{
              width: "inherit",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "white"
            }}
          >
            <span>Airlines</span>
            <FontAwesomeIcon
              icon={["fas", "sort-down"]}
              style={{ color: "black" }}
              size="lg"
            />
          </Button>

          <Collapse in={this.state.airlines}>
            <div id="airlines" style={{ paddingLeft: "3em" }}>
              {this.props.dictionaryData.map(dictionary =>
                dictionary.map(airline => (
                  <CheckBox
                    key={airline[0]}
                    type="checkbox"
                    label={airline[1]}
                    name={airline[0]}
                    id={airline[1]}
                    checked={this.props.checkedAirlines.get(airline[0])}
                    onChange={this.props.onChangeAirline}
                  />
                ))
              )}
              {/* {this.props.flightDetails.dictionaries.carriers.map(airline => (
                <FormCheck
                  key={airline[0]}
                  type="checkbox"
                  label={airline[1]}
                  id={airline[0]}
                  checked={this.state.airlineChecked}
                  onChange={()=> this.props.onChangeAirline()}
                />
              ))} */}
            </div>
          </Collapse>

          <hr />

          <Button
            className="filter-btn mb-2"
            variant="light"
            onClick={this.onClickPrices}
            aria-expanded={this.state.prices}
            aria-controls="prices"
            style={{
              width: "inherit",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "white"
            }}
          >
            <span>Price Range</span>
            <FontAwesomeIcon
              icon={["fas", "sort-down"]}
              style={{ color: "black" }}
              size="lg"
            />
          </Button>
          <Collapse in={this.state.prices}>
            <div id="prices">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "2em",
                  marginRight: "2em"
                }}
              >
                <span>{this.state.priceValue[0]}</span>
                <span>{this.state.priceValue[1]}</span>
              </div>
              <Nouislider
                accessibility
                start={this.state.priceValue}
                range={this.state.priceRange}
                onSlide={this.onPriceSlide}
                onChange={this.props.onChangePrice}
                // pips={{ mode: "count", values: 5 }}
                connect
              />
            </div>
          </Collapse>

          <hr />

          <Button
            className="filter-btn mb-2"
            variant="light"
            onClick={this.onClickDuration}
            aria-expanded={this.state.duration}
            aria-controls="duration"
            style={{
              width: "inherit",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "white"
            }}
          >
            <span>Journey Duration</span>
            <FontAwesomeIcon
              icon={["fas", "sort-down"]}
              style={{ color: "black" }}
              size="lg"
            />
          </Button>

          <Collapse in={this.state.duration}>
            <div id="duration">
              <div
                style={{ marginLeft: "2em", marginRight: "2em" }}
              >{`${this.displayTime(
                this.state.durationValue[0]
              )} hours - ${this.displayTime(
                this.state.durationValue[1]
              )} hours`}</div>
              <Nouislider
                accessibility
                // step={1}
                start={this.state.durationValue[1]}
                range={this.state.durationRange}
                onSlide={this.onDurationSlide}
                connect="lower"
                onChange={this.props.onChangeDuration}
              />
            </div>
          </Collapse>

          <hr />

          <Button
            className="filter-btn mb-2"
            variant="light"
            onClick={this.onClickFlightTimes}
            aria-expanded={this.state.flightTimes}
            aria-controls="flightTimes"
            style={{
              width: "inherit",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "white"
            }}
          >
            <span>Flight Times</span>
            <FontAwesomeIcon
              icon={["fas", "sort-down"]}
              style={{ color: "black" }}
              size="lg"
            />
          </Button>

          <Collapse in={this.state.flightTimes}>
            <div id="flightTimes">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "2em",
                  marginRight: "2em"
                }}
              >
                <span>{this.displayTime(this.state.outboundTime[0])}</span>
                <span>Departure</span>
                <span>{this.displayTime(this.state.outboundTime[1])}</span>
              </div>

              <Nouislider
                accessibility
                step={1}
                start={this.state.outboundTime}
                range={this.state.outboundTimeRange}
                onSlide={this.onOutboundTimeSlide}
                onChange={this.props.onChangeDepartureTime}
                connect
              />
              {this.props.returnDate !== undefined ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: "2em",
                      marginRight: "2em"
                    }}
                  >
                    <span>{this.displayTime(this.state.inboundTime[0])}</span>
                    <span>Arrival</span>
                    <span>{this.displayTime(this.state.inboundTime[1])}</span>
                  </div>
                  <Nouislider
                    accessibility
                    step={1}
                    start={this.state.inboundTime}
                    range={this.state.inboundTimeRange}
                    onSlide={this.onInboundTimeSlide}
                    onChange={this.props.onChangeArrivalTime}
                    connect
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </Collapse>
          <hr />
        </div>
      </React.Fragment>
    );
  }
}

export default FilterResults;
