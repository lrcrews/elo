import React from "react";

import { Guild } from "../models";

import "./GuildInfoSmall.scss";

export interface GuildInfoSmallProps {
  guild: Guild;
  onClick: (guildId: string) => void;
}

export default function GuildInfoSmall({
  guild,
  onClick,
}: GuildInfoSmallProps) {
  return (
    <div
      className="guild-info-small"
      tabIndex={0}
      aria-label={`View ${guild.NAME} guild.`}
      role="link"
      onClick={() => onClick(guild.ID)}
    >
      <div className="rank">
        {guild.RANK} ({guild.RANKING_CHANGE})
      </div>
      <div className="banner">
        {guild.BANNER_IMG && (
          <img src={guild.BANNER_IMG} alt="banner" width="100%" />
        )}
      </div>
      <div className="info">
        <div>{guild.NAME}</div>
        <div>{`(s${guild.SERVER})`}</div>
      </div>
      <div className="rating">
        {guild.RATING} ({guild.RATING_CHANGE})
      </div>
    </div>
  );
}
