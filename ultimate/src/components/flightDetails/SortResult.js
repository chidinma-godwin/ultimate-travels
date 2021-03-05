import React from "react";
import { Button, Card } from "react-bootstrap";
import { displayTime } from "../../utils";

function SortResult(props) {
  let {
    handleSortCheapest,
    handleSortFastest,
    handleFastestCardClick,
    handleCheapestCardClick,
    durationArray,
    priceArray,
    durationOfFastest,
    durationOfCheapest,
    currency,
  } = props;

  // Get the duration and price of the cheapest and fastest flight
  let lowestPrice = 0;
  let lestDuration = 0;
  for (let i = 1; i < durationArray.length; i++) {
    if (durationArray[i][0] < durationArray[lowestPrice][0]) lowestPrice = i;
    if (durationArray[i][1] < durationArray[lestDuration][1]) lestDuration = i;
  }

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          justifyContent: "space-between",
          marginBottom: "1.7em",
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
                paddingTop: "1em",
              }}
            >
              {durationArray.length > 0
                ? new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: currency,
                  }).format(
                    Number(
                      durationOfFastest.length
                        ? durationOfFastest[0]
                        : durationArray[lestDuration][0].toFixed(2)
                    )
                  )
                : null}
              {/* <span>&#8358;</span>
              {durationArray.length > 0
                ? Number(durationArray[lestDuration][0].toFixed(2))
                : ""} */}
            </div>
          </Card.Title>

          <Card.Body>
            {displayTime(
              durationOfFastest.length
                ? Math.round(durationOfFastest[1])
                : Math.round(Math.min(...durationArray.map((item) => item[1])))
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
                paddingTop: "1em",
              }}
            >
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: currency,
              }).format(
                durationOfCheapest.length
                  ? durationOfCheapest[0]
                  : Math.min(...priceArray)
              )}
              {/* <span>&#8358;</span>

              {Math.min(...priceArray)} */}
            </div>
          </Card.Title>

          <Card.Body>
            {durationArray.length > 0
              ? displayTime(
                  Math.floor(
                    durationOfCheapest.length
                      ? durationOfCheapest[1]
                      : durationArray[lowestPrice][1]
                  )
                )
              : ""}
          </Card.Body>
        </Card>
      </div>

      <div
        style={{
          width: "fit-content",
          marginLeft: "auto",
          marginBottom: "1.5em",
          display: "flex",
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
