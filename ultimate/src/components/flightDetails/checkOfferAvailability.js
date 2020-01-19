import React from "react";
import { Query } from "react-apollo";
import { ProgressBar } from "react-bootstrap";
import { checkOfferQuery } from "../../queries/queries";
import OfferAvailabilityResult from "./OfferAvailabilityResult";

class checkOfferAvailability extends React.Component {
  constructor(props) {
    super(props);
    const { queryVariable } = this.props.location.state;
    this.state = {
      queryVariable
    };
  }

  render() {
    return (
      <Query
        query={checkOfferQuery}
        variables={{ input: this.state.queryVariable }}
      >
        {({ error, loading, data }) => {
          if (loading) return <ProgressBar now={25} />;
          if (error) {
            console.log(error);
            return "Please reload the page";
          }

          console.log(data);

          return <OfferAvailabilityResult data={data} />;
        }}
      </Query>
    );
  }
}

export default checkOfferAvailability;
