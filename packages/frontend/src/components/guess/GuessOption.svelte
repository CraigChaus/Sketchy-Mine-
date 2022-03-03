<script>
  import { createEventDispatcher } from "svelte";
  import Icon from 'svelte-awesome';
  import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
  class="disabled:brightness-105 disabled:border-green-400 border-2 transition-all {(frequency / teamSize * 100) > 50 ? "bg-green-400" : "bg-gray-200" }  duration-200 p-2 w-full rounded-lg hover:brightness-95"
>
  <p>
    {#if (frequency / teamSize * 100) > 50}
      <Icon data="{faPaperPlane}"/>
    {/if}
    <slot /> <span class="font-medium">{value}</span> - {frequency}/{teamSize}
  </p>
</button>
