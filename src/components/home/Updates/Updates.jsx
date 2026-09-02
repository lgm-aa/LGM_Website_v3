// src/components/Updates.jsx
import React from "react";
import "./Updates.css";
import useLatestBulletin from "@/hooks/useLatestBulletin";
import { getMostRecentSundayISOString } from "@/utils/timeNY";
// Import the new component
import PdfCard from "@/components/ui/PdfCard/PdfCard";
import Reveal from "@/components/ui/Reveal/Reveal";

export default function Updates() {
  const { data, loading, error } = useLatestBulletin();

  // Helper to format date
  const formatDate = (isoString) => {
    if (!isoString) return "";
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const sundayDate = formatDate(getMostRecentSundayISOString());

  // Standard title
  const displayTitle = `Living Grace Ministry Bulletin – ${sundayDate}`;

  // Prepare URLs
  const pdfLink = data?.url;
  const embedUrl = data?.id
    ? `https://drive.google.com/file/d/${data.id}/preview`
    : null;

  return (
    <section className="updates">
      <div id="bulletin" className="updates__container">
        <Reveal as="header" className="updates__header">
          <h2 className="section-h2">This Week at Living Grace Ministry</h2>
          <p className="body-text">
            Stay updated on weekly announcements, sermon notes, and upcoming
            events.
          </p>
        </Reveal>

        <Reveal className="updates__content" delay={100}>
          {/* Reusable Component */}
          <PdfCard
            title={displayTitle}
            embedUrl={embedUrl}
            downloadUrl={pdfLink}
            isLoading={loading}
            isUnavailable={!!error}
            // Custom Messages for this specific instance
            unavailableTitle="Bulletin Coming Soon"
            unavailableText="We haven't uploaded this week's bulletin yet. Please check back later!"
            loadingText="Loading..."
          />
        </Reveal>
      </div>
    </section>
  );
}
