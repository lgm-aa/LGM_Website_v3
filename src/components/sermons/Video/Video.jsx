// src/components/sermons/Latest/Latest.jsx
import "./Video.css";

export default function Video() {
  return (
    <section className="latest-sermon">
      <div className="latest-sermon__inner">
        <p className="latest-sermon__eyebrow">LATEST SERMON</p>

        <h2 className="latest-sermon__title">
          Trauma and the God who Sees
        </h2>

        <p className="latest-sermon__date">November 23, 2025</p>

        <div className="latest-sermon__video-card">
          <div className="latest-sermon__video-wrapper">
            <iframe
              className="latest-sermon__iframe"
              src="https://www.youtube.com/embed/VIDEO_ID_HERE"
              title="Trauma and the God who Sees - Living Grace Ministry"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}