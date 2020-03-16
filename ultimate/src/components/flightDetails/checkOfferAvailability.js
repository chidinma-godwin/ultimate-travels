import React from "react";
import { Query } from "react-apollo";
import { Spinner } from "react-bootstrap";
import { adopt } from "react-adopt";
import { checkOfferQuery } from "../../queries/queries";
import OfferAvailabilityResult from "./OfferAvailabilityResult";

const checkOfferAvailability = props => {
  let { joinedQueryVariable, userInfo } = props.location.state;
  let queryObj = {};

  console.log(userInfo);
  console.log(joinedQueryVariable);
  joinedQueryVariable.map((queryVariable, index) => {
    let key = index;
    return (queryObj[key] = ({ render }) => (
      <Query query={checkOfferQuery} variables={{ input: queryVariable }}>
        {render}
      </Query>
    ));
  });

  console.log(queryObj);
  const Composed = adopt(queryObj);

  return (
    <Composed>
      {result => {
        let allData = [];
        for (let name in queryObj) {
          if (result[name].loading)
            return (
              <div className="query_status">
                <Spinner
                  animation="border"
                  size="lg"
                  variant="primary"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            );
          if (result[name].error) {
            console.log(result[name].error);
            return (
              <div className="query_status">
                Sorry, we are currently unable to check this flight
                availability. Please try again.
              </div>
            );
          }
          allData.push(result[name].data);
        }
        console.log(allData);

        if (allData.some(tripData => tripData.checkOffer === null)) {
          return (
            <div className="query_status">
              No Result Found, please try again
            </div>
          );
        }

        return <OfferAvailabilityResult data={allData} userInfo={userInfo} />;
      }}
    </Composed>
  );
};

export default checkOfferAvailability;
