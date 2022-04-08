<script>
  import ChatButton from "../components/chat/ChatButton.svelte";
  import socket from "../socket/index";

  export let brushColor;
  export let brushRadius;
  export let SDraw;

  let erasingAudio = new Audio("sounds/erasing_sound.mp3");
  let clickingAudio = new Audio("sounds/clicking_sound.mp3");
  // Set volume to 30% for erasingAudio
  erasingAudio.volume = 0.3;
  // Set volume to 40% for clickingAudio
  clickingAudio.volume = 0.4;

  function clear() {
    SDraw.clearDrawings();
  }

  const colourYellow = () => {
    brushColor = "#FFE100";
    clickingAudio.play();
  };
  const colourBlue = () => {
    brushColor = "#37a0ff";
    clickingAudio.play();
  };
  const colourRed = () => {
    brushColor = "#ea1000";
    clickingAudio.play();
  };
  const colourGreen = () => {
    brushColor = "#2dce00";
    clickingAudio.play();
  };
</script>

<main>
  <div class="mt-3 p-0.5 border-green-400 rounded-xl bg-gray-200">
    <div class=" flex-1 flex space-x-2 justify-center items-center">
      <ChatButton
        styles="!bg-yellow-400"
        on:buttonClicked={() => {
          clear();
          erasingAudio.play();
          socket.emit("canvas:clear");
        }}
      >
        CLEAR
      </ChatButton>
      <div class="m-2 flex items-center space-x-1">
        <label for="colorSelect">COLOR</label>
        <input type="color" bind:value={brushColor} id="colorSelect" />
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
        <label for="sizeSelect">SIZE</label>
        <input
          type="range"
          bind:value={brushRadius}
          id="sizeSelect"
          min="1"
          max="40"
          step="0.1"
        />
      </div>
    </div>
  </div>
</main>
