import React from "react";
import { Button, Card } from "react-bootstrap";

class SortResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      handleSortCheapest,
      handleSortFastest,
      handleFastestCardClick,
      handleCheapestCardClick,
      displayTime,
      flightDetailsArray,
      durationList,
      priceList
    } = this.props;

    // Get the duration and price of the cheapest and fastest flight
    let lowestPrice = 0;
    let lestDuration = 0;
    for (var i = 1; i < flightDetailsArray.length; i++) {
      if (flightDetailsArray[i][0] < flightDetailsArray[lowestPrice][0])
        lowestPrice = i;
      if (flightDetailsArray[i][1] < flightDetailsArray[lestDuration][1])
        lestDuration = i;
    }

    return (
      <React.Fragment>
        <div
          style={{
            width: "50%",
            marginLeft: "auto",
            marginBottom: "1.5em",
            display: "flex"
          }}
        >
          <span
            className="mr-3"
            style={{ fontWeight: "bold", alignSelf: "center" }}
          >
            Sort By
          </span>
          <span className="mr-3">
            <Button className="sort-btn" onClick={() => handleSortCheapest()}>
              Cheapest
            </Button>
          </span>
          <span>
            <Button className="sort-btn" onClick={() => handleSortFastest()}>
              Fastest
            </Button>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            position: "relative",
            width: "100%",
            justifyContent: "space-around",
            marginBottom: "1.7em"
          }}
        >
          <Card
            style={{ width: "45%" }}
            onClick={() => handleFastestCardClick()}
          >
            <Card.Header style={{ fontWeight: "bolder" }}>Fastest</Card.Header>

            <Card.Title>
              <div
                style={{
                  color: "blue",
                  fontSize: "18px",
                  paddingLeft: "1em",
                  paddingTop: "1em"
                }}
              >
                <span>&#8358;</span>
                {/* {flightDetailsArray[lestDuration][0]} */}
              </div>
            </Card.Title>

            <Card.Body>
              {displayTime(Math.round(Math.min(...durationList)))}
            </Card.Body>
          </Card>

          <Card
            style={{ width: "45%" }}
            onClick={() => handleCheapestCardClick()}
          >
            <Card.Header style={{ fontWeight: "bolder" }}>Cheapest</Card.Header>

            <Card.Title>
              <div
                style={{
                  color: "blue",
                  fontSize: "18px",
                  paddingLeft: "1em",
                  paddingTop: "1em"
                }}
              >
                <span>&#8358;</span>

                {Math.min(...priceList)}
              </div>
            </Card.Title>

            <Card.Body>
              {displayTime(flightDetailsArray[lowestPrice][1])}
            </Card.Body>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default SortResult;
