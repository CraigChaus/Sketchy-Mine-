<script>
  import ChatButton from '../components/chat/ChatButton.svelte';
  import socket from '../socket/index';

  export let brushColor;
  export let brushRadius;
  export let SDraw;

  function clear() {
    SDraw.clearDrawings();
  }

  const colourYellow = () => {
    brushColor = '#FFE100';
  };
  const colourBlue = () => {
    brushColor = '#37a0ff';
  };
  const colourRed = () => {
    brushColor = '#ea1000';
  };
  const colourGreen = () => {
    brushColor = '#2dce00';
  };

  // socket.on('canvas:clear', clear);
</script>

<main>
  <div class=" m-2 p-2 border-green-400 rounded-xl bg-gray-300">
    <div class=" flex-1 flex space-x-2 justify-center items-center">
      <ChatButton
        on:buttonClicked={() => {
          clear();
          socket.emit('canvas:clear');
        }}>CLEAR</ChatButton
      >
      <div class="lg:inline m-2">
        <label>COLOUR</label>
        <input type="color" bind:value={brushColor} />
      </div>

      <input
        type="button"
        class="bg-yellow-500 h-8 w-8 rounded-full"
        on:click={colourYellow}
      />
      <input
        type="button"
        class="bg-blue-500 h-8 w-8 rounded-full"
        on:click={colourBlue}
      />
      <input
        type="button"
        class="bg-red-500 h-8 w-8 rounded-full"
        on:click={colourRed}
      />
      <input
        type="button"
        class="bg-green-500 h-8 w-8 rounded-full"
        on:click={colourGreen}
      />

      <div class="lg:inline m-2">
        <label>SIZE</label>
        <input type="range" bind:value={brushRadius} />
      </div>
    </div>
  </div>
</main>
