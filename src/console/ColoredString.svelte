<script lang="ts">
  import { IColoredString } from "./ColoredText";

  export let coloredString: IColoredString;
</script>

<span style="--text-color: {coloredString.color}" class="coloredText">
  {coloredString.text}
</span>

<style>
  .coloredText {
    color: var(--text-color, black);
  }
</style>
