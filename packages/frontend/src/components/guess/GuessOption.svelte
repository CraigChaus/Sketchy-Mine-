<script>
  import { createEventDispatcher } from "svelte";

  export let disabled = false;
  export let value = "";
  export let frequency = 0;
  export let teamSize = 0;
  const dispatch = createEventDispatcher();

  let buttonClicked = () => dispatch("guess", value);
</script>

<button
  {disabled}
  on:click={buttonClicked}
  class="disabled:bg-gray-100 disabled:border-green-400 border-2 transition-colors bg-gray-200 duration-200 p-2 w-full rounded-lg hover:bg-gray-300"
>
  <p>
    <slot /> <span class="font-medium">{value}</span> - {frequency}/{teamSize}
  </p>
</button>
