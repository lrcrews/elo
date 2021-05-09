import React, { useContext } from "react";
import { Link } from "react-router-dom";

import * as _ from "lodash";

import { HistoricEloContext } from "../../data";

import "./Home.scss";

export default function HomeScreen() {
  const { historicElo } = useContext(HistoricEloContext);

  return (
    <header className="App-header">
      {/* {loading && <img src={logo} className="App-logo" alt="logo" />}
      {!loading && ( */}
      <ul>
        {_.map(historicElo[0], (elo) => {
          return <li key={elo.ID}>{elo.NAME}</li>;
        })}
      </ul>
      {/* )} */}
      <Link to="/pending-results">pending</Link>
    </header>
  );
}
