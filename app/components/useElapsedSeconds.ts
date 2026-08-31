import { useEffect, useState } from "react";

import type { GameStatus } from "~/game/types";

/**
 * Ticks once a second while the run is live, and freezes on the recorded time
 * once it ends. Runs client-side only, so it never fights hydration.
 */
export function useElapsedSeconds(
  startedAt: number | null,
  status: GameStatus,
  finishedIn: number | null,
): number {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (status !== "playing" || startedAt === null) return;

    setSeconds(Math.floor((Date.now() - startedAt) / 1000));
    const interval = window.setInterval(() => {
      setSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 250);

    return () => window.clearInterval(interval);
  }, [startedAt, status]);

  if (status === "idle") return 0;
  if (finishedIn !== null) return finishedIn;
  return seconds;
}
