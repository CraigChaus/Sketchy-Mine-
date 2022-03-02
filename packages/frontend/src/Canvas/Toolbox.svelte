<script>
    import ChatButton from "../components/chat/ChatButton.svelte";
    import socket from "../socket/index";

    export let brushColor;
    export let brushRadius;
    export let SDraw;

    function clear() {
        SDraw.clearDrawings();
    }

    socket.on('canvas:clear', clear);
</script>

<main>
    <div class=" m-2 p-2 border-green-400 rounded-xl bg-gray-300">
        <div class=" flex-1 flex space-x-2 justify-center items-center">
            <ChatButton on:buttonClicked={() => {clear(); socket.emit('canvas:clear');}}>CLEAR</ChatButton>
            <div class="lg:inline m-2">
                <label>COLOUR</label>
                <input type="color" bind:value={brushColor}/>
            </div>
            <div class="lg:inline m-2">
                <label>SIZE</label>
                <input class="w-1/3" type="number" bind:value={brushRadius}/>
            </div>
        </div>

    </div>
</main>