import React from "react";
import { Collapse, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import CheckBox from "../CheckBox";
import { displayTime } from "../../utils";

class FilterResults extends React.Component {
  constructor() {
    super();
    this.state = {
      open: true,
      airlines: true,
      prices: false,
      flightTimes: true,
      priceRange: { min: 0, max: 100 },
      durationRange: { min: 0, max: 100 },
      outboundTimeRange: { min: 0, max: 1439 },
      inboundTimeRange: { min: 0, max: 1439 },
    };
    this.displayTime = displayTime;
  }

  onClick = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  onClickAirline = (evt) => {
    this.setState((prevState) => ({
      airlines: !prevState.airlines,
    }));
  };

  onClickPrices = () => {
    let priceList = this.props.priceList;
    this.setState((prevState) => ({
      prices: !prevState.prices,
      priceRange: {
        min: Math.min(...priceList),
        max: Math.max(...priceList),
      },
    }));
  };

  onClickDuration = () => {
    let durationList = this.props.durationList;
    this.setState((prevState) => ({
      duration: !prevState.duration,
      durationRange: {
        min: Math.min(...durationList.map((item) => item[1])),
        max: Math.max(...durationList.map((item) => item[1])),
      },
    }));
  };

  onClickFlightTimes = (evt) => {
    this.setState((prevState) => ({
      flightTimes: !prevState.flightTimes,
    }));
  };

  render() {
    let dictionaryData = this.props.dictionaryData;

    // Join the dictionary data into a single array
    let joinedCarrierCodes = dictionaryData[0].concat(
      ...dictionaryData.filter((item, index) => index >= 1)
    );

    // Remove duplicate airlines
    let uniqueCarrierCodes = Array.from(
      new Set(joinedCarrierCodes.map((airline) => airline[0]))
    ).map((code) => joinedCarrierCodes.find((airline) => airline[0] === code));

    return (
      <React.Fragment>
        <div
          className="filter_flight"
          // style={{
          //   backgroundColor: "#41225f",
          //   padding: "0.5em",
          //   textAlign: "center",
          //   color: "white"
          // }}
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
              backgroundColor: "white",
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
                ["3", "2+ Stops"],
              ].map((stop) => (
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
              backgroundColor: "white",
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
              {uniqueCarrierCodes.map((airline) => (
                <CheckBox
                  key={airline[0]}
                  type="checkbox"
                  label={airline[1]}
                  name={airline[0]}
                  id={airline[1]}
                  checked={this.props.checkedAirlines.get(airline[0])}
                  onChange={this.props.onChangeAirline}
                />
              ))}
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
              backgroundColor: "white",
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
                  marginRight: "2em",
                }}
              >
                <span>{this.props.priceValue[0]}</span>
                <span>{this.props.priceValue[1]}</span>
              </div>
              <Nouislider
                accessibility
                start={this.props.priceValue}
                range={this.state.priceRange}
                onSlide={this.props.onPriceSlide}
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
              backgroundColor: "white",
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
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "2em",
                  marginRight: "2em",
                }}
              >
                <span>{`${this.displayTime(
                  this.props.durationValue[0]
                )} hours`}</span>
                <span>
                  {`${this.displayTime(this.props.durationValue[1])} hours`}
                </span>
              </div>
              {/* <div
                style={{ marginLeft: "2em", marginRight: "2em" }}
              >{`${this.displayTime(
                this.state.durationValue[0]
              )} hours - ${this.displayTime(
                this.state.durationValue[1]
              )} hours`}</div> */}
              <Nouislider
                accessibility
                // step={1}
                start={this.props.durationValue[1]}
                range={this.state.durationRange}
                onSlide={this.props.onDurationSlide}
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
              backgroundColor: "white",
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
                  marginRight: "2em",
                }}
              >
                <span>{this.displayTime(this.props.outboundTime[0])}</span>
                <span>Departure</span>
                <span>{this.displayTime(this.props.outboundTime[1])}</span>
              </div>

              <Nouislider
                accessibility
                step={1}
                start={this.props.outboundTime}
                range={this.state.outboundTimeRange}
                onSlide={this.props.onOutboundTimeSlide}
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
                      marginRight: "2em",
                    }}
                  >
                    <span>{this.displayTime(this.props.inboundTime[0])}</span>
                    <span>Arrival</span>
                    <span>{this.displayTime(this.props.inboundTime[1])}</span>
                  </div>
                  <Nouislider
                    accessibility
                    step={1}
                    start={this.props.inboundTime}
                    range={this.state.inboundTimeRange}
                    onSlide={this.props.onInboundTimeSlide}
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
