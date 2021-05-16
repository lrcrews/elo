import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import * as _ from "lodash";

import { GuildsContext } from "../../data";
import { Guilds } from "../../models";
import { GUILDS_PATH } from "../../routes/routes";
import { GuildInfoSmall } from "../../shared-components";

import "./Servers.scss";

interface ExpandedServers {
  [key: string]: boolean;
}

interface GroupedGuilds {
  [key: string]: Guilds;
}

export default function ServersScreen() {
  let history = useHistory();
  const { guilds } = useContext(GuildsContext);

  const [expandedServers, setExpandedServers] = useState<ExpandedServers>({});
  const [groupedGuilds, setGroupedGuilds] = useState<GroupedGuilds>();

  useEffect(() => {
    setGroupedGuilds(_.groupBy(guilds, (guild) => guild.SERVER));
  }, [guilds]);

  function navigateToGuildId(id: string) {
    history.push(`${GUILDS_PATH}/${id}`);
  }

  function updateServerDisplay(server: string) {
    const clone = _.clone(expandedServers);
    setExpandedServers({
      ...clone,
      [server]: !clone[server],
    });
  }

  return (
    <section id="servers-screen">
      <h3>Expand Server to See Known Guilds</h3>
      <ul className="servers-list">
        {groupedGuilds &&
          _.map(Object.keys(groupedGuilds), (server) => (
            <li key={server}>
              <div
                className="server-name"
                onClick={() => updateServerDisplay(server)}
              >
                Server {server}
              </div>
              {expandedServers[server] && (
                <ul className="guilds-list">
                  {_.map(groupedGuilds[server], (guild) => (
                    <GuildInfoSmall
                      key={guild.ID}
                      guild={guild}
                      onClick={navigateToGuildId}
                    />
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </section>
  );
}
