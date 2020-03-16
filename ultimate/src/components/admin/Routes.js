import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Travelers from "./TravelersQuery";
import ShowTour from "./ShowTour";
import TablesPage from "./TablesPage";

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/adminHome" exact component={TablesPage} />
          <Route path="/admin/travelers" component={Travelers} />
          <Route path="/admin/showTour" component={ShowTour} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
