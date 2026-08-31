import type { GameStatus } from "~/game/types";

type Props = {
  status: GameStatus;
  /** True while the player is holding the mouse down over the grid. */
  isPressing: boolean;
  onClick: () => void;
  label: string;
};

const FACES = {
  smile: "/faces/smile.png",
  surprised: "/faces/surprised.png",
  dead: "/faces/dead.png",
  cool: "/faces/cool.png",
} as const;

/** Ending the run wins over pressing: once you are soaked, the face stays soaked. */
function faceFor(status: GameStatus, isPressing: boolean): string {
  if (status === "lost") return FACES.dead;
  if (status === "won") return FACES.cool;
  if (isPressing) return FACES.surprised;
  return FACES.smile;
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
      {/* Decorative: the button's aria-label already says what this does. */}
      <img
        src={faceFor(status, isPressing)}
        alt=""
        draggable={false}
        className="h-[28px] w-[28px]"
      />
    </button>
  );
}
