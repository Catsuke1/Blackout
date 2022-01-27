<script lang="ts">
  import { Multiplayer } from "src/stores";
</script>

<div>
  <p>Score</p>
  <p>You: {$Multiplayer.scoreboard[0]}</p>
  <p>Opponent: {$Multiplayer.scoreboard[1]}</p>
</div>
