export function forEach2d<T>(
  array2d: T[][],
  fn: (element: T, row: number, column: number) => void
) {
  for (let row = 0; row < array2d.length; row++) {
    for (let column = 0; column < array2d[row].length; column++) {
      fn(array2d[row][column], row, column);
    }
  }
}

export function make2dArray(rows: number, columns: number) {
  var array = new Array(rows);

  for (let row = 0; row < rows; row++) {
    array[row] = new Array(columns);
  }

  return array;
}
