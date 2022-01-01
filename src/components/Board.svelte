<script lang="ts">
  import { BoardData } from "src/game/BoardData";
  import { IPosition, toPos } from "src/game/Position";
  import { SquareTypes } from "src/game/SquareTypes";
  import { forEach2d, make2dArray } from "src/game/arrayUtils";
  import Square from "src/components/Square.svelte";

  export let boardData: BoardData;

  let squares: Square[][] = make2dArray(boardData.rows, boardData.columns);

  const getSquare = (position: IPosition) => {
    return squares[position.row][position.column];
  };

  const forEachSquare = (fn: (square: Square, position: IPosition) => void) => {
    forEach2d(squares, (square, row, column) => {
      fn(square, toPos(row, column));
    });
  };

  export const setBoard = (boardData: BoardData) => {
    boardData.forEachSquareType((type, position) => {
      squares[position.row][position.column].setType(type);
    });
  };

  export const highlightSquares = (positions: IPosition[]) => {
    for (const position of positions) {
      getSquare(position).setHighlight(true);
    }
  };

  export const clearHighlights = () => {
    forEachSquare((square, _) => {
      square.setHighlight(false);
    });
  };

  let isBlack = false;

  const rows: {
    row: number;
    column: number;
    squareType: SquareTypes;
    isBlack: boolean;
  }[][] = [];

  let squareRow: {
    row: number;
    column: number;
    squareType: SquareTypes;
    isBlack: boolean;
  }[] = [];

  for (let row = 0; row < boardData.squareTypes.length; row++) {
    for (let column = 0; column < boardData.squareTypes[row].length; column++) {
      isBlack = !isBlack;
      squareRow.push({
        row,
        column,
        squareType: boardData.squareTypes[row][column],
        isBlack,
      });
    }
    isBlack = !isBlack;
    rows.push(squareRow);
    squareRow = [];
  }
</script>

<div class="board">
  {#each rows as row}
    <div class="row">
      {#each row as square}
        <Square
          bind:this={squares[square.row][square.column]}
          {square}
          on:square-click
        />
      {/each}
    </div>
  {/each}
</div>

<style>
  .board {
    display: flex;
    flex-direction: column;

    border: 1px solid rgb(0, 0, 0);
    border-radius: 2px;
    width: fit-content;

    user-select: none;
    cursor: grab;
  }

  .row {
    display: flex;
  }
</style>
