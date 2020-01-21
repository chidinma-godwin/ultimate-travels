import React from "react";
import { Card } from "react-bootstrap";

function SelectedFlightInfo(props) {
  const { userInfo, flightOffer } = props;

  // Get the number of adults, children and infants
  let countAdult = 1;
  let countChildren = 0;
  let countInfant = 0;
  flightOffer.travelerPricings.map(traveler => {
    if (traveler.travelerType === "ADULT") countAdult += 1;
    if (traveler.travelerType === "CHILD") countChildren += 1;
    if (traveler.travelerType === "HELD_INFANT") countInfant += 1;
    return `Adults: ${countAdult}, Children: ${countChildren}, Infants: ${countInfant}`;
  });

  // Get a unique flightOffer array which contains one object for adults, children, and infants each
  const uniqueTravelerPricings = flightOffer.travelerPricings.reduce(
    (accumulator, traveler) =>
      accumulator.concat(
        accumulator.find(
          travelerObj => travelerObj.travelerType === traveler.travelerType
        )
          ? []
          : [traveler]
      ),
    []
  );

  return (
    <Card>
      <Card.Header
        style={{
          fontSize: "1.5em",
          backgroundColor: "lightslategrey",
          color: "white"
        }}
      >
        Selected Flight
      </Card.Header>

      <Card.Title style={{ paddingLeft: "2em" }}>
        {`${userInfo.originCity} to ${userInfo.destinationCity} - Round Trip`}
        <hr />
      </Card.Title>

      <Card.Body style={{ paddingLeft: "2em" }}>
        {uniqueTravelerPricings.map(traveler => {
          // Check the passenger type and store the number of that particular type in a variable
          let numTravelerType = 0;
          if (traveler.travelerType === "ADULT") numTravelerType = countAdult;
          if (traveler.travelerType === "CHILD")
            numTravelerType = countChildren;
          if (traveler.travelerType === "HELD_INFANT")
            numTravelerType = countInfant;

          // Check if the passenger is an infant and put the name in the right format
          if (traveler.travelerType === "HELD_INFANT")
            traveler.travelerType = traveler.travelerType.split("_")[1];

          return (
            <div key={traveler.travelerId}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1em"
                }}
              >
                <span>
                  {traveler.travelerType} &times; {numTravelerType}
                </span>
                <span>{traveler.price.base * numTravelerType}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1em"
                }}
              >
                <span>{`${traveler.travelerType} TAXES AND FEES`}</span>
                <span>
                  {/* {traveler.price.taxes
                            .reduce((total, tax) => total + tax.amount * 1, 0)
                            .toFixed(2)} */}
                  {(
                    (traveler.price.total * 1 -
                      traveler.price.base * 1 +
                      flightOffer.price.fees.reduce(
                        (total, fee) => total + fee.amount * 1,
                        0
                      )) *
                    numTravelerType
                  ).toFixed(2)}
                </span>
              </div>

              {traveler.price.refundableTaxes ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1em"
                  }}
                >
                  <span>Refundable taxes</span>
                  <span>
                    {traveler.price.refundableTaxes * numTravelerType}
                  </span>
                </div>
              ) : (
                ""
              )}
              <hr />
            </div>
          );
        })}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold"
          }}
        >
          <span>Total Price</span>
          <span>{flightOffer.price.grandTotal}</span>
        </div>

        <hr />
        {flightOffer.itineraries.map(itinerary => {
          return (
            <div key={itinerary.segments[0].id}>
              {`${itinerary.segments[0].departure.iataCode} -
                        ${
                          itinerary.segments[itinerary.segments.length - 1]
                            .arrival.iataCode
                        }`}
              <hr />
            </div>
          );
        })}

        <hr />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="mr-2">Book Online</div>
          <div className="mr-2">Or</div>
          <div>Call +2348161128204, +2349026622600</div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SelectedFlightInfo;
