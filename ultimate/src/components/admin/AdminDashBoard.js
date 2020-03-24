import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import AdminHeader from "./AdminHeader";
import SideBar from "./SideBar";
import TablesPage from "./TablesPage";
import TravelersQuery from "./TravelersQuery";
import ShowTour from "./ShowTour";
import TourDetailsQuery from "./TourDetailsQuery";

class AdminDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.handleHideHeader = this.props.handleHideHeader;
    this.handleHideFooter = this.props.handleHideFooter;
  }

  componentDidMount = () => {
    this.handleHideHeader(true);
    this.handleHideFooter(true);
  };

  componentWillUnmount = () => {
    this.props.handleHideHeader(false);
    this.props.handleHideFooter(false);
  };

  render() {
    let { url } = this.props.match;
    return (
      <React.Fragment>
        <AdminHeader />
        <div id="outer-container">
          <SideBar url={url} />
          <Container
            id="page-wrap"
            style={{
              transition: "all 0.5s ease 0s"
            }}
          >
            <Switch>
              <Route path={`${url}/`} exact component={TablesPage} />
              <Route path={`${url}/travelers`} component={TravelersQuery} />
              <Route
                path={`${url}/show-tour/:city1?/:city2?/:city3?/:city4?/:city5?/:city6?`}
                render={props => <ShowTour {...props} />}
              />
              <Route
                path={`${url}/search-tour:tourId1?/:tourId2?/:tourId3?/:tourId4?/:tourId5?/:tourId6?`}
                component={TourDetailsQuery}
              />
            </Switch>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
export default AdminDashBoard;
