<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { toPos } from "src/game/Position";
  import { SquareType } from "src/game/SquareTypes";

  export let squareData: {
    row: number;
    column: number;
    squareType: SquareType;
    isBlack: boolean;
  };

  const classList = `square 
  ${squareData.isBlack ? "black" : ""}`;

  // reactive vars
  let text: string = "";
  let card: string = "";
  let highlight: string = "";

  export const setHighlight = (flag: boolean) => {
    highlight = flag ? "highlight" : "";
  };

  export const setType = (type: SquareType) => {
    if (type === SquareType.Card) {
      card = "card";
    } else {
      card = "";
    }

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

    squareData.squareType = type;
  };

  setType(squareData.squareType);

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch("square-click", {
      position: toPos(squareData.row, squareData.column),
      squareType: squareData.squareType,
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
