import "./SiteFooter.scss";

const MANUALLY_UPDATED_DATE = 1621119309129;

export default function SiteFooter() {
  return (
    <footer id="site-footer">
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
