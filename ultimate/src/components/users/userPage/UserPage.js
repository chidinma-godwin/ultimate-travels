import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import UserHeader from "./UserHeader";
import SideBar from "../SideBar";
import TablesPage from "../../admin/TablesPage";
import TravelersQuery from "../../admin/TravelersQuery";
import ShowTour from "../../admin/ShowTour";
import TourDetailsQuery from "../../admin/TourDetailsQuery";
import Dashboard from "./Dashboard";

class UserPage extends React.Component {
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
    const { username } = this.props.match.params;
    return (
      <React.Fragment>
        <UserHeader username={username} />
        <div id="outer-container">
          <SideBar username={username} url={url} />
          <Container
            id="page-wrap"
            style={{
              transition: "all 0.5s ease 0s",
            }}
          >
            <Switch>
              <Route path={`${url}/`} exact component={TablesPage} />
              <Route path={`${url}/dashboard`} component={Dashboard} />
              <Route
                path={`${url}/admin/travelers`}
                component={TravelersQuery}
              />
              <Route
                path={`${url}/admin/show-tour/:city1?/:city2?/:city3?/:city4?/:city5?/:city6?`}
                render={(props) => <ShowTour {...props} />}
              />
              <Route
                path={`${url}/admin/search-tour:tourId1?/:tourId2?/:tourId3?/:tourId4?/:tourId5?/:tourId6?`}
                component={TourDetailsQuery}
              />
            </Switch>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}
export default UserPage;
