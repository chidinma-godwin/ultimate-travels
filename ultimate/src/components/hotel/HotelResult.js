import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import HotelResultList from "./HotelResultList";
import HotelResultHeading from "./HotelResultHeading";
import FilterHotels from "./FilterHotels";
import { Map } from "immutable";

class HotelResult extends React.Component {
  constructor(props) {
    super(props);
    const hotelData = this.props.data.hotels.data;
    const { userInfo } = this.props;
    this.priceList = hotelData.map(data => data.offers[0].price.total * 1);
    this.checkedStars = hotelData.map(data => data.hotel.rating);
    this.state = {
      hotelData,
      userInfo,
      stars: new Map(),
      showAllResultBtn: false
    };
  }

  onChangePrice = (render, handle, value, un, percent) => {
    const hotelData = this.props.data.hotels.data;
    this.setState(prevState => {
      let array = hotelData.filter(
        hotel =>
          this.checkedStars.includes(hotel.hotel.rating) &&
          hotel.offers[0].price.total * 1 >= value[0] &&
          hotel.offers[0].price.total * 1 <= Math.round(value[1])
      );
      array.map(
        data =>
          (this.priceList = this.priceList.filter(
            i => data.offers[0].price.total * 1 === i
          ))
      );
      console.log(this.priceList);
      return {
        hotelData: array,
        showAllResultBtn: true
      };
    });
  };

  onChangeStars = e => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const hotelData = this.props.data.hotels.data;
    this.setState(prevState => {
      return {
        stars: prevState.stars.set(item, isChecked)
      };
    });

    this.setState(prevState => {
      let array = [];
      // return an array of hotels that do not contain the given number of stars that are unchecked
      if (!isChecked) {
        array = prevState.hotelData.filter(
          hotel => hotel.hotel.rating !== item
        );
        this.checkedStars = this.checkedStars.filter(i => {
          console.log(item, i);
          return item != i;
        });
        console.log(this.checkedStars);
      }

      // return an array of hotels that contains the checked number of stars
      if (isChecked) {
        let requiredArray = hotelData.filter(
          data =>
            this.priceList.includes(data.offers[0].price.total * 1) &&
            data.hotel.rating === item
        );

        this.checkedStars.push(item);

        let newArray = prevState.hotelData.concat(requiredArray);

        console.log(newArray);

        // Remove duplicates
        const starMap = new Map();
        for (const item of newArray) {
          if (!starMap.has(item.hotel.name)) {
            starMap.set(item.hotel.name, true); // set any value to Map
            array.push({
              ...item
            });
          }
        }
      }
      return {
        hotelData: array,
        showAllResultBtn: true
      };
    });
  };

  handleShowAll = () => {
    this.setState({
      hotelData: this.props.data.hotels.data,
      showAllResultBtn: false
    });
  };

  render() {
    return (
      <Row>
        <Col lg={12}>
          <HotelResultHeading userInfo={this.state.userInfo} />
        </Col>
        <Col lg={3}>
          <FilterHotels
            hotelData={this.state.hotelData}
            stars={this.state.stars}
            onChangeStars={this.onChangeStars}
            onChangePrice={this.onChangePrice}
          />
        </Col>
        <Col lg={9}>
          {/* Show a button to display all result only if the data has been filtered or sorted */}
          {this.state.showAllResultBtn ? (
            <div className="ml-auto">
              <Button onClick={this.handleShowAll}>Show All Results</Button>
            </div>
          ) : (
            ""
          )}

          <HotelResultList
            hotelData={this.state.hotelData}
            userInfo={this.state.userInfo}
          />
        </Col>
      </Row>
    );
  }
}

export default HotelResult;
