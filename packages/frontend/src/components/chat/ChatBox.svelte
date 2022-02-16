<script>
  import ChatItem from "./ChatItem.svelte";
  /*
     Expected content:
     [
         {
             "username":"bob",
             "message":"Hello everyone!",
             "type": 1 (self) or 2 (message) or 3 (system)
         }
     ]
     */
  export let contentJSON = [];
</script>

<div class="border-4 max-h-96 overflow-y-auto flex flex-col flex-1">
  {#if contentJSON !== "" || contentJSON !== undefined || contentJSON !== null}
    {#each contentJSON as element}
      <ChatItem
        sender={element.username}
        message={element.message}
        type={element.type}
      />
    {/each}
  {/if}
</div>
