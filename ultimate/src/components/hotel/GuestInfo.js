import React from "react";

const GuestInfo = props => {
  const { offerId } = props.location.state;
  return <React.Fragment>{offerId}</React.Fragment>;
};

export default GuestInfo;
