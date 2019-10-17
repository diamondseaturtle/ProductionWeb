import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./components/Home";
import Portfolio from "./components/Portfolio";
import Miscellaneous from "./components/Miscellaneous";
import Message_Board from "./components/Message_Board";
//TODO Web Template Studio: Add routes for your new pages here.
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Redirect exact path = "/" to = "/Home" />
          <Route path = "/Home" component = { Home } />
          <Route path = "/Portfolio" component = { Portfolio } />
          <Route path = "/Miscellaneous" component = { Miscellaneous } />
          <Route path = "/Message_Board" component = { Message_Board } />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
