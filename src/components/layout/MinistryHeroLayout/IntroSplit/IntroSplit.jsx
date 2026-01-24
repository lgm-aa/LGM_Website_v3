import "./IntroSplit.css";

export default function IntroSplit({
  label,
  blurb,
  verse,
  verseRef,
  ctaText,
  ctaHref = "/contact",
  image,
  imageAlt = "",
}) {
  return (
    <section className="intro-split">
      <div className="intro-split__grid">
        {/* Left column */}
        <div className="intro-split__left">
          {label && <h2 className="intro-split__label">{label}</h2>}
          {blurb && <p className="intro-split__blurb">{blurb}</p>}
        </div>

        {/* Right column */}
        <div className="intro-split__right">
          {verse && <p className="intro-split__verse">{verse}</p>}

          <div className="intro-split__rightRow">
            {verseRef && <span className="intro-split__ref">{verseRef}</span>}

            {ctaText && (
              <a className="intro-split__cta" href={ctaHref}>
                {ctaText}
              </a>
            )}
          </div>
        </div>
          {image ? (
          <img
            className="intro-split__image"
            src={image}
            alt={imageAlt}
            loading="lazy"
          />
        ) : (
          <div className="intro-split__image intro-split__image--placeholder" />
        )}

      </div>
    </section>
  );
}
