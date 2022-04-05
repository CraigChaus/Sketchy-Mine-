<script>
  /**
   * ChatBox Component
   * Used to list chat messages
   */
  import ScrollContainer from "../ScrollContainer.svelte";
  import ChatItem from "./ChatItem.svelte";
  import { afterUpdate } from "svelte";

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

  let container;
  // Run after we rendered new messages to the screen
  afterUpdate(() => {
    // Scroll to the bottom
    container.scrollTo(0, container.scrollHeight);
  });
</script>

<ScrollContainer styles="h-full" bind:container>
  <!-- Show only valid messages -->
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
