<script>
  export let sender = "Unknown User";
  export let message = "Unknown message";
  export let type = false;
</script>

<div class="flex-1 w-full h-full flex max-h-full">
  {#if type === 1}
    <div class="ml-3" />
    <div
      class="bg-blue-700 my-1 p-2 rounded-l-2xl text-white ml-auto flex items-center h-full"
    >
      <p class="text-right">{message}</p>
    </div>
  {:else if type === 2}
    <div class="bg-gray-600 my-1 p-2 rounded-r-2xl text-white mr-3 h-full">
      <p class="font-bold text-blue-400 text-xs">{sender}</p>
      <p>{message}</p>
    </div>
  {:else}
    <div
      class="my-5 p-2 border-t-4 border-b-4 border-red-500 bg-gray-100 flex-1 flex flex-col h-full"
    >
      <p class="font-bold text-red-500 text-xs text-center">{sender}</p>
      <p>{message}</p>
    </div>
  {/if}
</div>
