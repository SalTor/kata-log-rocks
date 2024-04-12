export type Grid = Array<Array<number>>;
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
    grid[x][y] += 2;
  } else {
    if (value === 1) {
      grid[x][y] += 1;
    } else if (value === 0) {
      grid[x][y] = Math.max(grid[x][y] - 1, 0);
    }
  }
}

export function getGridBrightness(grid: Grid) {
  let count = 0;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      count += grid[x][y];
    }
  }
  return count;
}
