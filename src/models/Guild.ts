/* eslint-disable @typescript-eslint/no-redeclare */
import * as t from "io-ts";

const GuildRequiredAttrs = t.type({
  "Guild Name": t.string,
  id: t.string,
  Rank: t.number,
  Rating: t.number,
  Server: t.number,
});

const GuildOptionalAttrs = t.type({
  Banner: t.string,
});

const Guild = t.intersection([GuildRequiredAttrs, GuildOptionalAttrs]);

type Guild = t.TypeOf<typeof Guild>;

export default Guild;
