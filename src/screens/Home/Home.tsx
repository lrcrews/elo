import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import * as _ from "lodash";

import { GuildsContext } from "../../data";
import { GuildInfoSmall } from "../../shared-components";

import "./Home.scss";

export default function HomeScreen() {
  const { guilds } = useContext(GuildsContext);
  let history = useHistory();

  function navigateToGuildId(id: string) {
    history.push(`/guilds/${id}`);
  }

  return (
    <section id="home-screen">
      <ul>
        {_.map(guilds, (guild) => {
          return (
            <li key={guild.ID}>
              <GuildInfoSmall guild={guild} onClick={navigateToGuildId} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
