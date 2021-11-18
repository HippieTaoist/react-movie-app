import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ReactMovie from "./components/react-movie/ReactMovie";
import MainMovie from "./components/main-movie/MainMovie";

import "./App.css";

require("dotenv").config();

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/abc" render={() => <h1> ABC PAGE </h1>} />
          <Route exact path="/fetch-movie/:imdbID" component={MainMovie} />{" "}
          <Route expect path="/" component={ReactMovie} />{" "}
        </Switch>{" "}
      </Router>{" "}
    </div>
  );
}

export default App;
