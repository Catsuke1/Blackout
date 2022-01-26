<script lang="ts">
  import { Color } from "../game/GameData";

  import { Connection } from "../connection/Connection";
  import { Client, ConnectionStore, Game } from "../stores";

  let open = $Client.open();

  let connectionId = "";
  let connected = false;
  let connection: Connection;

  $Client.remoteConnection = (remoteConnection) => {
    connection = remoteConnection;
    connected = true;

    ConnectionStore.set({
      connected,
      connection,
      color: Color.Black,
    });

    Game.update((currentGame) => {
      currentGame.reset();
      return currentGame;
    });
  };

  const handleConnect = async () => {
    try {
      connection = await $Client.connectionClient.connect(connectionId);
    } catch {
      console.log("failed to connect!");
      return;
    }

    connected = true;

    ConnectionStore.set({
      connected,
      connection,
      color: Color.White,
    });

    Game.update((currentGame) => {
      currentGame.reset();
      return currentGame;
    });
  };
</script>

<div class="panelContainer">
  {#await open}
    <p>Creating peer...</p>
  {:then id}
    <p>Created peer with id:</p>
    <pre>{id}</pre>

    <label for="connectionId">Connection ID</label>
    <input type="text" id="connectionId" bind:value={connectionId} />

    <button type="button" on:click={handleConnect}>Connect</button>

    {#if connected}
      <p>Connected to {connection.id}</p>
    {/if}
  {/await}
</div>

<style>
  .panelContainer {
    margin: 1em;
  }
</style>
