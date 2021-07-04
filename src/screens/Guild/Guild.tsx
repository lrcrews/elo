import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as Either from "fp-ts/lib/Either";
import * as _ from "lodash";
import { Subscription } from "rxjs";

import {
  buildTimeSeriesEntries,
  orderedGuilds,
} from "../../utils/elo-data-helper";
import { loadData } from "../../utils/herowars-elo-api";

import { ELO_FILE_PATHS, GuildsContext, HistoricEloContext } from "../../data";
import { Guilds, TimeSeriesEntry } from "../../models";
import { GuildInfoLarge, TimeSeries } from "../../shared-components";

import logo from "../../elo-logo.png";
import "./Guild.scss";

const INITIAL_WAR_DAYS_TO_SHOW = 20;

export default function GuildScreen() {
  const { historicElo, setHistoricElo } = useContext(HistoricEloContext);
  const { guilds } = useContext(GuildsContext);
  const { id } = useParams<Record<string, string | undefined>>();

  const totalDaysAvailable = ELO_FILE_PATHS.length;

  const guild = _.find(guilds, (testGuild) => testGuild.ID === id);

  const [rankingEntries, setRankingEntries] = useState<Array<TimeSeriesEntry>>(
    []
  );
  const [ratingEntries, setRatingEntries] = useState<Array<TimeSeriesEntry>>(
    []
  );
  const [eloHoverData, setEloHoverData] = useState(<></>);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: Subscription;

    // We may want to break this out one day so that instead of loading everything
    // here we load X days worth and have a "load more" action on the page.
    if (loading && id) {
      const currentEloData = _.clone(historicElo);
      const daysLoaded = _.isEmpty(currentEloData) ? 0 : historicElo.length;

      const daysToLoad = INITIAL_WAR_DAYS_TO_SHOW - daysLoaded;
      // Let's cap how much data we intiailly load 👆,
      // instead of just loading all of it 👇.
      // const daysToLoad = ELO_FILE_PATHS.length - daysLoaded;

      // TODO: extract out some code here and add action to page to allow loading
      //       additional data (instead of just the most recent INITIAL_WAR_DAYS_TO_SHOW)

      if (daysToLoad > 0) {
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
          const entries = buildTimeSeriesEntries(totalEloData, id);
          setRankingEntries(_.map(entries, (entry) => entry.rankingEntry));
          setRatingEntries(_.map(entries, (entry) => entry.ratingEntry));
          setLoading(false);
          setHistoricElo(totalEloData);
        });
      } else {
        const entries = buildTimeSeriesEntries(currentEloData, id);
        setRankingEntries(_.map(entries, (entry) => entry.rankingEntry));
        setRatingEntries(_.map(entries, (entry) => entry.ratingEntry));
        setLoading(false);
      }
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, [historicElo, id, loading, setHistoricElo]);

  function handleHoverUpdate(desiredIndex: number) {
    const rankingData = rankingEntries[desiredIndex];
    const ratingData = ratingEntries[desiredIndex];
    if (rankingData && ratingData) {
      const day = ratingData.day;
      const rating = _.round(ratingData.value, 3);
      setEloHoverData(
        <div className="hover-data">
          <div className="days-ago">
            {day} war{day === 1 ? "" : "s"} ago
          </div>
          <div className="rank">#{rankingData.value}</div>
          <div className="rating">{rating}</div>
        </div>
      );
    } else {
      setEloHoverData(<></>);
    }
  }

  return (
    <section id="guild-screen">
      {guild && <GuildInfoLarge guild={guild} />}
      <h3>Rating & Rank Over Time</h3>
      {loading && (
        <div className="loading-graph-wrapper">
          <div>Loading data...</div>
          <img src={logo} className="loading-image" alt="loading data" />
        </div>
      )}
      {!loading && (
        <>
          <div className="data-count">
            ({rankingEntries.length} of {totalDaysAvailable} wars loaded)
          </div>
          <div className="elo-graph-wrapper">
            <TimeSeries
              color="#39dd21" // <- $green-1
              graphName="ratings"
              orderedEntries={ratingEntries}
              onHoverDataUpdated={handleHoverUpdate}
            />
          </div>
          <div className="ranking-graph-wrapper">
            <div className="custom-y-axis-label">RANK</div>
            <TimeSeries
              color="#39dd21" // <- $green-1
              graphName="rankings"
              hideLabels={true}
              inverseValues={true}
              invertColors={true}
              orderedEntries={rankingEntries}
              onHoverDataUpdated={handleHoverUpdate}
              yScaleBuffer={0.02}
            />
          </div>
          <div className="graph-title">{eloHoverData}</div>
        </>
      )}
    </section>
  );
}
