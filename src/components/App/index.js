import React from "react";

import NavBar from "../NavBar";
import HomeView from "../Home";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <main>
          <HomeView />
        </main>
      </header>
    </div>
  );
}

export default App;
