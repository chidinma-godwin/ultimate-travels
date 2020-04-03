import React from "react";
import { Query } from "react-apollo";
import { Spinner } from "react-bootstrap";

import { getToursFromDatabase } from "../queries/tour";
import TourTable from "../components/admin/TourTable";
import HolidayPackages from "../components/home/homeSubs/tour/HolidayPackages";

// TODO: Authorization to determine the component that will be showed depending on the user role
export default class TourQuery extends React.Component {
  constructor() {
    super();
    this.state = {
      isAdmin: false
    };
  }
  render() {
    const { isAdmin } = this.state;
    return (
      <Query query={getToursFromDatabase}>
        {({ loading, error, data }) => {
          if (loading) {
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
          }
          if (error) {
            console.log(error);
            return (
              <div className="query_status">
                Sorry, we are currently unable to show available tours. Please
                try again.
              </div>
            );
          }

          console.log(data);

          const tours = data.getDatabaseTours;
          if (!tours.length)
            return (
              <div className="query_status">
                There are currently no tours displayed on the home page.
              </div>
            );

          if (isAdmin) return <TourTable tours={tours} />;
          return <HolidayPackages tours={tours} />;
        }}
      </Query>
    );
  }
}
