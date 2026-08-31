import type { GameStatus } from "~/game/types";

type Props = {
  status: GameStatus;
  /** True while the player is holding the mouse down over the grid. */
  isPressing: boolean;
  onClick: () => void;
  label: string;
};

function Face({ status, isPressing }: { status: GameStatus; isPressing: boolean }) {
  const won = status === "won";
  const lost = status === "lost";

  return (
    <svg viewBox="0 0 32 32" className="h-[28px] w-[28px]" aria-hidden="true">
      <circle
        cx="16"
        cy="16"
        r="13"
        fill={lost ? "#e8d84a" : "#ffff00"}
        stroke="#000"
        strokeWidth="1.5"
      />

      {lost ? (
        <>
          {/* Soaked: dripping hair and X-ed out eyes. */}
          <path
            d="M6 12 Q10 4 16 5 Q22 4 26 12 Q22 9 16 9 Q10 9 6 12 Z"
            fill="#4a7fa5"
          />
          <path d="M8 12 q-1 4 1 6 q2-2 1-6 Z" fill="#5b93bd" />
          <path d="M24 12 q1 4 -1 6 q-2-2 -1-6 Z" fill="#5b93bd" />
          <path d="M9 12 l4 4 M13 12 l-4 4" stroke="#000" strokeWidth="1.6" />
          <path d="M19 12 l4 4 M23 12 l-4 4" stroke="#000" strokeWidth="1.6" />
          <path
            d="M11 24 Q16 19 21 24"
            fill="none"
            stroke="#000"
            strokeWidth="1.6"
          />
          {/* Splashed water drops. */}
          <circle cx="4" cy="22" r="1.8" fill="#5b93bd" />
          <circle cx="28" cy="21" r="1.5" fill="#5b93bd" />
        </>
      ) : won ? (
        <>
          {/* Made it home dry: sunglasses. */}
          <rect x="5" y="11" width="9" height="6" rx="1.5" fill="#000" />
          <rect x="18" y="11" width="9" height="6" rx="1.5" fill="#000" />
          <path d="M14 13 h4" stroke="#000" strokeWidth="1.6" />
          <path d="M3 12 h2 M27 12 h2" stroke="#000" strokeWidth="1.6" />
          <path
            d="M10 21 Q16 27 22 21"
            fill="none"
            stroke="#000"
            strokeWidth="1.6"
          />
        </>
      ) : isPressing ? (
        <>
          {/* Holding a breath before stepping. */}
          <circle cx="11" cy="13" r="1.8" fill="#000" />
          <circle cx="21" cy="13" r="1.8" fill="#000" />
          <circle cx="16" cy="22" r="3" fill="none" stroke="#000" strokeWidth="1.6" />
        </>
      ) : (
        <>
          <circle cx="11" cy="13" r="1.8" fill="#000" />
          <circle cx="21" cy="13" r="1.8" fill="#000" />
          <path
            d="M10 20 Q16 25 22 20"
            fill="none"
            stroke="#000"
            strokeWidth="1.6"
          />
        </>
      )}
    </svg>
  );
}

export function SmileyButton({ status, isPressing, onClick, label }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="bevel-out flex h-[32px] w-[32px] items-center justify-center active:bevel-in active:pt-[2px] active:pl-[2px]"
    >
      <Face status={status} isPressing={isPressing} />
    </button>
  );
}
