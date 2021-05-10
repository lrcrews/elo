import React, { useContext } from "react";
import { Link } from "react-router-dom";

import * as _ from "lodash";

import { GuildsContext } from "../../data";

import "./Home.scss";
import GuildInfoSmall from "../../shared-components/GuildInfoSmall";

export default function HomeScreen() {
  const { guilds } = useContext(GuildsContext);

  function navigateToGuildId(id: string) {
    console.log(`navigate to id: ${id}`);
  }

  return (
    <header className="App-header">
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
    </header>
  );
}
