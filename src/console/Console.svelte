<script lang="ts">
  import { afterUpdate } from "svelte";
  import { IColoredText, coloredStringsTag as ct } from "./ColoredText";
  import { ColoredTextList } from "./ColoredTextList";
  import ColoredText from "./ColoredText.svelte";

  export let promptString: string;
  export let maxLines: number;
  export let commandHandler: (command: string, ...args: string[]) => void;
  export let inputHandler: (input: string) => void;

  const list = new ColoredTextList(maxLines);

  let consoleContainer: HTMLDivElement;
  let input: HTMLInputElement;

  export const set = (...lines: IColoredText[]) => {
    list.set(...lines);
    list.lines = list.lines;
  };

  export const append = (...lines: IColoredText[]) => {
    list.append(...lines);
    list.lines = list.lines;
  };

  export const clear = () => {
    list.clear();
    list.lines = list.lines;
  };

  const submitHandler = () => {
    // remove all newlines
    const inputValue = input.value.replace(/(\r\n|\n|\r)/gm, "");
    input.value = "";

    // show the last input
    append(ct`black${promptString} grey${inputValue}`);

    if (inputValue.charAt(0) === "/") {
      const [command, ...args] = inputValue.slice(1).split(" ");
      commandHandler(command, ...args);
    } else {
      inputHandler(inputValue);
    }
  };

  const clickHandler = () => {
    input.focus({
      preventScroll: true,
    });
  };

  afterUpdate(() => {
    consoleContainer.scrollTop = consoleContainer.scrollHeight;
  });
</script>

<div
  bind:this={consoleContainer}
  on:click|preventDefault={clickHandler}
  class="webConsole"
>
  <div>
    {#each list.lines as coloredText}
      <div>
        <ColoredText {coloredText} />
      </div>
    {/each}
  </div>

  <div class="input">
    <pre class="prompt">{promptString}</pre>
    <form on:submit|preventDefault={submitHandler} class="form">
      <input bind:this={input} class="chatInput" type="text" />
    </form>
  </div>
</div>

<style>
  .webConsole {
    border: 1px solid black;
    padding: 1em;
    margin: auto;
    font-family: monospace;
    font-style: normal;

    font-size: 1.5em;
    max-width: 20em;
    line-height: normal;
    height: 20em;

    overflow-y: auto;
    word-break: break-word;
  }

  .webConsole .input {
    display: flex;
  }

  .webConsole .input .prompt {
    margin: 0;
  }

  .chatInput {
    width: 100%;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    font: inherit;
  }
</style>
