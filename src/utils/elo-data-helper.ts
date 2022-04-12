import * as _ from "lodash";

import { Guild, Guilds, TimeSeriesEntry } from "../models";

export function orderedGuilds(guilds: Guilds): Guilds {
  return _.chain(guilds)
    .filter((guild) => guild.STATUS.toUpperCase() === "ACTIVE")
    .sortBy((guild) => guild.RATING)
    .reverse()
    .value();
}

export function computeDiffs(
  guild: Guild,
  previousEloList: Guilds
): { rankingChange: number; ratingChange: number } {
  if (!guild.RANK) {
    console.log(
      `Attempted to compute diffs on guild (${guild.ID}) with no "RANK" set.`
    );
    return { rankingChange: 0, ratingChange: 0 };
  }
  const previousEloIndex = _.findIndex(
    previousEloList,
    (testGuild) => testGuild.ID === guild.ID
  );
  if (previousEloIndex !== -1) {
    return {
      rankingChange: previousEloIndex + 1 - guild.RANK,
      ratingChange: guild.RATING - previousEloList[previousEloIndex].RATING,
    };
  } else {
    // Newly ranked guild, no diffs.
    return { rankingChange: 0, ratingChange: 0 };
  }
}

export function buildTimeSeriesEntries(
  historicElo: Array<Guilds>,
  guildId: string
): Array<{ rankingEntry: TimeSeriesEntry; ratingEntry: TimeSeriesEntry }> {
  return _.chain(historicElo)
    .map((weekOfElo, index) => {
      const week = index + 1;

      // We are assuming the data is already ordered via the call to
      // `orderedGuilds` during data load, so we avoid unneeded iteration.

      const guildIndex = _.findIndex(
        weekOfElo,
        (guild) => guild.ID === guildId
      );
      if (guildIndex === -1) {
        return {
          rankingEntry: new TimeSeriesEntry(week, 0),
          ratingEntry: new TimeSeriesEntry(week, 0),
        };
      }
      const guild = weekOfElo[guildIndex];
      return {
        rankingEntry: new TimeSeriesEntry(week, guildIndex + 1),
        ratingEntry: new TimeSeriesEntry(week, guild.RATING),
      };
    })
    .reverse()
    .value();
}
