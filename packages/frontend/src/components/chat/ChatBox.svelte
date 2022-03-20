<script>
  /**
   * ChatBox Component
   * Used to list chat messages
   */
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
  export let messages = [];
</script>

<ScrollContainer styles="h-100">
  {#if messages !== "" || messages !== undefined || messages !== null}
    {#each messages as element}
      <ChatItem
        sender={element.username}
        message={element.message}
        type={element.type}
        currentTime={element.currentTime}
      />
    {/each}
  {/if}
</ScrollContainer>
