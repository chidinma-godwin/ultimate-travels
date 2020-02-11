import React from "react";
import { Collapse, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import CheckBox from "../CheckBox";

class FilterHotels extends React.Component {
  constructor() {
    super();
    this.state = {
      openStars: true,
      prices: false,
      priceValue: [0, 100],
      priceRange: { min: 0, max: 100 }
    };
  }

  onClickStars = () => {
    this.setState(prevState => ({
      openStars: !prevState.openStars
    }));
  };

  onClickPrices = () => {
    let priceList = [];
    this.props.hotelData.map(data =>
      priceList.push(data.offers[0].price.total * 1)
    );
    this.setState(prevState => ({
      prices: !prevState.prices,
      priceValue: [Math.min(...priceList), Math.max(...priceList)],
      priceRange: {
        min: Math.min(...priceList),
        max: Math.max(...priceList)
      }
    }));
  };

  onPriceSlide = (render, handle, value, un, percent) => {
    console.log(render);
    console.log(handle);
    console.log(un);
    this.setState({
      priceValue: [value[0].toFixed(2), value[1].toFixed(2)]
    });
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
            className="filter-btn"
            variant="light"
            onClick={this.onClickStars}
            aria-expanded={this.state.openStars}
            aria-controls="stars"
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

          <Collapse in={this.state.openStars}>
            <div id="stars" style={{ paddingLeft: "3em" }}>
              {[
                ["1", "One Star and below"],
                ["2", "2 Star"],
                ["3", "3 Star"],
                ["4", "4 Star"],
                ["5", "5 Star and above"]
              ].map(star => (
                <CheckBox
                  key={star[0]}
                  type="checkbox"
                  label={star[1]}
                  id={star[0]}
                  name={star[0]}
                  checked={this.props.stars.get(star[0])}
                  onChange={this.props.onChangeStars}
                />
              ))}
            </div>
          </Collapse>
        </div>
      </React.Fragment>
    );
  }
}

export default FilterHotels;
