import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import * as Either from "fp-ts/lib/Either";
import * as _ from "lodash";

import { computeDiffs, orderedGuilds } from "./utils/elo-data-helper";
import { loadBaseData } from "./utils/herowars-elo-api";

import { GuildsProvider, HistoricEloProvider } from "./data";
import { Guilds } from "./models";
import { routes, RouteWithSubRoutes } from "./routes";
import { SiteFooter, SiteHeader } from "./shared-components";

import logo from "./elo-logo.png";

import "./App.scss";

function App() {
  const [guilds, setGuilds] = useState<Guilds>([]);
  const [historicElo, setHistoricElo] = useState<Array<Guilds>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = loadBaseData().subscribe((results) => {
      const eloRatingsByWeek: Array<Guilds> = [];
      _.each(results, (result, index) => {
        const data = result.data;
        const decodedGuilds = Guilds.decode(data);
        if (Either.isRight(decodedGuilds)) {
          eloRatingsByWeek.push(orderedGuilds(decodedGuilds.right));
        } else {
          console.log(`decode error on url index: ${index}`);
        }
      });
      setHistoricElo(eloRatingsByWeek);
      if (eloRatingsByWeek.length > 1) {
        // No "decode error"?!?, let's compute some diffs 🎉
        _.each(eloRatingsByWeek[0], (guild, index) => {
          guild.RANK = index + 1;
          const { rankingChange, ratingChange } = computeDiffs(
            guild,
            eloRatingsByWeek[1]
          );
          guild.RANKING_CHANGE = rankingChange;
          guild.RATING_CHANGE = ratingChange;
        });
      }
      setGuilds(eloRatingsByWeek[0]);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <Router>
        <div id="elo-app">
          <SiteHeader />
          <section id="main-content-container">
            <img src={logo} className="loading-image" alt="loading data" />
          </section>
          <SiteFooter />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div id="elo-app">
        <SiteHeader />
        <section id="main-content-container">
          <GuildsProvider guilds={guilds}>
            <HistoricEloProvider historicElo={historicElo}>
              <Switch>
                {routes.map((route, i) => (
                  <RouteWithSubRoutes key={i} {...route} />
                ))}
              </Switch>
            </HistoricEloProvider>
          </GuildsProvider>
        </section>
        <SiteFooter />
      </div>
    </Router>
  );
}

export default App;
