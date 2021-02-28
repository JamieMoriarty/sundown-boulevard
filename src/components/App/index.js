import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Steps from "../../modules/Steps/index";

import NavBar from "../NavBar";
import HomeView from "../Home";
import DishScreen from "../Dish";
import DrinksScreen from "../Drinks";
import OrderScreen from "../Order/index";

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
                <Steps>
                  <DishScreen />
                  <DrinksScreen />
                  <OrderScreen />
                </Steps>
              </Route>
              {/*<Route path="/drinks">
                
              </Route>
              <Route path="/ret">
                
              </Route>*/}
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
