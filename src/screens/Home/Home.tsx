import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import * as _ from "lodash";

import { GuildsContext } from "../../data";
import { GUILDS_PATH } from "../../routes/routes";
import { AdSmall, GuildInfoSmall } from "../../shared-components";

import "./Home.scss";

export default function HomeScreen() {
  const { guilds } = useContext(GuildsContext);
  let history = useHistory();

  function navigateToGuildId(id: string) {
    history.push(`${GUILDS_PATH}/${id}`);
  }

  return (
    <section id="home-screen">
      <ul>
        {_.map(guilds, (guild, index) => {
          const guildInfoLI = (
            <li key={guild.ID}>
              <GuildInfoSmall guild={guild} onClick={navigateToGuildId} />
            </li>
          );
          if (index > 0 && index % 100 === 0) {
            return (
              <React.Fragment key={index}>
                <li key={`ad-${index}`}>
                  <AdSmall />
                </li>
                {guildInfoLI}
              </React.Fragment>
            );
          } else {
            return guildInfoLI;
          }
        })}
      </ul>
    </section>
  );
}
