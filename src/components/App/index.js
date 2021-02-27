import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "../NavBar";
import HomeView from "../Home";

import "./App.scss";
import DishScreen from "../Dish";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
          <main>
            <Switch>
              <Route path="/ret">
                <DishScreen />
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
