import React from "react";
import { Container } from "react-bootstrap";
import { ApolloConsumer, Query } from "react-apollo";
import { getSessionKey } from "../../queries/queries";

class ShowQuery extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { userData } = this.props.location.state;
    console.log(userData);

    return (
      <ApolloConsumer>
        {client => (
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
              outboundDate: userData.date,
              adults: userData.adults.toString()
            }}
          >
            {({ loading, error, data }) => {
              if (loading) return "loading data";
              if (error) return "Please fill the flight form";

              client
                .query({
                  query: getSessionKey,
                  variables: {
                    cabinClass: userData.cabin,
                    children: userData.children.toString(),
                    infants: userData.infants.toString(),
                    country: "NG",
                    currency: "NGN",
                    locale: "en-GB",
                    originPlace: userData.fromSelectedOption[0].CityId,
                    destinationPlace: userData.toSelectedOption[0].CityId,
                    outboundDate: userData.date,
                    adults: userData.adults.toString()
                  }
                })
                .then(res => {
                  data = res;
                  console.log(res);
                 // console.log(data);
                })
                .catch(err => {
                  console.log(err);
                });

              return <Container>"It worked"</Container>;
            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}

export default ShowQuery;
