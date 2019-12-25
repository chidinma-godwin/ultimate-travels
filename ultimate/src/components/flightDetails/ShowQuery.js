import React from "react";
import { Container } from "react-bootstrap";
import { Query } from "react-apollo";
import { getSessionKey } from "../../queries/queries";

class ShowQuery extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let { userData } = this.props.location.state;
    console.log(userData);

    return (
        <Query
          query={getSessionKey}
          variables={{
            cabinClass: userData.cabin,
            children: userData.children.toString(),
            infants: userData.infants.toString(),
            country: "NG",
            currency: "NGN",
            locale: "en-GB",
            originPlace: userData.fromSelectedOption[0].CityId,
            destinationPlace: userData.toSelectedOption[0].CityId,
            outboundDate: userData.date.toISOString().split('T')[0],
            inboundDate: "2020-1-30",
            adults: userData.adults.toString()
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return "loading data";
            if (error) {
              console.log(error);
              return "Please fill the flight form";
            }
            console.log(data);

            return <Container>"It worked"</Container>;
          }}
        </Query>
    );
  }
}

export default ShowQuery;
