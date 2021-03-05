// Function to put all flight prices in an array
const getPrices = (tripData) => {
  let priceArray = [];
  let resizedTripData = resizeData(tripData);

  resizedTripData[0].forEach((trip, index) => {
    let total = 0;
    for (let i = 0; i < tripData.length; i++) {
      total += tripData[i][index].price.total * 1;
    }
    priceArray.push(Number(total.toFixed(2)));
  });

  resizedTripData.map((trip) =>
    trip.map((flight, index) => (flight.accumulatedPrice = priceArray[index]))
  );
  return priceArray;
};

// Function to put average duration of outbound and inbound flight in an array
const getDuration = (tripData) => {
  let durationArray = [];
  tripData.map((trip) =>
    trip.map((flight) => {
      // map through the itineraries to get the duration in two decimal places
      let time = flight.itineraries.map((itinerary) => {
        let timeArray = itinerary.duration.slice(2, -1).split("H");
        // If there is no minute set the minute to 0
        if (timeArray.length === 1) timeArray.push(0);

        // convert the time to numbers then to minutes
        let mins = timeArray[0] * 60 + timeArray[1] * 1;
        itinerary.durationMins = mins;
        return mins;
      });

      // get the average duration from each flight
      let sumDuration = time.reduce((total, each) => total + each, 0);
      let averageDuration = sumDuration / time.length;

      // add the average duration to the flight data array
      flight.averageDuration = averageDuration;

      // return an array containing the average durations and its corresponding price
      return averageDuration;
      // return durationArray.push([price, averageDuration]);
    })
  );
  let totalAvgDuration = 0;
  let totalPrice = 0;
  tripData[0].forEach((trip, index) => {
    totalAvgDuration = trip.averageDuration;
    totalPrice = trip.price.total * 1;
    for (let i = 1; i < tripData.length; i++) {
      totalAvgDuration += tripData[i][index].averageDuration;
      totalPrice += tripData[i][index].price.total * 1;
    }
    durationArray.push([totalPrice, totalAvgDuration]);
  });
  return durationArray;
};

const mergeData = (prevData, newData) => {
  // Join the data
  let newArrayChecked = prevData.map(
    (trip) => [].concat(...resizeData(newData)).concat(trip)
    // trip.concat(...resizeData(newData))
  );

  // Remove duplicates
  let uniqueArrayChecked = newArrayChecked.map((checkedArray) => {
    return Array.from(
      new Set(checkedArray.map((flight) => flight.id))
    ).map((id) => checkedArray.find((flight) => flight.id === id));
  });
  return uniqueArrayChecked;
};

const resizeData = (data) => {
  let minLength = Math.min(...data.map((trip) => trip.length));
  let sameSizeData = data.map((trip) => {
    // trip.length = trip.length > minLength ? minLength : trip.length;
    const newTrip = trip.slice(0, minLength);
    // trip.length > minLength
    //   ? (trip.length = minLength)
    //   : (trip.length = trip.length);
    return newTrip;
  });
  return sameSizeData;
};

const formatData = (propsData) =>
  propsData
    .map((tripData) => tripData.flightDetails.data)
    .map((trip) =>
      trip.map((flight) => {
        // Declare variables for airlines and number of stops
        let stopList = [];
        let airlineList = [];
        let uniqueAirlinesList = [];

        flight.itineraries.forEach((itinerary) => {
          // Push airlines to the list declared above
          itinerary.segments.map((segment) =>
            airlineList.push(segment.carrierCode)
          );

          // Set number of stops greater than 2 to 3 for simplicity and push the nums to an array
          if (itinerary.segments.length > 2) itinerary.segments.length = 3;
          stopList.push(itinerary.segments.length);
        });

        // Add the unique airline list and computed number of stops to the data
        uniqueAirlinesList = [...new Set(airlineList)];
        flight.uniqueAirlinesList = uniqueAirlinesList;
        flight.numStops = stopList;

        return flight;
      })
    );

const displayTime = (number, format = "duration") => {
  let formattedNumber = 0;
  // To format to time make the highest hour 23, to format as
  // duration don't place any restraint on the hours
  if (format === "duration") {
    formattedNumber = number;
  } else {
    formattedNumber = number % 1440;
  }

  let hour = Math.floor(formattedNumber / 60);
  let min = formattedNumber % 60;
  let calcTime;
  if (format === "duration") {
    if (min < 10) {
      calcTime = `${hour}h 0${min}m`;
    } else {
      calcTime = `${hour}h ${min}m`;
    }
  } else {
    if (min < 10) {
      calcTime = `${hour}:0${min}`;
    } else {
      calcTime = `${hour}:${min}`;
    }
  }

  return calcTime;
};

export {
  getDuration,
  getPrices,
  mergeData,
  resizeData,
  formatData,
  displayTime,
};
