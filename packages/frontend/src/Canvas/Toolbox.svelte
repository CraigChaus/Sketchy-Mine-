<script>
    import ChatButton from "../components/chat/ChatButton.svelte";

    export let brushColor ;
    export let brushRadius;
    export let SDraw ;


    function clear() {
        SDraw.clearDrawings();
    }

</script>

<main>
    <div class="m-2 p-2 border-black, rounded-full, bg-gray-300">
        <div class="align-items-center justify-center">
            <ChatButton on:buttonClicked={clear}>CLEAR</ChatButton>

            <label>COLOUR</label>
            <input type="color" bind:value={brushColor}/>

            <label>SIZE</label>
            <input type="number" bind:value={brushRadius}/>
        </div>

    </div>
</main>