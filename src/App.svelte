<script lang="ts">
  import { onMount } from "svelte";
  import ConnectionPanel from "./components/ConnectionPanel.svelte";
  import Game from "./components/Game.svelte";
  import Console from "./console/Console.svelte";

  import { coloredStringsTag as ct } from "./console/ColoredText";
  import { Client, Multiplayer } from "./stores";

  let consoleEl: Console;

  onMount(() => {
    consoleEl.set(ct`blue${"Chat"}`);

    $Client.openTriggers.push(() => {
      $Client.connectionClient.recievers.push((payload, id) => {
        if (id === $Multiplayer.connectionId) {
          // check if it is the correct connection
          if (payload?.type === "text") {
            consoleEl.append(ct`pink ${"<Opponent> "} black${payload.data}`);
          }

          if (payload?.type === "textInfo") {
            consoleEl.append(ct`blue${payload.data}`);
          }
        }
      });
    });

    window.onbeforeunload = () => {
      if ($Multiplayer.connected) {
        $Client.connectionClient.send(
          {
            type: "textInfo",
            data: "Opponent left.",
          },
          $Multiplayer.connectionId
        );
      }

      $Client.connectionClient.disconnectAll();

      Multiplayer.update((currentMultiplayer) => {
        currentMultiplayer.closeConnection();

        return currentMultiplayer;
      });
    };
  });

  const inputHandler = (input: string) => {
    if ($Multiplayer.connected) {
      $Client.connectionClient.send(
        {
          type: "text",
          data: input,
        },
        $Multiplayer.connectionId
      );
    }
  };

  const commandHandler = (command: string, ...args: string[]) => {
    command = command.toLowerCase();

    switch (command) {
      case "":
        break;

      case "clear":
      case "clr":
        consoleEl.clear();

        break;

      default:
        consoleEl.append(ct`red${command} black${": command not found!"}`);
    }
  };
</script>

<div class="container">
  <h1>Blackout</h1>

  <ConnectionPanel />

  <Game />

  <Console
    bind:this={consoleEl}
    promptString={"-> "}
    maxLines={50}
    {inputHandler}
    {commandHandler}
  />
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* :global(body) {
    color: #dbdbdb;
    background-color: #181a1b;
  } */

  .container {
    max-width: fit-content;
    margin: 0 auto;
  }
</style>
