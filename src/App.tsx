import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import * as Either from "fp-ts/lib/Either";
import * as _ from "lodash";

import { routes, RouteWithSubRoutes } from "./routes";
import { loadData } from "./utils/herowars-elo-api";
import { GuildsProvider, HistoricEloProvider } from "./data";
import { Guilds } from "./models";

import logo from "./screens/Home/logo.svg";
import { computeDiffs, orderedGuilds } from "./utils/elo-data-helper";

const HISTORIC_ELO_DAYS_TO_LOAD = 2;

function App() {
  const [guilds, setGuilds] = useState<Guilds>([]);
  const [historicElo, setHistoricElo] = useState<Array<Guilds>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = loadData(HISTORIC_ELO_DAYS_TO_LOAD).subscribe(
      (results) => {
        const eloRatingsByDay: Array<Guilds> = [];
        _.each(results, (result, index) => {
          const data = result.data;
          const decodedGuilds = Guilds.decode(data);
          if (Either.isRight(decodedGuilds)) {
            eloRatingsByDay.push(orderedGuilds(decodedGuilds.right));
          } else {
            console.log("decode error");
          }
        });
        setHistoricElo(eloRatingsByDay);
        if (eloRatingsByDay.length === 2) {
          // No "decode error"?!?, let's compute some diffs 🎉
          _.each(eloRatingsByDay[0], (guild, index) => {
            guild.RANK = index + 1;
            const { rankingChange, ratingChange } = computeDiffs(
              guild,
              eloRatingsByDay[1]
            );
            guild.RANKING_CHANGE = rankingChange;
            guild.RATING_CHANGE = ratingChange;
          });
        }
        setGuilds(eloRatingsByDay[0]);
        setLoading(false);
      }
    );

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
