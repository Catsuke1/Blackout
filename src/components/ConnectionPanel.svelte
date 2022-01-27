<script lang="ts">
  import { Color } from "../game/GameData";

  import { Connection } from "../connection/Connection";
  import { Client, Multiplayer, Game } from "../stores";
  import ConnectionDetails from "./ConnectionDetails.svelte";

  let open = $Client.open();

  let connectionId = "";
  let connection: Connection;

  $Client.remoteConnection = (remoteConnection) => {
    connection = remoteConnection;

    Multiplayer.update((currentHandler) => {
      currentHandler.setupConnection(connection, Color.Black);

      return currentHandler;
    });

    Game.update((currentGame) => {
      currentGame.reset();
      return currentGame;
    });
  };

  $Client.connectionClient.closeConnection = (connectionId) => {
    if (connectionId === $Multiplayer.connectionId) {
      Multiplayer.update((currentMultiplayer) => {
        currentMultiplayer.closeConnection();

        return currentMultiplayer;
      });
    }
  };

  const handleConnect = async () => {
    try {
      connection = await $Client.connectionClient.connect(connectionId);
    } catch {
      console.log("failed to connect!");
      return;
    }

    Multiplayer.update((currentHandler) => {
      currentHandler.setupConnection(connection, Color.White);

      return currentHandler;
    });

    Game.update((currentGame) => {
      currentGame.reset();
      return currentGame;
    });
  };

  const handleDisconnect = () => {
    $Client.connectionClient.disconnect($Multiplayer.connectionId);

    Multiplayer.update((currentMultiplayer) => {
      currentMultiplayer.closeConnection();

      return currentMultiplayer;
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

    {#if $Multiplayer.connected}
      <ConnectionDetails />

      <button type="button" on:click={handleDisconnect}>Disconnect</button>
    {/if}
  {/await}
</div>

<style>
  .panelContainer {
    margin: 1em;
  }
</style>
