<script lang="ts">
  import { Color } from "../game/GameData";

  import { Connection } from "../connection/Connection";
  import { Client, Multiplayer, Game } from "../stores";
  import ConnectionDetails from "./ConnectionDetails.svelte";
  import { Who } from "../game/MultiplayerHandler";

  let createdPeer = false;
  let open: Promise<string>;

  const handleCreatePeer = async () => {
    createdPeer = true;
    open = $Client.open();

    open.then(() => {
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

      $Client.connectionClient.recievers.push((payload, id) => {
        if (id === $Multiplayer.connectionId) {
          if (payload?.type === "game") {
            Game.update((currentGame) => {
              /*not robust, data may not exist, will pass for now*/
              currentGame.set(payload.data);

              return currentGame;
            });
          } else if (payload?.type === "gameReset") {
            Multiplayer.update((currentMultiplayer) => {
              currentMultiplayer.requestNewGame(Who.Them);

              return currentMultiplayer;
            });
          }
        }
      });
    });
  };

  let connectionId = "";
  let connection: Connection;

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
  {#if createdPeer}
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
  {:else}
    Want to play with somebody?
    <button type="button" on:click={handleCreatePeer}>Create a peer</button>
  {/if}
</div>

<style>
  .panelContainer {
    margin: 1em;
  }
</style>
