<script lang="ts">
  import Game from "src/components/Game.svelte";
</script>

<div class="container">
  <h1>Blackout</h1>

  <Game />
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    max-width: fit-content;
    margin: 0 auto;
  }
</style>
