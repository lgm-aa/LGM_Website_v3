// src/components/sermons/Latest/Latest.jsx
import "./Video.css";
import { useYouTubeSearch } from "@/hooks/useYouTubeSearch";


export default function Video() {

  const { videos, loading, error } = useYouTubeSearch("", {
    maxResults: 1,
  });

  const video = videos[0] || {};
  
  return (
              
    <section className="latest-sermon">
      <div className="latest-sermon__inner">
        <p className="latest-sermon__eyebrow">LATEST SERMON</p>
        <h2 className="latest-sermon__title">
          {video.title}
        </h2>
        <p className="latest-sermon__date">{video.publishedAt}</p>
        <div className="latest-sermon__video-card">
          <div className="latest-sermon__video-wrapper">
            <iframe
              className="latest-sermon__iframe"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.publishedAt}
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
