import React from "react";

import * as _ from "lodash";

import { Guild } from "../../models";

import "./GuildInfoSmall.scss";

export interface GuildInfoSmallProps {
  guild: Guild;
  onClick: (guildId: string) => void;
  selected?: boolean;
}

export default function GuildInfoSmall({
  guild,
  onClick,
  selected = false,
}: GuildInfoSmallProps) {
  function renderRankData() {
    const rankginChange = guild.RANKING_CHANGE || 0;
    return (
      <div className="rank-container">
        <div className="rank">{guild.RANK}</div>
        <div className="rank-diff">
          {rankginChange > 0 && (
            <>
              <div className="rank-gain">{/* I'm the graphic */}</div>
              <div className="gained-value">+{rankginChange}</div>
            </>
          )}
          {rankginChange < 0 && (
            <>
              <div className="rank-loss">{/* I'm the graphic */}</div>
              <div className="loss-value">{rankginChange}</div>
            </>
          )}
        </div>
      </div>
    );
  }

  function renderBanner() {
    if (guild.RANK && guild.RANK <= 200) {
      return (
        <div className="banner-container">
          {guild.BANNER_IMG && <img src={guild.BANNER_IMG} alt="banner" />}
        </div>
      );
    } else {
      return <div className="banner-container">{/* for spacing */}</div>;
    }
  }

  function renderGuildInfo() {
    return (
      <div className="info-container">
        <div className="name">{guild.NAME}</div>
        <div className="server">{`server ${guild.SERVER}`}</div>
        {guild.FLAIR && <div className="flair">{guild.FLAIR}</div>}
      </div>
    );
  }

  function renderRatingData() {
    const ratingChange = _.round(guild.RATING_CHANGE || 0, 3);
    return (
      <div className="rating-container">
        <div className="rating">{_.round(guild.RATING, 3)}</div>
        <div className="rating-diff">
          {ratingChange > 0 && (
            <div className="gained-value">+{ratingChange}</div>
          )}
          {ratingChange < 0 && <div className="loss-value">{ratingChange}</div>}
        </div>
      </div>
    );
  }

  return (
    <div
      className={selected ? "guild-info-small selected" : "guild-info-small"}
      tabIndex={0}
      aria-label={`View ${guild.NAME} guild.`}
      role="link"
      onClick={() => onClick(guild.ID)}
    >
      {renderRankData()}
      {renderBanner()}
      {renderGuildInfo()}
      {renderRatingData()}
    </div>
  );
}
