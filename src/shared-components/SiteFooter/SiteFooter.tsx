import { Link } from "react-router-dom";

import { ABOUT_PATH } from "../../routes/routes";

import "./SiteFooter.scss";

const MANUALLY_UPDATED_DATE = 1626566649549;

export default function SiteFooter() {
  return (
    <footer id="site-footer">
      <div className="about-link">
        <Link to={ABOUT_PATH}>About</Link>
      </div>
      <div className="last-updated">
        Updated:{" "}
        <span className="date">
          {new Date(MANUALLY_UPDATED_DATE).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            hour: "2-digit",
          })}
        </span>
      </div>
    </footer>
  );
}
