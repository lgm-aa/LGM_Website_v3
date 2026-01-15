import "./ScrollIndicator.css";

export default function ScrollIndicator() {
  return (
    <div className="scroll-indicator">
      <div>scroll</div>
      <svg
        className="chevron"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
