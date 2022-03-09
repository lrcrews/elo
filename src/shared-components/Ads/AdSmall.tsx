import React from "react";

import ad from "./hwelo-ad-small.png";

import "./AdSmall.scss";

export default function AdSmall() {
  function onClick() {
    const newWindow = window.open(
      "https://sacrotees.com",
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  }

  return (
    <div
      className="ad-small"
      tabIndex={0}
      aria-label={`Visit Sacrotees.com`}
      role="link"
      onClick={onClick}
    >
      <img
        src={ad}
        className="ad-image"
        alt="Use code HWELO to save 5% at SACROtees"
      />
    </div>
  );
}
