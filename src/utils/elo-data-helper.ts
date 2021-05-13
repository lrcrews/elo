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
): Array<TimeSeriesEntry> {
  return _.chain(historicElo)
    .map((dayOfElo, index) => {
      const guild = _.find(dayOfElo, (testGuild) => testGuild.ID === guildId);
      console.log(
        `adding ts entry, day: ${index + 1}, rating: ${guild?.RATING || 600}`
      );
      return new TimeSeriesEntry(index + 1, guild?.RATING || 600);
    })
    .reverse()
    .value();
}
