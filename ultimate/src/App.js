import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from "react-apollo";
import { ApolloLink } from 'apollo-link';
import Header from "./components/Header";
import Home from "./components/home/Home";
import Footer from "./components/Footer";
import saudi from "./images/ritadh-saudi.jpg";
import oman from "./images/oman.jpg";
import bahrain from "./images/bahrain.jpg";
import qatar from "./images/doha-qatar.jpg";
import kuvajt from "./images/kuvajt.jpg";
import beirut from "./images/beirut-lebanon.jpg";
import ShowQuery from "./components/flightDetails/ShowQuery";

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext();
    const { response: { headers } } = context;

    if (headers) {
      console.log(headers);
      // const location = headers.get('location');
    }

    return response;
  });
});

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql"
})

const client = new ApolloClient({
  link: afterwareLink.concat(httpLink),
  cache: new InMemoryCache()
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
      ]
    };
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Header />

          <Switch>
            <Route
              exact
              path="/"
              render={props => <Home {...props} deals={this.state.deals} />}
            />
            <Route path="/flightDetails" component={ShowQuery} />
          </Switch>
          <br />
          <br />
          <Footer />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
