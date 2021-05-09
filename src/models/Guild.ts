/* eslint-disable @typescript-eslint/no-redeclare */
import * as t from "io-ts";

const GuildRequiredAttrs = t.type({
  BRACKET_WINS: t.number,
  ID: t.string,
  NAME: t.string,
  RATING: t.number,
  SERVER: t.number,
  STATUS: t.string,
});

// Properties that are either (1) not provided at all, or
// (2) are provided but null.
//
const GuildOptionalAttrs = t.type({
  BANNER_IMG: t.union([t.string, t.null]),
  FLAIR: t.union([t.string, t.null]),
  H: t.union([t.unknown, t.null]),
  J: t.union([t.unknown, t.null]),
});

const Guild = t.intersection([GuildRequiredAttrs, GuildOptionalAttrs]);

type Guild = t.TypeOf<typeof Guild>;

export default Guild;
