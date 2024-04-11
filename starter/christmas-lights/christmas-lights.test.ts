import { describe, expect, it, test } from "vitest";
import { Grid, Val, updateCoordRange } from "./christmas-lights";

describe("4x4", () => {
  const size = {
    cols: 4,
    rows: 4,
    fill: 0,
  } as const;

  it("Can set grid cell values", () => {
    const grid = getMatrix(size);

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

    expect(getGridCount(grid)).toBe(4);

    updateCoordRange({
      grid,
      start: { x: 1, y: 1 },
      end: { x: 2, y: 2 },
      value: 1,
    });
    // 1100
    // 1110
    // 0110
    // 0000

    expect(getGridCount(grid)).toBe(7);
  });

  it("Can toggle cell values", () => {
    const grid = getMatrix(size);

    expect(getGridCount(grid)).toBe(0);

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

    expect(getGridCount(grid)).toBe(16);

    updateCoordRange({
      grid,
      start: { x: 1, y: 1 },
      end: { x: 2, y: 2 },
      value: "toggle",
    });
    // 1111
    // 1001
    // 1001
    // 1111

    expect(getGridCount(grid)).toBe(12);
  });
});

describe("1000x1000", () => {
  const size = {
    cols: 1000,
    rows: 1000,
    fill: 0,
  } as const;

  test("turn off first row", () => {
    const grid = getMatrix(size);

    updateCoordRange({
      grid,
      value: 1,
      start: { x: 0, y: 0 },
      end: { x: 999, y: 999 },
    });

    expect(getGridCount(grid)).toEqual(1_000_000);

    updateCoordRange({
      grid,
      value: 0,
      start: { x: 0, y: 0 },
      end: { x: 0, y: 999 },
    });

    expect(getGridCount(grid)).toEqual(999_000);
  });

  test("turn off center 4 tiles", () => {
    const grid = getMatrix(size);

    updateCoordRange({
      grid,
      value: 1,
      start: { x: 0, y: 0 },
      end: { x: 999, y: 999 },
    });

    expect(getGridCount(grid)).toEqual(1_000_000);

    updateCoordRange({
      grid,
      value: 0,
      start: { x: 499, y: 499 },
      end: { x: 500, y: 500 },
    });

    expect(getGridCount(grid)).toEqual(999_996);
  });

  it("Passes the test operations", () => {
    const grid = getMatrix(size);

    updateCoordRange({
      grid,
      value: 1,
      start: { x: 887, y: 9 },
      end: { x: 959, y: 629 },
    });
    updateCoordRange({
      grid,
      value: 1,
      start: { x: 454, y: 398 },
      end: { x: 844, y: 448 },
    });
    updateCoordRange({
      grid,
      value: 0,
      start: { x: 539, y: 243 },
      end: { x: 559, y: 965 },
    });
    updateCoordRange({
      grid,
      value: 0,
      start: { x: 370, y: 819 },
      end: { x: 676, y: 868 },
    });
    updateCoordRange({
      grid,
      value: 0,
      start: { x: 145, y: 40 },
      end: { x: 370, y: 997 },
    });
    updateCoordRange({
      grid,
      value: 0,
      start: { x: 301, y: 3 },
      end: { x: 808, y: 453 },
    });
    updateCoordRange({
      grid,
      value: 1,
      start: { x: 351, y: 678 },
      end: { x: 951, y: 908 },
    });
    updateCoordRange({
      grid,
      value: "toggle",
      start: { x: 720, y: 196 },
      end: { x: 897, y: 994 },
    });
    updateCoordRange({
      grid,
      value: "toggle",
      start: { x: 831, y: 394 },
      end: { x: 904, y: 860 },
    });

    expect(getGridCount(grid)).toEqual(230_022);
  });
});

function getGridCount(grid: Grid) {
  let count = 0;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (grid[x][y] === 1) {
        count++;
      }
    }
  }
  return count;
}

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

function getMatrix(args: { cols: number; rows: number; fill: Val }) {
  const { cols, rows, fill } = args;
  const matrix: Array<Array<Val>> = [];
  for (let x = 0; x < rows; x++) {
    const row = new Array<Val>();
    for (let y = 0; y < cols; y++) {
      row.push(fill);
    }
    matrix.push(row);
  }
  return matrix;
}
