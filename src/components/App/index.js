import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "../NavBar";
import HomeView from "../Home";
import OrderFlow from "../OrderFlow";

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
          <main>
            <Switch>
              <Route path="/order">
                <OrderFlow />
              </Route>
              <Route path="/">
                <HomeView />
              </Route>
            </Switch>
          </main>
        </header>
      </div>
    </Router>
  );
}

export default App;
