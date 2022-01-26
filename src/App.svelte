<script lang="ts">
  import ConnectionPanel from "./components/ConnectionPanel.svelte";

  import Game from "./components/Game.svelte";
</script>

<div class="container">
  <h1>Blackout</h1>

  <ConnectionPanel />

  <Game />
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    color: #dbdbdb;
    background-color: #181a1b;
  }

  .container {
    max-width: fit-content;
    margin: 0 auto;
  }
</style>
