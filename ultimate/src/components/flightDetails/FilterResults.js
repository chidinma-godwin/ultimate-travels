import React from "react";
import { Collapse, Button, FormCheck } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

class FilterResults extends React.Component {
  constructor(props) {
    super(props);
    const { flightDetails } = this.props.data;
    this.state = {
      open: true,
      airlines: true,
      prices: false,
      flightTimes: true,
      value: [0, 100],
      range: { min: 0, max: 100 },
      durationValue: [0, 100],
      durationRange: { min: 0, max: 100 },
      outboundTime: [0, 1440],
      outboundTimeRange: { min: 0, max: 1440 },
      inboundTime: [0, 1440],
      inboundTimeRange: { min: 0, max: 1440 },
      flightDetails
    };
  }

  getPrices = () => {
    let priceArray = [];
    this.state.flightDetails.Itineraries.map(itinerary => {
      itinerary.PricingOptions.map(option => priceArray.push(option.Price));
    });
    return priceArray;
  };

  getDuration = () => {
    let durationArray = [];
    this.state.flightDetails.Legs.map(leg => durationArray.push(leg.Duration));
    return durationArray;
  };

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
    let priceArray = this.getPrices();
    this.setState(prevState => ({
      prices: !prevState.prices,
      value: [Math.min(...priceArray), Math.max(...priceArray)],
      range: {
        min: Math.min(...priceArray),
        max: Math.max(...priceArray)
      }
    }));
  };

  onClickDuration = () => {
    let durationArray = this.getDuration();
    this.setState(prevState => ({
      duration: !prevState.duration,
      durationValue: [Math.min(...durationArray), Math.max(...durationArray)],
      durationRange: {
        min: Math.min(...durationArray),
        max: Math.max(...durationArray)
      }
    }));
  };

  onClickFlightTimes = evt => {
    this.setState(prevState => ({
      flightTimes: !prevState.flightTimes
    }));
  };

  onSlide = (render, handle, value, un, percent) => {
    console.log(value);
    this.setState({
      value: [value[0].toFixed(2), value[1].toFixed(2)]
    });
  };

  onDurationSlide = (render, handle, value, un, percent) => {
    console.log(value);
    this.setState({
      durationValue: [Math.min(...this.getDuration()), Math.floor(value[0])]
    });
  };

  onOutboundTimeSlide = (render, handle, value, un, percent) => {
    console.log(value);
    this.setState({
      outboundTime: [Math.floor(value[0]), Math.floor(value[1])]
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
      calcTime = `${hour} : 0${min}`;
    } else {
      calcTime = `${hour} : ${min}`;
    }
    return calcTime;
  };

  render() {
    console.log(this.state);

    return (
      <React.Fragment>
        <div
          style={{
            backgroundColor: "rgb(123, 123, 204)",
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
              <FormCheck type="checkbox" label="None" id="none" />
              <FormCheck type="checkbox" label="1 Stop" id="one-stop" />
              <FormCheck type="checkbox" label="2+ Stops" id="two-more-stops" />
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
              {this.state.flightDetails.Carriers.map(airline => (
                <FormCheck
                  type="checkbox"
                  label={airline.Name}
                  id={airline.Name}
                  checked
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
                <span>{this.state.value[0]}</span>
                <span>{this.state.value[1]}</span>
              </div>
              <Nouislider
                accessibility
                start={this.state.value}
                range={this.state.range}
                onSlide={this.onSlide}
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
                step={1}
                start={this.state.durationValue[1]}
                range={this.state.durationRange}
                onSlide={this.onDurationSlide}
                connect="lower"
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
                connect
              />

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
                connect
              />
            </div>
          </Collapse>
          <hr />
        </div>
      </React.Fragment>
    );
  }
}

export default FilterResults;
