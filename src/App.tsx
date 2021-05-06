import React, { useEffect, useState } from "react";

import * as _ from "lodash";

import logo from "./logo.svg";
import "./App.css";
import { loadRatedGuilds } from "./utils/herowars-elo-api";

function App() {
  const [guilds, setGuilds] = useState([]);

  useEffect(() => {
    loadRatedGuilds().then((data) => {
      _.each(data, (guild) => console.log(JSON.stringify(guild)));
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
