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

const WAR_WEEKS_TO_LOAD = 20;

export default function GuildScreen() {
  const { historicElo, setHistoricElo } = useContext(HistoricEloContext);
  const { guilds } = useContext(GuildsContext);
  const { id } = useParams<Record<string, string | undefined>>();

  const totalWeeksAvailable = ELO_FILE_PATHS.length;

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

    if (loading && id) {
      const currentEloData = _.clone(historicElo);
      const weeksLoaded = _.isEmpty(currentEloData) ? 0 : historicElo.length;

      const weeksToLoad = WAR_WEEKS_TO_LOAD - weeksLoaded;

      if (weeksToLoad > 0) {
        subscription = loadData(weeksToLoad, weeksLoaded).subscribe(
          (results) => {
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
            const totalEloData = _.concat(currentEloData, eloRatingsByWeek);
            const entries = buildTimeSeriesEntries(totalEloData, id);
            setRankingEntries(_.map(entries, (entry) => entry.rankingEntry));
            setRatingEntries(_.map(entries, (entry) => entry.ratingEntry));
            setLoading(false);
            setHistoricElo(totalEloData);
          }
        );
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

  function loadMore() {
    if (!id) return;
    const currentEloData = _.clone(historicElo);
    const weeksLoaded = rankingEntries.length;
    let weeksToLoad = WAR_WEEKS_TO_LOAD;
    if (weeksToLoad > totalWeeksAvailable) {
      weeksToLoad = totalWeeksAvailable;
    }
    loadData(weeksToLoad, weeksLoaded).subscribe((results) => {
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
      const totalEloData = _.concat(currentEloData, eloRatingsByWeek);
      const entries = buildTimeSeriesEntries(totalEloData, id);
      setRankingEntries(_.map(entries, (entry) => entry.rankingEntry));
      setRatingEntries(_.map(entries, (entry) => entry.ratingEntry));
      setLoading(false);
      setHistoricElo(totalEloData);
    });
  }

  function handleHoverUpdate(desiredIndex: number) {
    const rankingData = rankingEntries[desiredIndex];
    const ratingData = ratingEntries[desiredIndex];
    if (rankingData && ratingData) {
      const week = ratingData.week;
      const rating = _.round(ratingData.value, 3);
      setEloHoverData(
        <div className="hover-data">
          <div className="weeks-ago">
            {week} week{week === 1 ? "" : "s"} ago
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
            ({rankingEntries.length} of {totalWeeksAvailable} war weeks loaded)
            {rankingEntries.length < totalWeeksAvailable && (
              <button
                className="load-more-button"
                type="button"
                onClick={loadMore}
              >
                load more
              </button>
            )}
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
