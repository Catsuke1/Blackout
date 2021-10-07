import { Square, SquareTypes } from "./Square";

export function isValidMove(
  square: {
    row: number;
    column: number;
  },
  validMoves: {
    row: number;
    column: number;
  }[]
) {
  for (const move of validMoves) {
    if (square.row === move.row && square.column === move.column) {
      return true;
    }
  }

  return false;
}

export function getValidQueenMoves(
  board: Square[][],
  queenRow: number,
  queenCol: number
) {
  const width = board[0].length;
  const height = board.length;

  const validMoves: {
    row: number;
    column: number;
  }[] = [];

  // top
  for (let row = queenRow - 1; row > -1; row--) {
    if (board[row][queenCol].type !== SquareTypes.Empty) break;
    validMoves.push({ row: row, column: queenCol });
  }

  // bottom
  for (let row = queenRow + 1; row < height; row++) {
    if (board[row][queenCol].type !== SquareTypes.Empty) break;
    validMoves.push({ row: row, column: queenCol });
  }

  // left
  for (let col = queenCol - 1; col > -1; col--) {
    if (board[queenRow][col].type !== SquareTypes.Empty) break;
    validMoves.push({ row: queenRow, column: col });
  }

  // right
  for (let col = queenCol + 1; col < width; col++) {
    if (board[queenRow][col].type !== SquareTypes.Empty) break;
    validMoves.push({ row: queenRow, column: col });
  }

  // diagonal top-right
  for (
    let row = queenRow - 1, col = queenCol + 1;
    row > -1 && col < width;
    row--, col++
  ) {
    if (board[row][col].type !== SquareTypes.Empty) break;
    validMoves.push({ row: row, column: col });
  }

  // diagonal top-left
  for (
    let row = queenRow - 1, col = queenCol - 1;
    row > -1 && col > -1;
    row--, col--
  ) {
    if (board[row][col].type !== SquareTypes.Empty) break;
    validMoves.push({ row: row, column: col });
  }

  // diagonal bottom-right
  for (
    let row = queenRow + 1, col = queenCol + 1;
    row < height && col < width;
    row++, col++
  ) {
    if (board[row][col].type !== SquareTypes.Empty) break;
    validMoves.push({ row: row, column: col });
  }

  // diagonal bottom-left
  for (
    let row = queenRow + 1, col = queenCol - 1;
    row < height && col > -1;
    row++, col--
  ) {
    if (board[row][col].type !== SquareTypes.Empty) break;
    validMoves.push({ row: row, column: col });
  }

  return validMoves;
}
