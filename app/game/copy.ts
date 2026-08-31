import type { Difficulty, DifficultyId } from "./types";

/** Every string the player reads lives here, in rioplatense Spanish. */

export const DIFFICULTIES: Record<DifficultyId, Difficulty> = {
  recoleta: { id: "recoleta", rows: 9, cols: 9, looseTiles: 10 },
  almagro: { id: "almagro", rows: 16, cols: 16, looseTiles: 40 },
  constitucion: { id: "constitucion", rows: 16, cols: 30, looseTiles: 99 },
};

export const DEFAULT_DIFFICULTY = DIFFICULTIES.almagro;

export const DIFFICULTY_LABELS: Record<DifficultyId, string> = {
  recoleta: "Recoleta (9×9, 10 flojas)",
  almagro: "Almagro (16×16, 40 flojas)",
  constitucion: "Constitución (30×16, 99 flojas)",
};

export const DIFFICULTY_ORDER: DifficultyId[] = [
  "recoleta",
  "almagro",
  "constitucion",
];

export const copy = {
  windowTitle: "Buscabaldosas",
  menu: {
    game: "Juego",
    help: "Ayuda",
    newGame: "Partida nueva",
    exit: "Salir",
    howToPlay: "Cómo se juega",
    about: "Acerca de",
  },
  status: {
    idle: "Pisá una baldosa para arrancar",
    playing: "Ojo por dónde pisás",
    won: "¡Llegaste seco!",
    lost: "¡Te mojaste!",
  },
  panel: {
    remaining: "Baldosas flojas restantes",
    time: "Tiempo",
    restart: "Empezar de nuevo",
  },
  help: {
    title: "Cómo se juega",
    intro:
      "Sos un porteño caminando por la vereda. Casi todas las baldosas están firmes, pero algunas están flojas: si pisás una, te salpica el agua podrida de abajo y perdiste.",
    rules: [
      "Clic izquierdo para pisar una baldosa.",
      "Clic derecho para marcarla con una banderita si sospechás que está floja.",
      "El número de una baldosa firme dice cuántas de las ocho vecinas están flojas.",
      "Doble clic sobre un número que ya tiene todas sus banderitas puestas abre las vecinas que faltan.",
      "La primera pisada nunca te moja: caminá tranquilo.",
      "Ganás cuando pisaste todas las baldosas firmes.",
    ],
    close: "Cerrar",
  },
  about: {
    title: "Acerca de Buscabaldosas",
    body: "Buscaminas, pero de Buenos Aires. Hecho con Remix y mucha bronca por los zapatos mojados.",
  },
} as const;
