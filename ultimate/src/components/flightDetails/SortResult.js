import React from "react";
import { Button, Card } from "react-bootstrap";

function SortResult(props) {
  let {
    handleSortCheapest,
    handleSortFastest,
    handleFastestCardClick,
    handleCheapestCardClick,
    durationList,
    priceList,
    displayTime
  } = props;

  // Get the duration and price of the cheapest and fastest flight
  let lowestPrice = 0;
  let lestDuration = 0;
  for (let i = 1; i < durationList.length; i++) {
    if (durationList[i][0] < durationList[lowestPrice][0]) lowestPrice = i;
    if (durationList[i][1] < durationList[lestDuration][1]) lestDuration = i;
  }

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: "1.7em"
        }}
      >
        <Card style={{ width: "45%" }} onClick={() => handleFastestCardClick()}>
          <Card.Header className="filter_flight">Fastest</Card.Header>

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
              {durationList.length > 0 ? durationList[lestDuration][0] : ""}
            </div>
          </Card.Title>

          <Card.Body>
            {displayTime(
              Math.round(Math.min(...durationList.map(item => item[1])))
            )}
          </Card.Body>
        </Card>

        <Card
          style={{ width: "45%" }}
          onClick={() => handleCheapestCardClick()}
        >
          <Card.Header className="filter_flight">Cheapest</Card.Header>

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
            {durationList.length > 0
              ? displayTime(Math.floor(durationList[lowestPrice][1]))
              : ""}
          </Card.Body>
        </Card>
      </div>

      <div
        style={{
          width: "fit-content",
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
    </React.Fragment>
  );
}

export default SortResult;
