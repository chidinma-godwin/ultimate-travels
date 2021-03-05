import React from "react";
import { Card } from "react-bootstrap";

function SelectedFlightInfo(props) {
  const { userInfo, flightOffer } = props;

  // Get the number of adults, children and infants
  let countAdult = 0;
  let countChildren = 0;
  let countInfant = 0;
  flightOffer[0].travelerPricings.map((traveler) => {
    if (traveler.travelerType === "ADULT") countAdult += 1;
    if (traveler.travelerType === "CHILD") countChildren += 1;
    if (traveler.travelerType === "HELD_INFANT") countInfant += 1;
    return `Adults: ${countAdult}, Children: ${countChildren}, Infants: ${countInfant}`;
  });

  // Get a unique flightOffer array which contains one object for adults, children, and infants each
  const unique = flightOffer[0].travelerPricings.reduce(
    (accumulator, traveler) =>
      accumulator.concat(
        accumulator.find(
          (travelerObj) => travelerObj.travelerType === traveler.travelerType
        )
          ? []
          : [traveler]
      ),
    []
  );

  const uniqueTravelerPricings = flightOffer.map((flight) =>
    flight.travelerPricings.reduce(
      (accumulator, traveler) =>
        accumulator.concat(
          accumulator.find(
            (travelerObj) => travelerObj.travelerType === traveler.travelerType
          )
            ? []
            : [traveler]
        ),
      []
    )
  );

  return (
    <Card>
      <Card.Header
        style={{
          fontSize: "1.5em",
          backgroundColor: "#f68220",
          color: "white",
        }}
      >
        Selected Flight
      </Card.Header>

      <Card.Body className="mb-3 p-3">
        <Card.Title>
          {`${userInfo.from[0][1].address.cityName} to ${
            userInfo.to[userInfo.to.length - 1][1].address.cityName
          } - Round Trip`}
          <hr />
        </Card.Title>
        {uniqueTravelerPricings[0].map((traveler, index) => {
          // Check if the passenger is an infant and put the name in the right format
          if (traveler.travelerType === "HELD_INFANT")
            traveler.travelerType = traveler.travelerType.split("_")[1];

          // Get the base flight price
          let basePrice = uniqueTravelerPricings.reduce(
            (total, trip) => total + Number(trip[index].price.base),
            0
          );

          // Get the total flight price
          let totalPrice = uniqueTravelerPricings.reduce(
            (total, trip) => total + Number(trip[index].price.total),
            0
          );

          // Get the total tax and other fees
          let taxAndFees = totalPrice - basePrice;

          // Get the refundable taxes
          let refundableTaxes = uniqueTravelerPricings.reduce(
            (total, trip) => total + Number(trip[index].price.refundableTaxes),
            0
          );

          // Get the currency
          let currency = traveler.price.currency;

          return (
            <div key={traveler.travelerId}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1em",
                }}
              >
                <span>{` Price per ${traveler.travelerType.toLowerCase()}`}</span>
                <span>
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: currency,
                  }).format(Number(basePrice.toFixed(2)))}
                </span>
                {/* <span>{traveler.price.base}</span> */}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1em",
                }}
              >
                <span>{`Taxes and fees per ${traveler.travelerType.toLowerCase()}`}</span>
                <span>
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: currency,
                  }).format(Number(taxAndFees.toFixed(2)))}
                </span>
              </div>

              {traveler.price.refundableTaxes !== undefined ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1em",
                  }}
                >
                  <span>{`Refundable taxes per ${traveler.travelerType.toLowerCase()}`}</span>
                  <span>
                    {new Intl.NumberFormat("en-NG", {
                      style: "currency",
                      currency: currency,
                    }).format(Number(refundableTaxes.toFixed(2)))}
                  </span>
                </div>
              ) : null}
              <hr />
            </div>
          );
        })}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
          }}
        >
          <span>Total Price</span>
          <span>
            {new Intl.NumberFormat("en-NG", {
              style: "currency",
              currency: uniqueTravelerPricings[0][0].price.currency,
            }).format(
              flightOffer.reduce(
                (total, flightPrice) =>
                  total + flightPrice.price.grandTotal * 1,
                0
              )
            )}
          </span>
        </div>

        <hr />
        {flightOffer.map((trip) =>
          trip.itineraries.map((itinerary) => {
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
          })
        )}

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
