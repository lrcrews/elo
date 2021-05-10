/* eslint-disable @typescript-eslint/no-redeclare */
import * as t from "io-ts";

const GuildRequiredAttrs = t.interface({
  BRACKET_WINS: t.number,
  ID: t.string,
  NAME: t.string,
  RATING: t.number,
  SERVER: t.number,
  STATUS: t.string,
});

// Properties that are either (1) not provided at all, and/or
// (2) are provided but null.
//
const GuildOptionalAttrs = t.partial({
  BANNER_IMG: t.union([t.string, t.null]),
  FLAIR: t.union([t.string, t.null]),
  H: t.union([t.unknown, t.null]),
  J: t.union([t.unknown, t.null]),
  RANK: t.number,
  RANKING_CHANGE: t.number,
  RATING_CHANGE: t.number,
});

const Guild = t.intersection([GuildRequiredAttrs, GuildOptionalAttrs]);

type Guild = t.TypeOf<typeof Guild>;

export default Guild;
