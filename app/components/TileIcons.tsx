/**
 * A loose sidewalk tile: the slab tips up and the dirty water underneath
 * jumps out at you. Drawn chunky on purpose so it still reads at 20px.
 */
export function LooseTileIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-full w-full" aria-hidden="true">
      {/* The puddle waiting under the slab. */}
      <path d="M1 10.5 h14 v4.5 h-14 Z" fill="#5b4a2e" />
      <path d="M1 11.5 q3.5 -1.2 7 0 q3.5 1.2 7 0 v3.5 h-14 Z" fill="#3f7fb0" />
      {/* The slab, tipped over. */}
      <g transform="rotate(-15 8 7)">
        <rect x="1.5" y="2.5" width="13" height="7.5" fill="#8f8f8f" stroke="#3d3d3d" strokeWidth="0.9" />
        <rect x="2.6" y="3.4" width="10.8" height="5.6" fill="#bdbdbd" />
      </g>
      {/* Water flying out both sides. */}
      <path d="M2.5 9 L0.5 4.5 M13.5 9 L15.5 4.5" stroke="#4f97cc" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="0.9" cy="3.2" r="1.3" fill="#4f97cc" />
      <circle cx="15.1" cy="3.2" r="1.3" fill="#4f97cc" />
    </svg>
  );
}

/** Classic red flag on its little pole. */
export function FlagIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-full w-full" aria-hidden="true">
      <path d="M7.5 2.5 L7.5 8 L2 5.25 Z" fill="#ff0000" />
      <rect x="7.5" y="2" width="1.2" height="9.5" fill="#000" />
      <rect x="5.5" y="11.5" width="5.5" height="1.3" fill="#000" />
      <rect x="3.5" y="12.8" width="9.5" height="1.6" fill="#000" />
    </svg>
  );
}

/** A flag on a tile that turned out to be firm: crossed out at the end of the run. */
export function WrongFlagIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-full w-full" aria-hidden="true">
      <path d="M7.5 2.5 L7.5 8 L2 5.25 Z" fill="#b40000" />
      <rect x="7.5" y="2" width="1.2" height="9.5" fill="#000" />
      <rect x="3.5" y="12.8" width="9.5" height="1.6" fill="#000" />
      <path d="M1.5 1.5 L14.5 14.5 M14.5 1.5 L1.5 14.5" stroke="#ff0000" strokeWidth="2" />
    </svg>
  );
}
