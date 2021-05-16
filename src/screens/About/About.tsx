import React from "react";
import { Link } from "react-router-dom";
import { GUILDS_PATH, HOME_PATH } from "../../routes/routes";

import "./About.scss";

export default function AboutScreen() {
  return (
    <section id="about-screen">
      <h1>Welcome to the Hero Wars World Leaderboard!</h1>
      <p>
        Here you will find the world ratings for guilds as managed by the
        awesome people on the{" "}
        <a
          href="https://discord.gg/XE29tXCy29"
          target="_blank"
          rel="noreferrer"
        >
          Hero Wars WLD Leaderboard discord
        </a>
        .
      </p>
      <p>
        The data here is not "live", but it is close, and you will see a bit
        more information here than what you have available{" "}
        <a
          href="https://docs.google.com/spreadsheets/d/1gzWkYgZZm2IG2SR_V_T-WJ28hRjBwFIoCUFPpCQsMY0/edit#gid=947975514"
          target="_blank"
          rel="noreferrer"
        >
          on the spreadsheet
        </a>
        .
      </p>
      <p>
        The <Link to={HOME_PATH}>home page</Link> shows the most recent
        standings along with the gain/loss when applicable, and clicking on a
        guild will show more guild specific stats!
      </p>
      <h2 className="shameless">Shameless Plugs</h2>
      <p>
        Looking to join a great guild from the leaderboard,{" "}
        <Link to={`${GUILDS_PATH}/c24e7945-324e-47f9-9639-e75a4f0ca27a`}>
          TWA Assassins (server 134)
        </Link>{" "}
        and{" "}
        <Link to={`${GUILDS_PATH}/06ed47fd-16d1-48c3-be01-2726ab6fdd33`}>
          ⱫØ₥฿łɆⱠ₳₦Đ (server 365)
        </Link>{" "}
        are welcoming strong players, you can message me (agent_chu#2374) on
        discord for more info!
      </p>
      <p>
        Enjoying this so much you'd like to buy me a beer? Well, you are awesome
        🍻, but I'll ask instead you check out{" "}
        <a href="https://sacrotees.com" target="_blank" rel="noreferrer">
          sacroTEES
        </a>{" "}
        and pick up a comfortable (and badass) t-shirt, hoodie, or skirt if you
        find one you like 👍
      </p>
    </section>
  );
}
