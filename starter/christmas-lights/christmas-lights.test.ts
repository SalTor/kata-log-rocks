import { expect, it } from "vitest";
import { Grid, getGridBrightness, updateCoordRange } from "./christmas-lights";

const size = {
  cols: 4,
  rows: 4,
  fill: 0,
} as const;

it("Can set grid cell values", () => {
  const grid = getMatrix(size);
  // 0000
  // 0000
  // 0000
  // 0000

  updateCoordRange({
    grid,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    value: 1,
  });
  // 1100
  // 1100
  // 0000
  // 0000

  expect(getGridBrightness(grid)).toBe(4);

  updateCoordRange({
    grid,
    start: { x: 1, y: 1 },
    end: { x: 2, y: 2 },
    value: 1,
  });
  // 1100
  // 1210
  // 0110
  // 0000

  expect(getGridBrightness(grid)).toBe(8);
});

it("Can toggle cell values", () => {
  const grid = getMatrix(size);

  expect(getGridBrightness(grid)).toBe(0);

  updateCoordRange({
    grid,
    start: { x: 0, y: 0 },
    end: { x: 3, y: 3 },
    value: 1,
  });
  // 1111
  // 1111
  // 1111
  // 1111

  expect(getGridBrightness(grid)).toBe(16);

  updateCoordRange({
    grid,
    start: { x: 1, y: 1 },
    end: { x: 2, y: 2 },
    value: "toggle",
  });
  // 1111
  // 1331
  // 1331
  // 1111

  expect(getGridBrightness(grid)).toBe(24);
});

export function printGrid(grid: Grid) {
  let str = "";
  for (let x = 0; x < grid.length; x++) {
    let row = "";
    for (let y = 0; y < grid[x].length; y++) {
      row += grid[x][y];
    }
    str += `${row}\n`;
  }
  return str;
}

function getMatrix(args: { cols: number; rows: number; fill: 0 | 1 }) {
  const { cols, rows, fill } = args;
  const matrix: Grid = [];
  for (let x = 0; x < rows; x++) {
    const row = new Array<0 | 1>();
    for (let y = 0; y < cols; y++) {
      row.push(fill);
    }
    matrix.push(row);
  }
  return matrix;
}
