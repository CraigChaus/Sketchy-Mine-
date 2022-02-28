<script>
    import ChatButton from "../components/chat/ChatButton.svelte";

    export let brushColor;
    export let brushRadius;
    export let SDraw;


</script>

<main>
    <div class=" m-2 p-2 border-green-400 rounded-xl bg-gray-300">
        <div class=" flex-1 flex space-x-2 justify-center items-center">
            <ChatButton on:buttonClicked={SDraw.clearDrawings()}>CLEAR</ChatButton>

            <div class="lg:inline m-2">
                <label>COLOUR</label>
                <input type="color" bind:value={brushColor}/>
            </div>

            <div class="lg:inline m-2">
                <label>SIZE</label>
                <input type="range" bind:value={brushRadius}/>
            </div>

        </div>
    </div>
</main>