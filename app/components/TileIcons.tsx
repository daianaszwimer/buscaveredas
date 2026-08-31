/**
 * A loose sidewalk tile, revealed: the dirty water it was hiding splashes out.
 */
export function LooseTileIcon() {
  return (
    <img
      src="/tiles/water-drop.png"
      alt=""
      draggable={false}
      className="h-full w-full object-contain"
    />
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
