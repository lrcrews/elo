import React, { useContext } from "react";
import { Link } from "react-router-dom";

import * as _ from "lodash";

import { GuildsContext } from "../../data";
import { GuildInfoSmall } from "../../shared-components";

import "./Home.scss";

export default function HomeScreen() {
  const { guilds } = useContext(GuildsContext);

  function navigateToGuildId(id: string) {
    console.log(`navigate to id: ${id}`);
  }

  return (
    <section id="home-page">
      <ul>
        {_.map(guilds, (guild) => {
          return (
            <li key={guild.ID}>
              <GuildInfoSmall guild={guild} onClick={navigateToGuildId} />
            </li>
          );
        })}
      </ul>
      {/* )} */}
      <Link to="/pending-results">pending</Link>
    </section>
  );
}
