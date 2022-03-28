<script>
  /**
   * ChatButton Component
   * Used as an action button for sending chat
   */
  export let styles = "";
  export let disabled = false;
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let buttonClicked = () => dispatch("buttonClicked");
</script>

<button
  class="mb-2 md:mb-0 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:brightness-100 disabled:text-gray-600 bg-green-500 border border-none px-5 py-2 text-sm font-medium tracking-wider text-white rounded-full hover:brightness-90 transition-all {styles}"
  on:click={buttonClicked}
  {disabled}
>
  <slot />
</button>
