import React from "react";
import AdminHeader from "./AdminHeader";
import SideBar from "./SideBar";
import TablesPage from "./TablesPage";
import TravelersQuery from "./TravelersQuery";

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
    return (
      <React.Fragment>
        <AdminHeader />
        <div id="outer-container">
          <SideBar />
          <div
            id="page-wrap"
            style={{
              transition: "all 0.5s ease 0s"
            }}
          >
            <TravelersQuery />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default AdminDashBoard;
