import { useEffect, useRef, useState } from "react";

import {
  DIFFICULTIES,
  DIFFICULTY_LABELS,
  DIFFICULTY_ORDER,
  copy,
} from "~/game/copy";
import type { Difficulty, DifficultyId } from "~/game/types";

type Props = {
  current: DifficultyId;
  onNewGame: () => void;
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onShowHelp: () => void;
  onShowAbout: () => void;
};

type OpenMenu = "game" | "help" | null;

function MenuItem({
  children,
  onSelect,
  checked,
}: {
  children: React.ReactNode;
  onSelect: () => void;
  checked?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center gap-2 whitespace-nowrap px-2 py-[4px] text-left text-[12px] hover:bg-[#0a246a] hover:text-white"
    >
      <span className="w-3 text-center">{checked ? "✓" : ""}</span>
      {children}
    </button>
  );
}

export function MenuBar({
  current,
  onNewGame,
  onSelectDifficulty,
  onShowHelp,
  onShowAbout,
}: Props) {
  const [open, setOpen] = useState<OpenMenu>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clicking anywhere else closes the dropdown, like a real menu.
  useEffect(() => {
    if (open === null) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(null);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function run(action: () => void) {
    action();
    setOpen(null);
  }

  const triggerClass =
    "px-2 py-[3px] text-[12px] hover:bg-[#0a246a] hover:text-white";

  return (
    <div
      ref={containerRef}
      className="relative flex border-b border-[#a0a0a0] bg-face px-[2px] py-[1px] no-select"
    >
      <div className="relative">
        <button
          type="button"
          className={`${triggerClass} ${open === "game" ? "bg-[#0a246a] text-white" : ""}`}
          onClick={() => setOpen(open === "game" ? null : "game")}
        >
          {copy.menu.game}
        </button>
        {open === "game" ? (
          <div className="absolute left-0 top-full z-20 border border-[#808080] bg-face py-[2px] shadow-[2px_2px_4px_rgba(0,0,0,0.35)]">
            <MenuItem onSelect={() => run(onNewGame)}>
              {copy.menu.newGame}
            </MenuItem>
            <div className="my-[2px] border-t border-[#808080]" />
            {DIFFICULTY_ORDER.map((id) => (
              <MenuItem
                key={id}
                checked={current === id}
                onSelect={() => run(() => onSelectDifficulty(DIFFICULTIES[id]))}
              >
                {DIFFICULTY_LABELS[id]}
              </MenuItem>
            ))}
          </div>
        ) : null}
      </div>

      <div className="relative">
        <button
          type="button"
          className={`${triggerClass} ${open === "help" ? "bg-[#0a246a] text-white" : ""}`}
          onClick={() => setOpen(open === "help" ? null : "help")}
        >
          {copy.menu.help}
        </button>
        {open === "help" ? (
          <div className="absolute left-0 top-full z-20 border border-[#808080] bg-face py-[2px] shadow-[2px_2px_4px_rgba(0,0,0,0.35)]">
            <MenuItem onSelect={() => run(onShowHelp)}>
              {copy.menu.howToPlay}
            </MenuItem>
            <MenuItem onSelect={() => run(onShowAbout)}>
              {copy.menu.about}
            </MenuItem>
          </div>
        ) : null}
      </div>
    </div>
  );
}
