// src/components/ui/PdfCard/PdfCard.jsx
import React from "react";
import "./PdfCard.css";
import Button from "@/components/ui/Button/Button";

export default function PdfCard({
  title,
  embedUrl,
  downloadUrl,
  isLoading,
  isUnavailable,
  unavailableTitle = "Document Unavailable",
  unavailableText = "This document is not available yet.",
  loadingText = "Loading document...",
}) {
  const isDisabled = isLoading || isUnavailable || !downloadUrl;

  return (
    <article className="pdf-card pdf-card--dark">
      <div className="pdf-card__header">
        <span className="pdf-card__icon-badge">
          {/* Document Icon */}
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
          </svg>
        </span>
        <div>
          <h3 className="pdf-card__title body-text">
            {isUnavailable ? unavailableTitle : title}
          </h3>
        </div>
      </div>

      {embedUrl && !isUnavailable && !isLoading ? (
        <div className="pdf-card__frame-container">
          <iframe
            src={embedUrl}
            className="pdf-card__frame"
            title={title}
            allow="autoplay"
          ></iframe>
        </div>
      ) : (
        <div className="pdf-card__placeholder body-text">
          <p>{isLoading ? loadingText : unavailableText}</p>
        </div>
      )}

      <Button
        as="a"
        href={downloadUrl || "#"}
        target={!isDisabled ? "_blank" : undefined}
        rel="noopener noreferrer"
        variant="primary"
        size="lg"
        className="pdf-card__cta"
        style={{
          pointerEvents: isDisabled ? "none" : "auto",
          opacity: isDisabled ? 0.7 : 1,
        }}
      >
        <span className="btn-icon">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 13V6H11" />
            <path d="M18 6L7 17" />
          </svg>
        </span>
        <span className="body-text">
          {isLoading ? "Loading..." : "Open PDF in New Tab"}
        </span>
      </Button>

      {/* Decorative Blobs */}
      <span className="pdf-card__blob pdf-card__blob--tl" />
    </article>
  );
}
