<script>
  import { createEventDispatcher } from "svelte";
  import Icon from 'svelte-awesome';
  import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

  export let disabled = false;
  export let value = "";
  export let frequency = 0;
  export let teamSize = 0;
  export let turnedOff = false;

  const dispatch = createEventDispatcher();

  let buttonClicked = () => dispatch("guess", value);
</script>

<button
  {disabled}
  on:click={buttonClicked}
  class="disabled:brightness-105 disabled:border-green-400 border-2 transition-all {(frequency / teamSize * 100) > 50 ? "bg-green-400" : "bg-gray-200" }  duration-200 p-2 w-full rounded-lg hover:brightness-95 {turnedOff ? "cursor-not-allowed bg-gray-200 text-gray-400 border-0" : ""}"
>
  <div class="flex justify-center flex-row">
    {#if (frequency / teamSize * 100) > 50}
      <div class="flex-initial mr-1"><Icon data="{faPaperPlane}"/></div>
    {/if}
    <div class="flex-initial mr-1"><slot /></div>
    <div class="flex-initial mr-1 font-medium truncate">{value}</div>
    <div class="flex-initial mr-1 whitespace-nowrap"> - {frequency}/{teamSize}</div>
  </div>
</button>
