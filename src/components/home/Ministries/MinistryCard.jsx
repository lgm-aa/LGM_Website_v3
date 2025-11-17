import React from "react";
import "./Ministries.css";

export default function MinistryCard({ title, image, href = "#" }) {
  return (
    <a className="ministry-card" href={href} aria-label={title}>
      <div
        className="ministry-card__media"
        style={{
          backgroundImage: image ? `url(${image})` : undefined,
        }}
      />
      <div className="ministry-card__label">
        <span>{title}</span>
      </div>
    </a>
  );
}
