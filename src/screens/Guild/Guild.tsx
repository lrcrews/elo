import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import * as _ from "lodash";

import { HistoricEloContext } from "../../data";

import "./Guild.scss";
import { Guild } from "../../models";
import { GuildInfoLarge } from "../../shared-components";

export default function GuildScreen() {
  const { daysLoaded, historicElo, setDaysLoaded, setHistoricElo } = useContext(
    HistoricEloContext
  );
  const { id } = useParams<Record<string, string | undefined>>();

  const [guild, setGuild] = useState<Guild>();

  useEffect(() => {
    if (historicElo) {
      const desiredGuild = _.find(
        historicElo[0],
        (historicGuild) => historicGuild.ID === id
      );
      setGuild(desiredGuild);
      if (daysLoaded === 2) {
        console.log("should load more days");
      }
    }
  }, [daysLoaded, historicElo, id]);

  return (
    <section id="guild-screen">
      {guild && <GuildInfoLarge guild={guild} />}
    </section>
  );
}
