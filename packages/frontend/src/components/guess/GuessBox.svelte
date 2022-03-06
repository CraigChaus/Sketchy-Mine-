<script>
  import ScrollContainer from "../ScrollContainer.svelte";
  import GuessOption from "./GuessOption.svelte";
  import { createEventDispatcher } from "svelte";
  import socket from "../../socket";

  export let result = "N/A";
  export let teamNumber = 0;
  export let teamSize = 20;
  export let currentGuess = null;
  export let timeRemainingInSeconds = 60;

  export let teamGuesses = [];

  const dispatch = createEventDispatcher();

  function sortGuesses() {
    teamGuesses.sort((a, b) => {
      return b.frequency - a.frequency;
    });
  }

  $: teamGuesses, sortGuesses();

  const guess = (valueEvent) => {
    const guessedValue = valueEvent.detail.toLowerCase();
    currentGuess = guessedValue;
    dispatch("guessClicked", currentGuess);
  };

  const showResult = (payload) => {
    currentGuess = null;
    result = payload.result;
  };

  const clearResult = () => {
    result = "N/A";
  };

  const updateProgress = (payload) => {
    timeRemainingInSeconds = payload.timeLeft;
  };

  socket.on("round:result", showResult);
  socket.on("round:progress", updateProgress);
</script>

<section class="p-4 border-2 h-80 border-gray-300 space-y-2">
  {#if timeRemainingInSeconds <= 0}
    <p class="border-b-2">
      Correct word: <span class="font-bold text-purple-600">{result}</span>
    </p>
  {:else}
    <p class="border-b-2">
      Time remaining: <span class="font-bold text-yellow-600"
        >{timeRemainingInSeconds} seconds</span
      >
    </p>
  {/if}
  <p class="truncate">
    My current guess: <span class="font-medium">{currentGuess ?? "N/A"}</span>
  </p>
  <p>Top picks in team {teamNumber}:</p>
  <ScrollContainer styles=" max-h-56 border-0">
    <div class="flex flex-col items-center space-y-2">
      {#each teamGuesses as teamGuess, guessIndex}
        <GuessOption
          disabled={teamGuess.value === currentGuess || result != null}
          value={teamGuess.value}
          frequency={teamGuess.frequency}
          {teamSize}
          on:guess={guess}
          turnedOff={timeRemainingInSeconds <= 0}
        >
          {guessIndex + 1}:
        </GuessOption>
      {/each}
    </div>
  </ScrollContainer>
</section>
