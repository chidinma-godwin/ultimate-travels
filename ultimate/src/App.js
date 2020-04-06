import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
//import { ApolloLink, Observable } from 'apollo-link';
import Header from "./components/Header";
import Home from "./components/home/Home";
import Footer from "./components/Footer";
import TourDetails from "./components/home/homeSubs/tour/TourDetails";
import FlightQuery from "./components/flightDetails/FlightQuery";
import checkOfferAvailability from "./components/flightDetails/checkOfferAvailability";
import VisaForm from "./components/visa/VisaForm";
import HotelQuery from "./components/hotel/HotelQuery";
import AdminDashBoard from "./components/admin/AdminDashBoard";
import ShowMore from "./components/hotel/ShowMore";
import GuestInfo from "./components/hotel/GuestInfo";
import NetplusPayment from "./components/NetplusPayment";
import Login from "./components/users/Login";

const uploadLink = createUploadLink({
  uri: "/graphql",
  //includeExtensions: true
});

const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: "NGN",
      hideFooter: false,
      hideHeader: false,
    };
  }

  handleCurrencyToggle = (selected) => {
    console.log(selected);
    this.setState({ currency: selected });
  };

  handleHideFooter = (choice) => {
    this.setState({
      hideFooter: choice,
    });
  };

  handleHideHeader = (choice) => {
    this.setState({
      hideHeader: choice,
    });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          {this.state.hideHeader ? null : (
            <Header
              handleCurrencyToggle={this.handleCurrencyToggle}
              currency={this.state.currency}
            />
          )}

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home {...props} currency={this.state.currency} />
              )}
            />
            <Route path="/tourDetails/:slug" component={TourDetails} />
            <Route path="/login" component={Login} />
            <Route
              path="/flightDetails"
              render={(props) => (
                <FlightQuery {...props} currency={this.state.currency} />
              )}
            />
            <Route
              path="/checkOfferAvailability"
              component={checkOfferAvailability}
            />
            <Route
              path="/visaApplicationForm"
              render={(props) => (
                <VisaForm {...props} handleHideFooter={this.handleHideFooter} />
              )}
            />

            <Route
              path="/hotels"
              render={(props) => (
                <HotelQuery {...props} currency={this.state.currency} />
              )}
            />

            <Route
              path="/admin"
              render={(props) => (
                <AdminDashBoard
                  {...props}
                  handleHideHeader={this.handleHideHeader}
                  handleHideFooter={this.handleHideFooter}
                />
              )}
            />
            <Route path="/showMore" component={ShowMore} />
            <Route path="/guestInfo" component={GuestInfo} />
            <Route path="/netplusPayment" component={NetplusPayment} />
          </Switch>
          <br />
          <br />
          {this.state.hideFooter ? null : <Footer />}
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
