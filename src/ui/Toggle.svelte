<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Vector2 } from "../utils/Vector2";

  export let text: Vector2<string> = ["off", "on"];
  export let isOn = false;

  const dispatch = createEventDispatcher<{ toggle: boolean }>();

  const handleToggle = () => {
    isOn = !isOn;

    dispatch("toggle", isOn);
  };

  $: buttonText = isOn ? text[1] : text[0];
</script>

<button type="button" on:click={handleToggle}>{buttonText}</button>
