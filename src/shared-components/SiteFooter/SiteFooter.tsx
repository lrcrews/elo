import { Link } from "react-router-dom";

import { ABOUT_PATH } from "../../routes/routes";

import "./SiteFooter.scss";

const MANUALLY_UPDATED_DATE = 1623128260658;

export default function SiteFooter() {
  return (
    <footer id="site-footer">
      <div className="about-link">
        <Link to={ABOUT_PATH}>About</Link>
      </div>
      <div className="last-updated">
        Last updated:{" "}
        <span className="date">
          {new Date(MANUALLY_UPDATED_DATE).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </footer>
  );
}
