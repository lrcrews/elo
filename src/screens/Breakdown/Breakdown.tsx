import React, { useContext, useEffect, useState } from "react";

import * as _ from "lodash";

import { GuildsContext } from "../../data";
import { Guild, Guilds } from "../../models";
import { GuildInfoSmall } from "../../shared-components";

import "./Breakdown.scss";

interface ExpandedServers {
  [key: string]: boolean;
}

interface GroupedGuilds {
  [key: string]: Guilds;
}

export default function BreakdownScreen() {
  const { guilds } = useContext(GuildsContext);

  const [expandedServers, setExpandedServers] = useState<ExpandedServers>({});
  const [groupedGuilds, setGroupedGuilds] = useState<GroupedGuilds>();

  const [selectedGuilds, setSelectedGuilds] = useState<Guilds>([]);
  const [orderedGuilds, setOrderedGuilds] = useState<Guilds>([]);

  useEffect(() => {
    setGroupedGuilds(_.groupBy(guilds, (guild) => guild.SERVER));
  }, [guilds]);

  useEffect(() => {
    setOrderedGuilds(_.sortBy(selectedGuilds, guild => guild.RANK));
  }, [selectedGuilds]);

  function toggleGuildSelection(id: string) {
    const selections = _.clone(selectedGuilds);
    const foundGuild = _.find(guilds, guild => guild.ID === id);
    if (!foundGuild) return;
    if (_.includes(selections, foundGuild)) {
      _.remove(selections, guild => guild.ID === foundGuild.ID);
    } else {
      selections.push(foundGuild);
    }
    setSelectedGuilds(selections);
  }

  function updateServerDisplay(server: string) {
    const clone = _.clone(expandedServers);
    setExpandedServers({
      ...clone,
      [server]: !clone[server],
    });
  }

  function guildLine(guild: Guild) {
    let text = "";
    const rank = guild.RANK;
    if (!rank) return "";
    let rankText = rank.toString();
    while (rankText.length < 12) {
      rankText += " ";
    }
    text += rankText;
    let serverText = guild.SERVER.toString();
    while (serverText.length < 5) {
      serverText += " ";
    }
    text += serverText + guild.NAME;
    text = _.replace(text, /\s/g, "&nbsp;");
    return <div key={guild.ID} dangerouslySetInnerHTML={{__html: text}}></div>;
  }

  function meanRankText() {
    let value = "-";
    if (selectedGuilds.length > 0) {
      value = `${_.round(_.reduce(selectedGuilds, (sum, guild) => sum += guild.RANK || 0, 0) / selectedGuilds.length, 2)}`;
    }
    return `**mean rank**: ${value}`; 
  }

  function medianRankText() {
    let value = "-";
    if (orderedGuilds.length > 0) {
      value = `${orderedGuilds[Math.floor(orderedGuilds.length / 2)]?.RANK || 0}`;
    }
    return `**median rank**: ${value}`;
  }

  function rankedPercentageText(minRank: number, maxRank: number) {
    if (_.isEmpty(selectedGuilds)) return `**-** are ranked ${minRank} - ${maxRank}`;
    let value = "-";
    const relevantGuilds = _.filter(selectedGuilds, guild => {
      const rank = guild.RANK || 0;
      return rank >= minRank && rank <= maxRank;
    });
    value = `${_.round((relevantGuilds.length / selectedGuilds.length) * 100, 2)}`;
    return `**${value}% (${relevantGuilds.length} guilds)** are ranked ${minRank} - ${maxRank}`;
  }

  return (
    <section id="breakdown-screen">
      <h2>Guild Breakdown Generator</h2>
      <p>
        Find and tap on guilds below to generate a breakdown of selected guilds that you may want to copy/paste into Discord 👍
      </p>
      <p>
        The breakdown itself orders the selected guilds by rank in a list and provides stats that some may find useful to share with their guildmates.
      </p>
      <h3>Breakdown:</h3>
      <div className="breakdown">
        There are {orderedGuilds.length} guilds:
        <br/>
        ```
          <br />
          RANK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SERVER / NAME
          <br/>
          ----&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-----------------------
          <br/>
          {orderedGuilds.map(guildLine)}
        ```
        <br/>
        {meanRankText()}
        <br/>
        {medianRankText()}
        <br/>
        <br/>
        {rankedPercentageText(1, 100)}
        <br/>
        {rankedPercentageText(101, 200)}
        <br/>
        {rankedPercentageText(201, 400)}
        <br/>
        {rankedPercentageText(401, 999)}
        <br/>
        <br/>
        Generated at https://worldrank.in/g/generate-breakdown
      </div>
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
                      onClick={toggleGuildSelection}
                      selected={_.includes(selectedGuilds, guild)}
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
