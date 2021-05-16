import React from "react";

import { Link } from "react-router-dom";

import { HOME_PATH, SERVERS_PATH } from "../../routes/routes";

import logo from "../../elo-logo.png";

import "./SiteHeader.scss";

export default function SiteHeader() {
  return (
    <header id="site-header">
      <img src={logo} alt="Elo rankings" className="logo" />
      <Link to={HOME_PATH}>
        <div className="full-name">Hero Wars World Leaderboard</div>
        <div className="short-name">HW WLD Leaderboard</div>
      </Link>
      <ul className="links">
        <li>
          <Link to={SERVERS_PATH}>Servers</Link>
        </li>
      </ul>
    </header>
  );
}
