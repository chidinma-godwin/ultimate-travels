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
import saudi from "./images/ritadh-saudi.jpg";
import oman from "./images/oman.jpg";
import bahrain from "./images/bahrain.jpg";
import qatar from "./images/doha-qatar.jpg";
import kuvajt from "./images/kuvajt.jpg";
import beirut from "./images/beirut-lebanon.jpg";
import FlightQuery from "./components/flightDetails/FlightQuery";
import checkOfferAvailability from "./components/flightDetails/checkOfferAvailability";
import VisaForm from "./components/visa/VisaForm";
import HotelQuery from "./components/hotel/HotelQuery";
import AdminPanel from "./components/admin/AdminPanel";
import ShowMore from "./components/hotel/ShowMore";
import GuestInfo from "./components/hotel/GuestInfo";
import NetplusPayment from "./components/NetplusPayment";

// const ForwardExtensionsLink = new ApolloLink((operation, forward) => {
//   return new Observable(observer => {
//     const sub = forward(operation).subscribe({
//       next: result => {
//         result.data.extensions = ()=>　result.extensions;
//         observer.next(result)
//         console.log(result);
//       },
//       complete: observer.complete.bind(observer),
//     })
//     return () => {
//       if (sub) sub.unsubscribe()
//     }
//   })
// });

const uploadLink = createUploadLink({
  uri: "http://localhost:5000/graphql"
  //includeExtensions: true
});

const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache({
    addTypename: false
  })
});

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      deals: [
        {
          src: { saudi },
          title: "Saudi",
          text:
            "Some quick example text to build on the card title and make up" +
            "the bulk of the card's content. Some quick example text to build on the card title and make up the" +
            "bulk of the card's content.",
          city: "saudi",
          id: 1
        },
        {
          src: { oman },
          title: "oman",
          text:
            "Some quick example text to build on the card title and make up" +
            "the bulk of the card's content. Some quick example text to build on the card title and make up the" +
            "bulk of the card's content.",
          city: "oman",
          id: 2
        },
        {
          src: { bahrain },
          title: "bahrain",
          text:
            "Some quick example text to build on the card title and make up" +
            "the bulk of the card's content. Some quick example text to build on the card title and make up the" +
            "bulk of the card's content.",
          city: "bahrain",
          id: 3
        },
        {
          src: { beirut },
          title: "Dubai",
          text:
            "Some quick example text to build on the card title and make up" +
            "the bulk of the card's content. Some quick example text to build on the card title and make up the" +
            "bulk of the card's content.",
          city: "beirut",
          id: 4
        },
        {
          src: { kuvajt },
          title: "Kuvayt",
          text:
            "Some quick example text to build on the card title and make up" +
            "the bulk of the card's content. Some quick example text to build on the card title and make up the" +
            "bulk of the card's content.",
          city: "kuvajt",
          id: 5
        },
        {
          src: { qatar },
          title: "Qatar",
          text:
            "Some quick example text to build on the card title and make up" +
            "the bulk of the card's content. Some quick example text to build on the card title and make up the" +
            "bulk of the card's content.",
          city: "qatar",
          id: 6
        }
      ],
      currency: "USD",
      hideFooter: false
    };
  }

  handleCurrencyToggle = selected => {
    console.log(selected);
    this.setState({ currency: selected });
  };

  handleHideFooter = choice => {
    this.setState({
      hideFooter: choice
    });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Header
            handleCurrencyToggle={this.handleCurrencyToggle}
            currency={this.state.currency}
          />

          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  deals={this.state.deals}
                  currency={this.state.currency}
                />
              )}
            />
            <Route
              path="/flightDetails"
              render={props => (
                <FlightQuery {...props} currency={this.state.currency} />
              )}
            />
            <Route
              path="/checkOfferAvailability"
              component={checkOfferAvailability}
            />
            <Route
              path="/visaApplicationForm"
              render={props => (
                <VisaForm {...props} handleHideFooter={this.handleHideFooter} />
              )}
            />

            <Route
              path="/hotels"
              render={props => (
                <HotelQuery {...props} currency={this.state.currency} />
              )}
            />

            <Route path="/admin" component={AdminPanel} />
            <Route path="/showMore" component={ShowMore} />
            <Route path="/guestInfo" component={GuestInfo} />
            <Route path="/netplusPayment" component={NetplusPayment} />
          </Switch>
          <br />
          <br />
          {this.state.hideFooter ? "" : <Footer />}
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
