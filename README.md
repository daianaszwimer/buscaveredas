# Buscabaldosas

Buscaminas, pero de Buenos Aires.

Sos un porteño caminando por la vereda. Casi todas las baldosas están firmes, pero algunas están
**flojas**: si pisás una, te salpica el agua podrida que junta abajo y perdiste. El juego es el
buscaminas de siempre, con la estética del Minesweeper de Windows XP.

## Cómo se juega

- **Clic izquierdo**: pisás la baldosa.
- **Clic derecho**: le ponés una banderita si sospechás que está floja.
- El **número** de una baldosa firme dice cuántas de sus ocho vecinas están flojas.
- **Doble clic** sobre un número que ya tiene todas sus banderitas puestas abre las vecinas que faltan.
- La **primera pisada nunca te moja**: las flojas se reparten recién después del primer clic.
- Ganás cuando pisaste todas las baldosas firmes.

### Dificultades

| Barrio | Tablero | Baldosas flojas |
| --- | --- | --- |
| Recoleta | 9 × 9 | 10 |
| Almagro | 16 × 16 | 40 |
| Constitución | 30 × 16 | 99 |

Se cambian desde el menú **Juego**.

## Stack

- [Remix](https://remix.run/) v2 + Vite
- React 18 + TypeScript
- Tailwind CSS

Todo el estado del juego vive en el cliente, en un `useReducer`. Remix solo sirve la página: no hay
`loader`, ni `action`, ni sesiones, ni base de datos.

El código está escrito en inglés; los textos que ve el jugador están en castellano rioplatense y
viven todos juntos en `app/game/copy.ts`.

## Correrlo local

```bash
npm install
npm run dev          # http://localhost:5173
```

Para probar el build de producción:

```bash
npm run build
npm start            # http://localhost:3000
```

Y para chequear tipos:

```bash
npm run typecheck
```

## Estructura

```
app/
  game/          Lógica pura del juego, sin React
    types.ts       Tipos del dominio (Cell, Board, GameState, GameAction)
    board.ts       Armado del tablero, flood fill, acorde, condición de victoria
    reducer.ts     Transiciones de estado
    copy.ts        Textos en castellano y definición de las dificultades
  components/    UI con la estética de Windows XP
    XPWindow.tsx   Ventana con barra de título azul
    MenuBar.tsx    Menús Juego / Ayuda
    Board.tsx      Grilla y celdas
    LedDisplay.tsx Contadores rojos de siete segmentos
    SmileyButton.tsx  La carita en sus cuatro estados (PNGs de public/faces)
    TileIcons.tsx  Gota de agua (PNG), banderita y banderita tachada (SVG)
    Dialog.tsx     Modales de ayuda
  routes/
    _index.tsx     Arma la ventana y conecta el reducer
  root.tsx       Documento HTML y fondo estilo Bliss
  tailwind.css   Biseles 3D y el fondo Bliss
public/
  faces/         Las cuatro caritas pixel art del panel
  tiles/         La gota de agua de la baldosa floja
  favicon.png    La misma gota, como ícono de la pestaña
  bliss.jpg      El fondo de escritorio de Windows XP
```

## Deploy en Railway

El repo trae un `Dockerfile`, así que Railway lo detecta y buildea solo:

1. `railway init` (o crear el proyecto desde el dashboard y conectar este repo).
2. Railway inyecta `PORT`; `remix-serve` ya lo respeta, no hace falta configurar nada.
3. `railway up`, o push a la rama conectada para que deploye automáticamente.

Al ser todo client-side no hay estado compartido entre requests, así que se puede escalar a las
réplicas que quieras.

## Créditos

Las imágenes del juego, todas pixel art, normalizadas a PNG cuadrado y transparente de 96×96
(la gota además a 128×128 para el favicon):

| Asset | Origen |
| --- | --- |
| `faces/smile.png` | [MINESWEEPER_SMILEY.png](https://commons.wikimedia.org/wiki/File:MINESWEEPER_SMILEY.png) — Wikimedia Commons, dominio público (Microsoft) |
| `faces/dead.png` | [MINESWEEPER_SMILEY_DEATH.png](https://commons.wikimedia.org/wiki/File:MINESWEEPER_SMILEY_DEATH.png) — Wikimedia Commons, dominio público (Microsoft) |
| `faces/surprised.png` | [Pixilart](https://art.pixilart.com/sr21eb54f1253aws3.png) |
| `faces/cool.png` | [Tenor](https://media.tenor.com/VUK9_wBOpTcAAAAe/minesweeper-swag.png) |
| `tiles/water-drop.png`, `favicon.png` | [Shutterstock 2609055147](https://www.shutterstock.com/image-vector/single-drop-water-pixel-art-260nw-2609055147.jpg) |
| `bliss.jpg` | *Bliss*, el fondo de escritorio de Windows XP (Charles O'Rear / Microsoft), reescalado a 1920px y comprimido a JPEG |

Las dos de Wikimedia Commons son dominio público. Las otras no declaran una licencia libre y
*Bliss* es una foto con copyright de Microsoft: para un proyecto personal no cambia nada, pero
conviene revisarlo si el juego se publica.
