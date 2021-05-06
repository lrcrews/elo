import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import * as _ from "lodash";

import { routes, RouteWithSubRoutes } from "./routes";
import { loadRatedGuilds } from "./utils/herowars-elo-api";

function App() {
  const [guilds, setGuilds] = useState([]);

  useEffect(() => {
    loadRatedGuilds().then((data) => {
      _.each(data, (guild) => console.log(JSON.stringify(guild)));
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
