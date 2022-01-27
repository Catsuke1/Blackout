<script lang="ts">
  import ColoredString from "./ColoredString.svelte";
  import { IColoredText } from "./ColoredText";

  export let coloredText: IColoredText;
</script>

{#each coloredText.parts as coloredString}
  <ColoredString {coloredString} />
{/each}
