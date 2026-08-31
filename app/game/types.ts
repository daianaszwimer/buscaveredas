export type DifficultyId = "recoleta" | "almagro" | "constitucion";

export type Difficulty = {
  id: DifficultyId;
  rows: number;
  cols: number;
  looseTiles: number;
};

export type Cell = {
  /** A loose sidewalk tile: step on it and it splashes you. The "mine". */
  isLoose: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  /** How many of the eight neighbours are loose. Only meaningful once revealed. */
  adjacentCount: number;
};

export type Board = Cell[][];

export type GameStatus = "idle" | "playing" | "won" | "lost";

export type GameState = {
  board: Board;
  status: GameStatus;
  difficulty: Difficulty;
  flagsUsed: number;
  /** Epoch ms of the first reveal, or null while idle. */
  startedAt: number | null;
  /** Frozen elapsed seconds once the game ends. */
  finishedIn: number | null;
  /** The loose tiles you actually stepped on, so the board can paint them red. */
  steppedOn: Array<{ row: number; col: number }>;
};

export type GameAction =
  | { type: "REVEAL"; row: number; col: number }
  | { type: "TOGGLE_FLAG"; row: number; col: number }
  | { type: "CHORD"; row: number; col: number }
  | { type: "NEW_GAME" }
  | { type: "SET_DIFFICULTY"; difficulty: Difficulty };
