<script>
  /**
   * GuessBox component
   * Holds individual guess items
   */
  import ScrollContainer from "../ScrollContainer.svelte";
  import GuessOption from "./GuessOption.svelte";
  import { createEventDispatcher } from "svelte";
  import socket from "../../socket";
  import Countdown from "../Countdown.svelte";

  // If this is set to "N/A" and the timeRemainingInSeconds is -1,
  // that means the round is not yet started
  export let result = "N/A"; // When the round is over, or not yet started, this should be "N/A"
  export let teamSize = 60;
  export let currentGuess = null; // When the round is over, or not yet started, this must be null!!!
  export let timeRemainingInSeconds = -1; // When the round is over, or not yet started, this must be -1!!!
  export let role = null;
  export let teamGuesses = []; //List of team guess objects
  export let guessingEnded = false;

  const dispatch = createEventDispatcher();

  function finalizeGuessing() {
    guessingEnded = true;
    dispatch("finalized");
  }

  function sortGuesses() {
    teamGuesses.sort((a, b) => {
      return b.frequency - a.frequency;
    });
  }

  // Sort the team guesses every time the array is updated
  $: teamGuesses, sortGuesses();

  const guess = (valueEvent) => {
    const guessedValue = valueEvent.detail.toLowerCase();
    currentGuess = guessedValue;
    dispatch("guessClicked", currentGuess);
  };

  /**
   * Show the final word
   * @param payload Contains an object with a property of "result"
   */
  const showResult = (payload) => {
    currentGuess = null;
    result = payload.result;
  };

  socket.on("round:result", showResult);
</script>

<div>
  {#if role != 3 && role === 2}
    <section class="p-4 h-80 border-gray-300 space-y-2">
      {#if result === "N/A" && timeRemainingInSeconds < 0}
        <p class="border-b-2 italic text-center">
          Waiting for next round to start...
        </p>
      {:else if timeRemainingInSeconds == 0}
        <p class="border-b-2">
          Correct word: <span class="font-bold text-purple-600">{result}</span>
        </p>
      {:else}
        <p class="border-b-2">Time remaining:</p>
        <Countdown countdown={timeRemainingInSeconds} />
      {/if}
      <p class="truncate">
        My current guess: <span class="font-medium"
          >{currentGuess ?? "N/A"}</span
        >
      </p>
      <p>My teams guesses:</p>
      <ScrollContainer styles=" max-h-56 border-0">
        <div class="flex flex-col items-center space-y-2">
          {#if teamGuesses.length === 0 && role === 2}
            <p class="italic text-yellow-500 text-center font-medium mt-2">
              Your team has not placed any guesses yet...
            </p>
          {/if}
          {#each teamGuesses as teamGuess, guessIndex}
            <GuessOption
              disabled={teamGuess.value === currentGuess}
              value={teamGuess.value}
              frequency={teamGuess.frequency}
              {teamSize}
              on:guess={guess}
              turnedOff={timeRemainingInSeconds <= 0 || guessingEnded}
              on:finalized={finalizeGuessing}
            >
              {guessIndex + 1}:
            </GuessOption>
          {/each}
        </div>
      </ScrollContainer>
    </section>
  {:else}
    <section class="p-4 h-80 border-gray-300 space-y-2" style="height: auto;">
      {#if result === "N/A" && timeRemainingInSeconds < 0}
        <p class="border-b-2 italic text-center">
          Waiting for next round to start...
        </p>
      {:else if timeRemainingInSeconds == 0}
        <p class="border-b-2">
          Correct word: <span class="font-bold text-purple-600">{result}</span>
        </p>
      {:else}
        <p class="border-b-2">Time remaining:</p>
        <Countdown countdown={timeRemainingInSeconds} />
      {/if}
    </section>
  {/if}
</div>
