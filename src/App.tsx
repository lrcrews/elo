import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import * as Either from "fp-ts/lib/Either";
import * as _ from "lodash";

import { routes, RouteWithSubRoutes } from "./routes";
import { loadData } from "./utils/herowars-elo-api";
import { GuildsProvider, HistoricEloProvider } from "./data";
import { Guilds } from "./models";

import logo from "./screens/Home/logo.svg";

function App() {
  const [guilds, setGuilds] = useState<Guilds>([]);
  const [historicElo, setHistoricElo] = useState<Array<Guilds>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = loadData().subscribe((results) => {
      const eloRatingsByDay: Array<Guilds> = [];
      _.each(results, (result, index) => {
        const data = result.data;
        console.log(`result ${index} length: ${data.length}`);
        const decodedGuilds = Guilds.decode(data);
        if (Either.isRight(decodedGuilds)) {
          eloRatingsByDay.push(decodedGuilds.right);
        } else {
          console.log("decode error");
        }
      });
      setGuilds(eloRatingsByDay[0]);
      setHistoricElo(eloRatingsByDay);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <GuildsProvider guilds={guilds}>
          <HistoricEloProvider historicElo={historicElo}>
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>
          </HistoricEloProvider>
        </GuildsProvider>
      </div>
    </Router>
  );
}

export default App;
