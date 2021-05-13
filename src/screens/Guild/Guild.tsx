import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as Either from "fp-ts/lib/Either";
import * as _ from "lodash";
import { Subscription } from "rxjs";

import {
  buildTimeSeriesEntries,
  computeDiffs,
  orderedGuilds,
} from "../../utils/elo-data-helper";
import { loadData } from "../../utils/herowars-elo-api";

import { ELO_FILE_PATHS, GuildsContext, HistoricEloContext } from "../../data";
import { Guilds, TimeSeriesEntry } from "../../models";
import { GuildInfoLarge, TimeSeries } from "../../shared-components";

import "./Guild.scss";

export default function GuildScreen() {
  const { historicElo, setHistoricElo } = useContext(HistoricEloContext);
  const { guilds, setGuilds } = useContext(GuildsContext);
  const { id } = useParams<Record<string, string | undefined>>();

  const [guild, setGuild] = useState(
    _.find(guilds, (testGuild) => testGuild.ID === id)
  );

  const [eloEntries, setEloEntries] = useState<Array<TimeSeriesEntry>>([]);
  const [eloHoverEntryValue, setEloHoverEntryValue] = useState<number>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: Subscription;

    // We may want to break this out one day so that instead of loading everything
    // here we load X days worth and have a "load more" action on the page.
    if (loading && id) {
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
          const totalEloData = _.concat(currentEloData, eloRatingsByDay);
          if (daysLoaded === 0 && totalEloData.length > 1) {
            // In this scenario the User came directly to this page, so we
            // want to set the Guilds context too.
            _.each(totalEloData[0], (guild, index) => {
              guild.RANK = index + 1;
              const { rankingChange, ratingChange } = computeDiffs(
                guild,
                totalEloData[1]
              );
              guild.RANKING_CHANGE = rankingChange;
              guild.RATING_CHANGE = ratingChange;
            });
            setGuilds(totalEloData[0]);
            setGuild(
              _.find(totalEloData[0], (testGuild) => testGuild.ID === id)
            );
          }
          setEloEntries(buildTimeSeriesEntries(totalEloData, id));
          setLoading(false);
          setHistoricElo(totalEloData);
        });
      } else {
        console.log("no additional data load required.");
        setEloEntries(buildTimeSeriesEntries(currentEloData, id));
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
      <h3>Elo Rating Over Time</h3>
      <div className="graph-wrapper">
        <TimeSeries
          color="#39dd21" // <- $green-1
          graphName="elo-ratings"
          orderedEntries={eloEntries}
          onHoverValueUpdated={setEloHoverEntryValue}
        />
      </div>
      <div className="graph-title">
        {eloHoverEntryValue && (
          <span className="rating">{eloHoverEntryValue}</span>
        )}
      </div>
    </section>
  );
}
