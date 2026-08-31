import type { Board, Difficulty } from "./types";

/** Cloning keeps every board operation pure, so the reducer never mutates state in place. */
function cloneBoard(board: Board): Board {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

export function createEmptyBoard(difficulty: Difficulty): Board {
  return Array.from({ length: difficulty.rows }, () =>
    Array.from({ length: difficulty.cols }, () => ({
      isLoose: false,
      isRevealed: false,
      isFlagged: false,
      adjacentCount: 0,
    })),
  );
}

export function neighbors(
  board: Board,
  row: number,
  col: number,
): Array<{ row: number; col: number }> {
  const result: Array<{ row: number; col: number }> = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const r = row + dr;
      const c = col + dc;
      if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) continue;
      result.push({ row: r, col: c });
    }
  }
  return result;
}

/**
 * Scatters the loose tiles after the first click, keeping the clicked cell and its
 * eight neighbours safe so the opening move always cracks the board open.
 */
export function placeLooseTiles(
  board: Board,
  safeRow: number,
  safeCol: number,
  count: number,
): Board {
  const next = cloneBoard(board);
  const rows = next.length;
  const cols = next[0].length;

  const safe = new Set<number>([safeRow * cols + safeCol]);
  for (const n of neighbors(next, safeRow, safeCol)) {
    safe.add(n.row * cols + n.col);
  }

  const candidates: number[] = [];
  for (let i = 0; i < rows * cols; i++) {
    if (!safe.has(i)) candidates.push(i);
  }

  // Fisher-Yates, but we only need the first `count` positions.
  const picks = Math.min(count, candidates.length);
  for (let i = 0; i < picks; i++) {
    const j = i + Math.floor(Math.random() * (candidates.length - i));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    const index = candidates[i];
    next[Math.floor(index / cols)][index % cols].isLoose = true;
  }

  return countAdjacent(next);
}

export function countAdjacent(board: Board): Board {
  const next = cloneBoard(board);
  for (let row = 0; row < next.length; row++) {
    for (let col = 0; col < next[row].length; col++) {
      next[row][col].adjacentCount = neighbors(next, row, col).filter(
        (n) => next[n.row][n.col].isLoose,
      ).length;
    }
  }
  return next;
}

/**
 * Reveals a cell and, when it has no loose neighbours, floods outwards.
 * Iterative on purpose: an expert board can chain hundreds of cells.
 */
export function revealFrom(board: Board, row: number, col: number): Board {
  const next = cloneBoard(board);
  const stack = [{ row, col }];

  while (stack.length > 0) {
    const { row: r, col: c } = stack.pop()!;
    const cell = next[r][c];
    if (cell.isRevealed || cell.isFlagged) continue;

    cell.isRevealed = true;
    if (cell.isLoose) continue;

    if (cell.adjacentCount === 0) {
      for (const n of neighbors(next, r, c)) {
        const neighbor = next[n.row][n.col];
        if (!neighbor.isRevealed && !neighbor.isFlagged) stack.push(n);
      }
    }
  }

  return next;
}

/**
 * The classic double-click: on a revealed number whose flag count already matches,
 * open every remaining neighbour at once.
 */
export function chordAt(board: Board, row: number, col: number): Board {
  const cell = board[row][col];
  if (!cell.isRevealed || cell.adjacentCount === 0) return board;

  const around = neighbors(board, row, col);
  const flagged = around.filter((n) => board[n.row][n.col].isFlagged).length;
  if (flagged !== cell.adjacentCount) return board;

  let next = board;
  for (const n of around) {
    const neighbor = next[n.row][n.col];
    if (!neighbor.isRevealed && !neighbor.isFlagged) {
      next = revealFrom(next, n.row, n.col);
    }
  }
  return next;
}

export function hasWon(board: Board): boolean {
  return board.every((row) => row.every((cell) => cell.isLoose || cell.isRevealed));
}

export function hasSteppedOnLooseTile(board: Board): boolean {
  return board.some((row) => row.some((cell) => cell.isLoose && cell.isRevealed));
}

/** On a loss, show every loose tile that was not already flagged. */
export function revealAllLooseTiles(board: Board): Board {
  const next = cloneBoard(board);
  for (const row of next) {
    for (const cell of row) {
      if (cell.isLoose && !cell.isFlagged) cell.isRevealed = true;
    }
  }
  return next;
}

/** On a win, the remaining loose tiles are auto-flagged so the counter lands on zero. */
export function flagAllLooseTiles(board: Board): Board {
  const next = cloneBoard(board);
  for (const row of next) {
    for (const cell of row) {
      if (cell.isLoose) cell.isFlagged = true;
    }
  }
  return next;
}

export function countFlags(board: Board): number {
  return board.reduce(
    (total, row) => total + row.filter((cell) => cell.isFlagged).length,
    0,
  );
}
