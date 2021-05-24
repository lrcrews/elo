import React from "react";

import * as _ from "lodash";

import { Guild } from "../../models";

import "./GuildInfoLarge.scss";

export interface GuildInfoLargeProps {
  guild: Guild;
}

export default function GuildInfoLarge({ guild }: GuildInfoLargeProps) {
  function renderBannerAndInfo() {
    let bannerUi;
    if (guild.RANK && guild.RANK <= 200) {
      bannerUi = (
        <div className="banner-container">
          {guild.BANNER_IMG && <img src={guild.BANNER_IMG} alt="banner" />}
        </div>
      );
    } else {
      bannerUi = <div className="banner-container">{/* for spacing */}</div>;
    }
    return (
      <div className="banner-and-info-container">
        {bannerUi}
        <div className="info-container">
          <div className="name">{guild.NAME}</div>
          <div className="server">{`server: ${guild.SERVER}`}</div>
          {guild.BRACKET_WINS > 0 && (
            <div>{`bracket wins: ${guild.BRACKET_WINS}`}</div>
          )}
          {guild.FLAIR && <div>{guild.FLAIR}</div>}
        </div>
      </div>
    );
  }

  function renderRankAndRating() {
    return (
      <div className="rank-and-rating-container">
        {renderRankData()}
        {renderRatingData()}
      </div>
    );
  }

  function renderRankData() {
    const rankginChange = guild.RANKING_CHANGE || 0;
    return (
      <div className="rank-container">
        <div className="rank">#{guild.RANK}</div>
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
    <div className="guild-info-large">
      {renderBannerAndInfo()}
      {renderRankAndRating()}
    </div>
  );
}
