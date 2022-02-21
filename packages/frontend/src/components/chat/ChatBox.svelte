<script>
  import ScrollContainer from "../ScrollContainer.svelte";
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

<ScrollContainer>
  {#if contentJSON !== "" || contentJSON !== undefined || contentJSON !== null}
    {#each contentJSON as element}
      <ChatItem
        sender={element.username}
        message={element.message}
        type={element.type}
      />
    {/each}
  {/if}
</ScrollContainer>
