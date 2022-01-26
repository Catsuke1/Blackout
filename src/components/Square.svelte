<script lang="ts">
  import { Game } from "../stores";
  import { createEventDispatcher } from "svelte";
  import { toPos } from "../game/Position";
  import { SquareType } from "../game/SquareTypes";

  export let squareData: {
    row: number;
    column: number;
    isBlack: boolean;
  };

  export let squareSize = 5;

  let text: string = "";

  let highlight: boolean = false;
  let card: boolean = false;

  export const setHighlight = (flag: boolean) => {
    highlight = flag;
  };

  export const setType = (type: SquareType) => {
    card = type === SquareType.Card;

    switch (type) {
      case SquareType.Empty:
      case SquareType.Card:
        text = "";
        break;

      case SquareType.WhitePiece:
        text = "♕";
        break;

      case SquareType.BlackPiece:
        text = "♛";
        break;
    }

    return type;
  };

  $: squareType = setType(
    $Game.boardData.squareTypes[squareData.row][squareData.column]
  );

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch("square-click", {
      position: toPos(squareData.row, squareData.column),
      squareType: squareType,
    });
  };
</script>

<div
  class="square"
  class:black={squareData.isBlack}
  class:highlight
  class:card
  on:click={handleClick}
  style="--squareSize: {squareSize}rem"
>
  {text}
</div>

<style>
  .square {
    width: var(--squareSize);
    height: var(--squareSize);
    font-size: var(--squareSize);
    line-height: 1;

    color: black;
    background-color: #eeeed2;
  }

  .black {
    background-color: #769656;
  }

  .highlight {
    background-color: #ec7e6a;
  }

  .highlight.black {
    background-color: #d46c51;
  }

  .card {
    background-color: rgb(82, 176, 220);
  }

  .card.black {
    background-color: rgb(59, 153, 197);
  }
</style>
