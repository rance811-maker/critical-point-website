import "./product-experience-icons.css";

/** Decorative illustrations beside the existing Cat Companion wordmark. */
export default function ProductExperienceIcon({ kind }: { kind: "education" | "finance" }) {
  return (
    <svg
      className={`services-experience-icon services-experience-icon--${kind}`}
      viewBox="0 0 144 108"
      width="120"
      height="90"
      aria-hidden="true"
      focusable="false"
    >
      {kind === "education" ? (
        <>
          <ellipse className="services-experience-icon__shadow" cx="74" cy="95" rx="45" ry="5" />
          <path className="services-experience-icon__book-edge" d="M30 54c15-6 29-5 42 2 14-7 28-8 42-2v36c-15-4-28-3-42 2-14-5-27-6-42-2Z" />
          <path className="services-experience-icon__book-page" d="M27 48c16-5 30-3 45 4v36c-16-7-30-9-45-4Z" />
          <path className="services-experience-icon__book-page" d="M117 48c-16-5-30-3-45 4v36c16-7 30-9 45-4Z" />
          <path className="services-experience-icon__line" d="M72 52v36" />
          <path className="services-experience-icon__bookmark" d="M98 48v18l5-3 5 3V47" />
          <circle className="services-experience-icon__eye" cx="50" cy="65" r="2.3" />
          <circle className="services-experience-icon__eye" cx="87" cy="65" r="2.3" />
          <path className="services-experience-icon__line" d="M61 71q10 8 19 0" />
          <path className="services-experience-icon__page-line" d="M37 76l12 2m44 0 14-2" />
          <path className="services-experience-icon__bubble" d="M17 15h37a9 9 0 0 1 9 9v12a9 9 0 0 1-9 9H43l-9 9 1-9H17a9 9 0 0 1-9-9V24a9 9 0 0 1 9-9Z" />
          <text className="services-experience-icon__letters" x="35.5" y="36" textAnchor="middle">Aa</text>
          <path className="services-experience-icon__bubble-alt" d="M88 9h34a9 9 0 0 1 9 9v12a9 9 0 0 1-9 9h-7l2 9-12-9H88a9 9 0 0 1-9-9V18a9 9 0 0 1 9-9Z" />
          <circle className="services-experience-icon__eye" cx="94" cy="24" r="2.4" />
          <circle className="services-experience-icon__eye" cx="105" cy="24" r="2.4" />
          <circle className="services-experience-icon__eye" cx="116" cy="24" r="2.4" />
        </>
      ) : (
        <>
          <ellipse className="services-experience-icon__shadow" cx="76" cy="95" rx="46" ry="5" />
          <path className="services-experience-icon__line" d="M30 62c-10-8-14-1-10 5 3 4 9 2 8-2" />
          <path className="services-experience-icon__bank" d="M40 45c8-8 21-11 38-11 20 0 32 10 36 26h10v18h-13l-6 15H94l-2-9H53l-3 9H38l-4-15c-6-5-8-10-8-16 0-7 4-13 14-17Z" />
          <path className="services-experience-icon__ear" d="m101 46 2-14c9 2 14 9 12 19" />
          <path className="services-experience-icon__roof" d="m43 45 31-24 32 24" />
          <path className="services-experience-icon__house" d="M51 43v14h46V43L74 26Z" />
          <path className="services-experience-icon__line" d="M63 56h23" />
          <circle className="services-experience-icon__eye" cx="107" cy="59" r="2.3" />
          <path className="services-experience-icon__line" d="M102 70q5 5 9 0" />
          <path className="services-experience-icon__snout" d="M117 61v13" />
          <circle className="services-experience-icon__coin" cx="74" cy="18" r="11" />
          <path className="services-experience-icon__coin-mark" d="M74 12v12m-4-9h5a3 3 0 0 1 0 6h-5" />
          <path className="services-experience-icon__heart" d="M72 75c-13-7-11-15-5-15 3 0 5 3 5 3s2-3 5-3c6 0 8 8-5 15Z" />
          <path className="services-experience-icon__spark" d="M124 22v9m-4-4h8M27 33v7m-3-3h6" />
        </>
      )}
    </svg>
  );
}
