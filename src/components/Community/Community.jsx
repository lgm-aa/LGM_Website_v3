import React from "react";
import "./Community.css";
import img1 from "../../assets/community1.JPG";
import img2 from "../../assets/community2.JPG";
import img3 from "../../assets/community3.JPG";
import img4 from "../../assets/community4.jpg";

export default function Community() {
  return (
    <section className="community-section">
      <div className="community-header">
        <h2>Our Community</h2>
      </div>

      <div className="community-gallery">
        {[img1, img2, img3, img4].map((src, i) => (
          <div key={i} className="community-card">
            <img src={src} alt={`Community ${i + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
