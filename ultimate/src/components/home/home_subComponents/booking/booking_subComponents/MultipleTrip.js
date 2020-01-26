import React from "react";
import { Map } from "immutable";

class MultipleTrip extends React.Component {
  constructor() {
    super();
    this.state = {
      from: new Map(),
      destination: new Map(),
      date: new Map([["outboundDate1", new Date()]]),
      cabin: "ECONOMY",
      adults: 1,
      infants: 0,
      children: 0,
      fromSelectedOption: [],
      toSelectedOption: [],
      redirect: null,
      oneway: false,
      roundtrip: true,
      multipletrip: false,
      tripCount: 1
    };
  }

  render() {
    return <Form></Form>;
  }
}

export default MultipleTrip;
