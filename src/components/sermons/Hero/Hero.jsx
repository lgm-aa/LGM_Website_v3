// src/pages/Sermons/Sermons.jsx
import "./Hero.css";
import backgroundImage from "@/assets/lgm_building.webp"; // use your church photo here

export default function Hero() {
  return (
    <main className="sermons">
      <section className="sermons-hero">
        <img src={backgroundImage} alt="Living Grace Ministry" className="sermons-hero__bg" />

        <div className="sermons-hero__overlay"></div>

        <div className="sermons-hero__content">
          <h1 className="sermons-hero__title">SERMONS</h1>
        </div>
      </section>

      {/* page content here */}
      <section className="sermons-body">
        <h2>Recent Sermons</h2>
      </section>
    </main>
  );
}