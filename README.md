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
    SmileyButton.tsx  La carita (normal, empapada, con anteojos)
    TileIcons.tsx  Baldosa floja, banderita, banderita tachada
    Dialog.tsx     Modales de ayuda
  routes/
    _index.tsx     Arma la ventana y conecta el reducer
  root.tsx       Documento HTML y fondo estilo Bliss
  tailwind.css   Biseles 3D y el degradado del fondo
```

## Deploy en Railway

El repo trae un `Dockerfile`, así que Railway lo detecta y buildea solo:

1. `railway init` (o crear el proyecto desde el dashboard y conectar este repo).
2. Railway inyecta `PORT`; `remix-serve` ya lo respeta, no hace falta configurar nada.
3. `railway up`, o push a la rama conectada para que deploye automáticamente.

Al ser todo client-side no hay estado compartido entre requests, así que se puede escalar a las
réplicas que quieras.
