export type Grid = Array<Array<Val>>;
export type Coord = { x: number; y: number };
export type Val = 0 | 1 | "toggle";

type Args = {
  grid: Grid;
  start: Coord;
  end: Coord;
  value: Val;
};
export function updateCoordRange(args: Args) {
  const { grid, start, end, value } = args;

  for (let x = start.x; x <= end.x; x++) {
    for (let y = start.y; y <= end.y; y++) {
      updateCoord(grid, x, y, value);
    }
  }
}

function updateCoord(grid: Grid, x: number, y: number, value: Val) {
  if (value === "toggle") {
    grid[x][y] = grid[x][y] === 1 ? 0 : 1;
  } else {
    grid[x][y] = value;
  }
}
