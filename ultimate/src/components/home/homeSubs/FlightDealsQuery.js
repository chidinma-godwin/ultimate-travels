import React from "react";
import { Query } from "react-apollo";
import { Spinner } from "react-bootstrap";
import { getInspirationPlaces } from "../../../queries";
import TopFlightDeals from "./TopFlightDeals";
import ErrorBoundary from "../../ErrorBoundary";

class FlightDealsQuery extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      dealsPerpage: 6,
    };
  }

  showNextPage = () => {
    this.setState((prevState) => {
      return {
        currentPage: prevState.currentPage + 1,
      };
    });
  };

  showPreviousPage = () => {
    this.setState((prevState) => {
      return {
        currentPage: prevState.currentPage - 1,
      };
    });
  };

  render() {
    return (
      <Query
        query={getInspirationPlaces}
        variables={{
          origin: "LON",
          //   departureDate: String
          // viewBy: "COUNTRY",
        }}
      >
        {({ error, loading, data }) => {
          if (loading)
            return (
              <div
                className="flight_deal_status"
                style={{ backgroundColor: "transparent" }}
              >
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
          if (error) {
            return (
              <div className="flight_deal_status">
                Sorry, we're presently unable to show top flight deals. Please
                try again
              </div>
            );
          }

          let { currentPage, dealsPerpage } = this.state;
          const deals = data.flightInspiration
            ? data.flightInspiration.data
            : [];
          const pageNumbers = [];

          const indexOfLastDeal = currentPage * dealsPerpage;
          const indexOfFirstDeal = indexOfLastDeal - dealsPerpage;
          const currentDeals = deals.slice(indexOfFirstDeal, indexOfLastDeal);

          for (let i = 1; i <= Math.ceil(deals.length / dealsPerpage); i++) {
            pageNumbers.push(i);
          }

          // const emptyData = {};
          // emptyData.flightInspiration = {};
          // emptyData.flightInspiration.data = [];
          const emptyData = [];
          return data.flightInspiration ? (
            <ErrorBoundary>
              <TopFlightDeals
                data={data.flightInspiration ? currentDeals : emptyData}
                dictionaries={
                  data.flightInspiration
                    ? data.flightInspiration.dictionaries
                    : {}
                }
                meta={data.flightInspiration ? data.flightInspiration.meta : {}}
                showNextPage={this.showNextPage}
                showPreviousPage={this.showPreviousPage}
                pageNumbers={pageNumbers}
                currentPage={this.state.currentPage}
              />
            </ErrorBoundary>
          ) : (
            <div className="flight_deal_status">
              Sorry, we're presently unable to show top flight deals. Please
              reload the page
            </div>
          );
        }}
      </Query>
    );
  }
}

export default FlightDealsQuery;
