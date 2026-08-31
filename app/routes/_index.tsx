import { useCallback, useReducer, useState } from "react";

import { Board } from "~/components/Board";
import { Dialog } from "~/components/Dialog";
import { LedDisplay } from "~/components/LedDisplay";
import { MenuBar } from "~/components/MenuBar";
import { SmileyButton } from "~/components/SmileyButton";
import { XPWindow } from "~/components/XPWindow";
import { useElapsedSeconds } from "~/components/useElapsedSeconds";
import { copy } from "~/game/copy";
import { createInitialState, gameReducer } from "~/game/reducer";
import type { Difficulty } from "~/game/types";

type Modal = "help" | "about" | null;

export default function Index() {
  // Starts on an empty board so the server and the client render the same markup;
  // the loose tiles are scattered on the first click, which is already client-side.
  const [state, dispatch] = useReducer(gameReducer, undefined, () =>
    createInitialState(),
  );
  const [isPressing, setIsPressing] = useState(false);
  const [modal, setModal] = useState<Modal>(null);

  const seconds = useElapsedSeconds(state.startedAt, state.status, state.finishedIn);
  const remaining = state.difficulty.looseTiles - state.flagsUsed;

  const reveal = useCallback(
    (row: number, col: number) => dispatch({ type: "REVEAL", row, col }),
    [],
  );
  const flag = useCallback(
    (row: number, col: number) => dispatch({ type: "TOGGLE_FLAG", row, col }),
    [],
  );
  const chord = useCallback(
    (row: number, col: number) => dispatch({ type: "CHORD", row, col }),
    [],
  );
  const newGame = useCallback(() => dispatch({ type: "NEW_GAME" }), []);
  const setDifficulty = useCallback(
    (difficulty: Difficulty) => dispatch({ type: "SET_DIFFICULTY", difficulty }),
    [],
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <XPWindow title={copy.windowTitle} onClose={newGame}>
        <MenuBar
          current={state.difficulty.id}
          onNewGame={newGame}
          onSelectDifficulty={setDifficulty}
          onShowHelp={() => setModal("help")}
          onShowAbout={() => setModal("about")}
        />

        <div className="bevel-in-thin m-[6px] bg-face p-[6px]">
          <div className="bevel-in mb-[6px] flex items-center justify-between bg-face px-[6px] py-[4px]">
            <LedDisplay value={remaining} label={copy.panel.remaining} />
            <SmileyButton
              status={state.status}
              isPressing={isPressing}
              onClick={newGame}
              label={copy.panel.restart}
            />
            <LedDisplay value={seconds} label={copy.panel.time} />
          </div>

          <Board
            board={state.board}
            status={state.status}
            steppedOn={state.steppedOn}
            onReveal={reveal}
            onFlag={flag}
            onChord={chord}
            onPressChange={setIsPressing}
          />
        </div>

        <div className="bevel-in-thin mx-[6px] mb-[6px] bg-face px-2 py-[4px] text-[12px] text-black no-select">
          {copy.status[state.status]}
        </div>
      </XPWindow>

      {modal === "help" ? (
        <Dialog
          title={copy.help.title}
          closeLabel={copy.help.close}
          onClose={() => setModal(null)}
        >
          <p>{copy.help.intro}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {copy.help.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </Dialog>
      ) : null}

      {modal === "about" ? (
        <Dialog
          title={copy.about.title}
          closeLabel={copy.help.close}
          onClose={() => setModal(null)}
        >
          <p>{copy.about.body}</p>
        </Dialog>
      ) : null}
    </main>
  );
}
