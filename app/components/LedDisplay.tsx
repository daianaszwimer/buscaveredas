/** Seven-segment layout: which segments light up for each digit and the minus sign. */
const SEGMENTS: Record<string, string[]> = {
  "0": ["a", "b", "c", "d", "e", "f"],
  "1": ["b", "c"],
  "2": ["a", "b", "g", "e", "d"],
  "3": ["a", "b", "g", "c", "d"],
  "4": ["f", "g", "b", "c"],
  "5": ["a", "f", "g", "c", "d"],
  "6": ["a", "f", "g", "e", "c", "d"],
  "7": ["a", "b", "c"],
  "8": ["a", "b", "c", "d", "e", "f", "g"],
  "9": ["a", "b", "c", "d", "f", "g"],
  "-": ["g"],
};

// Polygon points for each segment inside a 20x36 digit box.
const SHAPES: Record<string, string> = {
  a: "3,2 17,2 14,5 6,5",
  b: "18,3 18,16 15,14 15,6",
  c: "18,20 18,33 15,30 15,22",
  d: "3,34 17,34 14,31 6,31",
  e: "2,20 2,33 5,30 5,22",
  f: "2,3 2,16 5,14 5,6",
  g: "3,18 6,15 14,15 17,18 14,21 6,21",
};

function Digit({ char }: { char: string }) {
  const lit = new Set(SEGMENTS[char] ?? []);
  return (
    <svg viewBox="0 0 20 36" className="block h-[30px] w-[17px]" aria-hidden="true">
      {Object.entries(SHAPES).map(([id, points]) => (
        <polygon
          key={id}
          points={points}
          fill={lit.has(id) ? "#ff2b2b" : "#420000"}
        />
      ))}
    </svg>
  );
}

/** The classic three-digit red counter, clamped like the original (-99 to 999). */
export function LedDisplay({ value, label }: { value: number; label: string }) {
  const clamped = Math.max(-99, Math.min(999, value));
  const text =
    clamped < 0
      ? `-${String(Math.abs(clamped)).padStart(2, "0")}`
      : String(clamped).padStart(3, "0");

  return (
    <div
      className="bevel-in-thin flex items-center gap-[1px] bg-black px-[2px] py-[2px]"
      role="status"
      aria-label={`${label}: ${value}`}
    >
      {text.split("").map((char, index) => (
        <Digit key={index} char={char} />
      ))}
    </div>
  );
}
