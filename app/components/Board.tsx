import { memo } from "react";

import type { Board as BoardModel, Cell, GameStatus } from "~/game/types";
import { FlagIcon, LooseTileIcon, WrongFlagIcon } from "./TileIcons";

const NUMBER_COLORS = [
  "",
  "#0000ff",
  "#008000",
  "#ff0000",
  "#000080",
  "#800000",
  "#008080",
  "#000000",
  "#808080",
];

type CellProps = {
  cell: Cell;
  row: number;
  col: number;
  status: GameStatus;
  isSteppedOn: boolean;
  onReveal: (row: number, col: number) => void;
  onFlag: (row: number, col: number) => void;
  onChord: (row: number, col: number) => void;
};

const CellButton = memo(function CellButton({
  cell,
  row,
  col,
  status,
  isSteppedOn,
  onReveal,
  onFlag,
  onChord,
}: CellProps) {
  const gameOver = status === "won" || status === "lost";
  const showWrongFlag = status === "lost" && cell.isFlagged && !cell.isLoose;

  let content: React.ReactNode = null;
  if (cell.isRevealed && cell.isLoose) {
    // Inset a little so the red "this is the one that got you" background shows through.
    content = (
      <span className="block h-[82%] w-[82%]">
        <LooseTileIcon />
      </span>
    );
  } else if (showWrongFlag) {
    content = <WrongFlagIcon />;
  } else if (cell.isFlagged) {
    content = <FlagIcon />;
  } else if (cell.isRevealed && cell.adjacentCount > 0) {
    content = (
      <span
        className="text-[16px] font-bold leading-none"
        style={{ color: NUMBER_COLORS[cell.adjacentCount] }}
      >
        {cell.adjacentCount}
      </span>
    );
  }

  const isOpen = cell.isRevealed || showWrongFlag;

  return (
    <button
      type="button"
      disabled={gameOver}
      aria-label={`Baldosa fila ${row + 1}, columna ${col + 1}`}
      className={[
        "flex h-[20px] w-[20px] items-center justify-center p-0 leading-none no-select",
        isOpen ? "tile-revealed" : "bevel-out",
        isSteppedOn ? "!bg-[#ff0000]" : "",
        gameOver ? "cursor-default" : "cursor-pointer",
      ].join(" ")}
      onClick={() => (cell.isRevealed ? onChord(row, col) : onReveal(row, col))}
      onDoubleClick={() => onChord(row, col)}
      onContextMenu={(event) => {
        event.preventDefault();
        onFlag(row, col);
      }}
    >
      {content}
    </button>
  );
});

type BoardProps = {
  board: BoardModel;
  status: GameStatus;
  steppedOn: Array<{ row: number; col: number }>;
  onReveal: (row: number, col: number) => void;
  onFlag: (row: number, col: number) => void;
  onChord: (row: number, col: number) => void;
  onPressChange: (pressing: boolean) => void;
};

export function Board({
  board,
  status,
  steppedOn,
  onReveal,
  onFlag,
  onChord,
  onPressChange,
}: BoardProps) {
  const stepped = new Set(steppedOn.map((hit) => `${hit.row}:${hit.col}`));

  return (
    <div
      className="bevel-in inline-block bg-face p-[4px]"
      onMouseDown={() => onPressChange(true)}
      onMouseUp={() => onPressChange(false)}
      onMouseLeave={() => onPressChange(false)}
      onContextMenu={(event) => event.preventDefault()}
    >
      {board.map((row, r) => (
        <div key={r} className="flex">
          {row.map((cell, c) => (
            <CellButton
              key={c}
              cell={cell}
              row={r}
              col={c}
              status={status}
              isSteppedOn={stepped.has(`${r}:${c}`)}
              onReveal={onReveal}
              onFlag={onFlag}
              onChord={onChord}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
