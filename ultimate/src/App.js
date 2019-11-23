import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/home/Home';
import Footer from './components/Footer';
import saudi from './images/ritadh-saudi.jpg';
import oman from './images/oman.jpg';
import bahrain from './images/bahrain.jpg';
import qatar from './images/doha-qatar.jpg';
import kuvajt from './images/kuvajt.jpg';
import beirut from './images/beirut-lebanon.jpg';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      deals: [
        {
          src: {saudi}, title: "Saudi", text: "Some quick example text to build on the card title and make up" +
          "the bulk of the card's content. Some quick example text to build on the card title and make up the" +
          "bulk of the card's content.", city: "saudi"
        },
        {
          src: {oman}, title: "oman", text: "Some quick example text to build on the card title and make up" +
          "the bulk of the card's content. Some quick example text to build on the card title and make up the" +
          "bulk of the card's content.", city: "oman"
        },
        {
          src: {bahrain}, title: "bahrain", text: "Some quick example text to build on the card title and make up" +
          "the bulk of the card's content. Some quick example text to build on the card title and make up the" +
          "bulk of the card's content.", city: "bahrain"
        },
        {
          src: {beirut}, title: "Dubai", text: "Some quick example text to build on the card title and make up" +
          "the bulk of the card's content. Some quick example text to build on the card title and make up the" +
          "bulk of the card's content.", city: "beirut"
        },
        {
          src: {kuvajt}, title: "Kuvayt", text: "Some quick example text to build on the card title and make up" +
          "the bulk of the card's content. Some quick example text to build on the card title and make up the" +
          "bulk of the card's content.", city: "kuvajt"
        },
        {
          src: {qatar}, title: "Qatar", text: "Some quick example text to build on the card title and make up" +
            "the bulk of the card's content. Some quick example text to build on the card title and make up the" +
            "bulk of the card's content.", city: "qatar"
        },

      ]
        }
  }
  render() {
    return (
      <Router>
        <Header />

        <Switch>
    <Route exact path='/' render={(props)=> <Home {...props} deals={this.state.deals}/>} />
        </Switch>
        <br />
        <br />
        <Footer />
      </Router>
    );
  }
}

export default App;
