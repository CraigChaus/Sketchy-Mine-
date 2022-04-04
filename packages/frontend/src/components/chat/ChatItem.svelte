<script>
  /**
   * ChatItem component
   * Represents individual chat messages that can be placed in the ChatBox component
   */
  export let sender = "Unknown User";
  export let message = "Unknown message";
  export let type = false; // 1 -> self, 2 -> other, 3 -> system
  //Added time variable to keep track of time
  export let currentTime = "";
</script>

<div class="flex-1 w-full h-full flex max-h-20 my-1">
  {#if type === 1}
    <div class="ml-3" />
    <div
      class="bg-blue-700 p-2 rounded-l-2xl text-white ml-auto items-center h-full"
    >
      <p class="font-bold text-xs text-right italic">{currentTime}</p>
      <!-- Line break without trying to preserve whole words for all messages-->
      <p class="text-right break-all">{message}</p>
    </div>
  {:else if type === 2}
    <div class="bg-gray-600 p-2 rounded-r-2xl text-white mr-3 h-full">
      <p class="font-bold text-blue-400 text-xs">{sender} {currentTime}</p>
      <p class="break-all">{message}</p>
    </div>
  {:else}
    <div
      class="p-2 border-t-4 border-b-4 border-red-500 bg-gray-100 flex-1 flex flex-col h-full"
    >
      <p class="font-bold text-red-500 text-xs text-center">
        {sender}
        {currentTime}
      </p>
      <p class="break-all">{message}</p>
    </div>
  {/if}
</div>
