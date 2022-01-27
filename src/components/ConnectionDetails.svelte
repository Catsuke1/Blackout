<script lang="ts">
  import { Who } from "../game/MultiplayerHandler";

  import { Color } from "../game/GameData";
  import { Multiplayer } from "../stores";

  $: voteExists = $Multiplayer.newGameRequest !== undefined;
  $: who = (() => {
    if ($Multiplayer.newGameRequest === Who.Me) {
      return "Requesting a new game";
    }

    if ($Multiplayer.newGameRequest === Who.Them) {
      return "Opponent is requesting a new game";
    }

    return "";
  })();
</script>

{#if $Multiplayer.connected}
  <p>Connected to {$Multiplayer.connectionId}</p>

  <p>
    You are {$Multiplayer.myColor === Color.White ? "white" : "black"}.
  </p>

  {#if voteExists}
    <p>{who} (1/2)</p>
  {/if}
{/if}
