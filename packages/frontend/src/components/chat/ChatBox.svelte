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

<div class="border-4 h-80 overflow-y-auto max-w-2xl flex flex-col">
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
