<script lang="ts">
  import Square from "../components/Square.svelte";
  import { Game } from "../stores";
  import { IPosition } from "../game/Position";
  import { forEach2d, make2dArray } from "../utils/Array2d";

  export let squareSize = 5;

  const squares: Square[][] = make2dArray<Square>(
    $Game.boardData.rows,
    $Game.boardData.columns
  );

  export const highlightSquares = (positions: IPosition[]) => {
    for (const position of positions) {
      squares[position.row][position.column].setHighlight(true);
    }
  };

  export const clearHighlights = () => {
    forEach2d(squares, (square, row, column) => {
      square.setHighlight(false);
    });
  };

  const getIsBlack = (row: number, column: number) => {
    return row % 2 ? !(column % 2) : !!(column % 2);
  };
</script>

<div class="board">
  {#each Array($Game.boardData.rows) as _, row}
    <div class="row">
      {#each Array($Game.boardData.columns) as _, column}
        <Square
          bind:this={squares[row][column]}
          squareData={{
            isBlack: getIsBlack(row, column),
            column,
            row,
          }}
          {squareSize}
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
