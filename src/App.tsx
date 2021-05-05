import React, { useEffect, useState } from "react";

import * as Tabletop from "tabletop";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  // Needed to copy the actual spreadsheet so I could publish to web, so this
  // stuff isn't "live" yet.  Maybe exnor/tex adam can publish the main sheet.
  //
  // https://docs.google.com/spreadsheets/d/1GL02V9TNPYwf7gcRyMVkpH36GzxuGBHD24KE-6KXuoo/edit?usp=sharing

  useEffect(() => {
    Tabletop.init({
      key: "1GL02V9TNPYwf7gcRyMVkpH36GzxuGBHD24KE-6KXuoo",
    })
      .then((data: { [key: string]: any }) => {
        console.log(
          `data: ${Object.keys(data["Sorted by Name"]["prettyColumns"])}`
        );
        //setData(data);
      })
      .catch((err: string) => console.warn(err));
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
