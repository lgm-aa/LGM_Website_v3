import "./Card.css";

export default function Card({ title, image, href, external = false }) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a className="card" href={href} aria-label={title} {...linkProps}>
      <div
        className="card__media"
        style={{ backgroundImage: image ? `url(${image})` : undefined }}
      />
      <div className="card__label">{title}</div>
    </a>
  );
}
