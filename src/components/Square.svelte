<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { toPos } from "src/game/Position";
  import { SquareTypes } from "src/game/SquareTypes";

  export let square: {
    row: number;
    column: number;
    squareType: SquareTypes;
    isBlack: boolean;
  };

  let highlight = "";

  export const setHighlight = (flag: boolean) => {
    highlight = flag ? "highlight" : "";
  };

  const classList = `square 
  ${square.isBlack ? "black" : ""}`;

  let text: string = "";
  let card: string = "";

  export const setType = (type: SquareTypes) => {
    if (type === SquareTypes.Card) {
      card = "card";
    } else {
      card = "";
    }

    switch (type) {
      case SquareTypes.Empty:
      case SquareTypes.Card:
        text = "";
        break;

      case SquareTypes.WhitePiece:
        text = "♕";
        break;

      case SquareTypes.BlackPiece:
        text = "♛";
        break;
    }

    square.squareType = type;
  };

  setType(square.squareType);

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch("square-click", {
      position: toPos(square.row, square.column),
      squareType: square.squareType,
    });
  };
</script>

<div class="{classList} {highlight} {card}" on:click={handleClick}>
  {text}
</div>

<style>
  .square {
    width: 2rem;
    height: 2rem;
    font-size: 2rem;
    line-height: 1;

    background-color: #eeeed2;
  }

  .black {
    background-color: #769656;
  }

  .highlight.black {
    background-color: #d46c51;
  }

  .highlight {
    background-color: #ec7e6a;
  }

  .card {
    background-color: rgb(255, 167, 167);
  }
</style>
