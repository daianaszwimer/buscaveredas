import {
  chordAt,
  countFlags,
  createEmptyBoard,
  flagAllLooseTiles,
  hasWon,
  placeLooseTiles,
  revealAllLooseTiles,
  revealFrom,
} from "./board";
import { DEFAULT_DIFFICULTY } from "./copy";
import type { Board, Difficulty, GameAction, GameState } from "./types";

export function createInitialState(
  difficulty: Difficulty = DEFAULT_DIFFICULTY,
): GameState {
  return {
    board: createEmptyBoard(difficulty),
    status: "idle",
    difficulty,
    flagsUsed: 0,
    startedAt: null,
    finishedIn: null,
    steppedOn: [],
  };
}

function elapsedSeconds(startedAt: number | null): number {
  if (startedAt === null) return 0;
  return Math.floor((Date.now() - startedAt) / 1000);
}

/** Loose tiles that got uncovered by the move — a chord can soak you on several at once. */
function steppedOnLooseTiles(board: Board): Array<{ row: number; col: number }> {
  const hits: Array<{ row: number; col: number }> = [];
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col].isLoose && board[row][col].isRevealed) {
        hits.push({ row, col });
      }
    }
  }
  return hits;
}

/** Wraps up a move: decides whether the run ended, and reveals or flags accordingly. */
function settle(state: GameState, board: Board): GameState {
  const steppedOn = steppedOnLooseTiles(board);

  if (steppedOn.length > 0) {
    const finalBoard = revealAllLooseTiles(board);
    return {
      ...state,
      board: finalBoard,
      status: "lost",
      flagsUsed: countFlags(finalBoard),
      finishedIn: elapsedSeconds(state.startedAt),
      steppedOn,
    };
  }

  if (hasWon(board)) {
    const finalBoard = flagAllLooseTiles(board);
    return {
      ...state,
      board: finalBoard,
      status: "won",
      flagsUsed: countFlags(finalBoard),
      finishedIn: elapsedSeconds(state.startedAt),
      steppedOn: [],
    };
  }

  return {
    ...state,
    board,
    status: "playing",
    flagsUsed: countFlags(board),
    steppedOn: [],
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "NEW_GAME":
      return createInitialState(state.difficulty);

    case "SET_DIFFICULTY":
      return createInitialState(action.difficulty);

    case "REVEAL": {
      if (state.status === "won" || state.status === "lost") return state;

      const target = state.board[action.row][action.col];
      if (target.isRevealed || target.isFlagged) return state;

      // The loose tiles are scattered on the first click, so it can never soak you.
      if (state.status === "idle") {
        const seeded = placeLooseTiles(
          state.board,
          action.row,
          action.col,
          state.difficulty.looseTiles,
        );
        return settle(
          { ...state, startedAt: Date.now() },
          revealFrom(seeded, action.row, action.col),
        );
      }

      return settle(state, revealFrom(state.board, action.row, action.col));
    }

    case "TOGGLE_FLAG": {
      if (state.status === "won" || state.status === "lost") return state;
      if (state.board[action.row][action.col].isRevealed) return state;

      const board = state.board.map((row, r) =>
        row.map((cell, c) =>
          r === action.row && c === action.col
            ? { ...cell, isFlagged: !cell.isFlagged }
            : cell,
        ),
      );

      return { ...state, board, flagsUsed: countFlags(board) };
    }

    case "CHORD": {
      if (state.status !== "playing") return state;

      const board = chordAt(state.board, action.row, action.col);
      if (board === state.board) return state;

      return settle(state, board);
    }

    default:
      return state;
  }
}
