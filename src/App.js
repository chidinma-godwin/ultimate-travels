import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/home/Home';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/contact' component={Footer}></Route>
      </Switch>
      
    </Router>
  );
}

export default App;
