<script lang="ts">
  import { Action, Color } from "src/game/GameData";

  import { Game } from "../stores";

  $: turnInfo = (() => {
    if ($Game.winner === Color.White) {
      return "White won! 🎉";
    }

    if ($Game.winner === Color.Black) {
      return "Black won! 🎉";
    }

    let string = "";

    if ($Game.turn.color === Color.White) {
      string += "White is ";
    } else if ($Game.turn.color === Color.Black) {
      string += "Black is ";
    }

    if ($Game.turn.action === Action.Card) {
      string += "placing a card...";
    } else if ($Game.turn.action === Action.Piece) {
      string += "moving a piece...";
    }

    return string;
  })();
</script>

<p>{turnInfo}</p>
