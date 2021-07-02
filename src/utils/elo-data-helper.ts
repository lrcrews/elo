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
    .map((dayOfElo, index) => {
      const day = index + 1;
      const orderedDays = _.sortBy(dayOfElo, (guild) => guild.RATING);
      const guildIndex = _.findIndex(
        orderedDays,
        (guild) => guild.ID === guildId
      );
      if (guildIndex === -1) {
        return {
          rankingEntry: new TimeSeriesEntry(day, 0),
          ratingEntry: new TimeSeriesEntry(day, 0),
        };
      }
      const guild = orderedDays[guildIndex];
      return {
        rankingEntry: new TimeSeriesEntry(day, guildIndex),
        ratingEntry: new TimeSeriesEntry(day, guild.RATING),
      };
    })
    .reverse()
    .value();
}
