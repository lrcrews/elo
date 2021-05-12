import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as Either from "fp-ts/lib/Either";
import * as _ from "lodash";
import { Subscription } from "rxjs";

import { computeDiffs, orderedGuilds } from "../../utils/elo-data-helper";
import { loadData } from "../../utils/herowars-elo-api";

import { ELO_FILE_PATHS, GuildsContext, HistoricEloContext } from "../../data";
import { Guilds } from "../../models";
import { GuildInfoLarge } from "../../shared-components";

import "./Guild.scss";

export default function GuildScreen() {
  const { historicElo, setHistoricElo } = useContext(HistoricEloContext);
  const { guilds, setGuilds } = useContext(GuildsContext);
  const { id } = useParams<Record<string, string | undefined>>();

  const [guild, setGuild] = useState(
    _.find(guilds, (testGuild) => testGuild.ID === id)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: Subscription;

    // We may want to break this out one day so that instead of loading everything
    // here we load X days worth and have a "load more" action on the page.
    if (loading) {
      const currentEloData = _.clone(historicElo);
      const daysLoaded = _.isEmpty(currentEloData) ? 0 : historicElo.length;
      const daysToLoad =
        daysLoaded === 0
          ? ELO_FILE_PATHS.length
          : ELO_FILE_PATHS.length - daysLoaded;

      if (daysToLoad > 0) {
        console.log("loading additional data");
        subscription = loadData(daysToLoad, daysLoaded).subscribe((results) => {
          const eloRatingsByDay: Array<Guilds> = [];
          _.each(results, (result, index) => {
            const data = result.data;
            const decodedGuilds = Guilds.decode(data);
            if (Either.isRight(decodedGuilds)) {
              eloRatingsByDay.push(orderedGuilds(decodedGuilds.right));
            } else {
              console.log(`decode error on url index: ${index}`);
            }
          });
          const totalElo = _.union(currentEloData, eloRatingsByDay);
          if (daysLoaded === 0 && totalElo.length > 1) {
            // In this scenario the User came directly to this page, so we
            // want to set the Guilds context too.
            _.each(totalElo[0], (guild, index) => {
              guild.RANK = index + 1;
              const { rankingChange, ratingChange } = computeDiffs(
                guild,
                totalElo[1]
              );
              guild.RANKING_CHANGE = rankingChange;
              guild.RATING_CHANGE = ratingChange;
            });
            setGuilds(totalElo[0]);
            setGuild(_.find(totalElo[0], (testGuild) => testGuild.ID === id));
          }
          setHistoricElo(totalElo);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, [historicElo, id, loading, setGuilds, setHistoricElo]);

  return (
    <section id="guild-screen">
      {guild && <GuildInfoLarge guild={guild} />}
      <h3>Elod Days Loaded: {historicElo.length}</h3>
    </section>
  );
}
