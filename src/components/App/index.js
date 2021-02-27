import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "../NavBar";
import HomeView from "../Home";

import "./App.scss";
import DishScreen from "../Dish";
import DrinksScreen from "../Drinks";
import OrderScreen from "../Order/index";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
          <main>
            <Switch>
              <Route path="/order">
                <OrderScreen />
              </Route>
              <Route path="/drinks">
                <DrinksScreen />
              </Route>
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
