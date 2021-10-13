import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./components/Home";
import Portfolio from "./components/Portfolio";
import Miscellaneous from "./components/Miscellaneous";
import Message_Board from "./components/Message_Board";
import COVID19 from "./components/COVID19";
import CONSTANTS from "./constants";
//TODO Web Template Studio: Add routes for your new pages here.

var siteCounter=0;
class App extends Component {
  componentDidMount() {
    fetch(CONSTANTS.ENDPOINT.VISITCOUNTER)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        siteCounter=data.counter;
        return data;
      })
      .then(result => this.setState({ gridTextAssets: result }))
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `Request to get grid text failed: ${error}`
        })
      );
  }

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
          <Route path = "/COVID19" component = { COVID19 } />
        </Switch>
        <Footer counter={siteCounter} />
      </React.Fragment>
    );
  }
}

export default App;
