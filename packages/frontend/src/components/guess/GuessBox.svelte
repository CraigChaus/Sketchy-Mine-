<script>
  import ScrollContainer from "../ScrollContainer.svelte";
import GuessOption from "./GuessOption.svelte";

  export let teamNumber = 0;
  export let teamSize = 20;
  export let currentGuess = null;

  export let teamGuesses = [
    { value: "guessWordClickedguessWordClickedguessWordClickedguessWordClickedguessWordClickedguessWordClickedguessWordClickedguessWordClicked", frequency: 5 },
    { value: "Car", frequency: 11 },
    { value: "Horse", frequency: 2 },
    { value: "House", frequency: 6 },
    { value: "House", frequency: 6 },
    { value: "House", frequency: 6 },
    { value: "House", frequency: 6 },
    { value: "House", frequency: 6 },
    { value: "House", frequency: 6 },
    { value: "House", frequency: 6 },
    { value: "House", frequency: 6 },
    { value: "House", frequency: 6 },
    { value: "House", frequency: 6 },
    { value: "Sus image", frequency: 9 }
  ];

  function sortGuesses(){
    teamGuesses.sort((a, b) => {
      return b.frequency - a.frequency;
    });
  }
 
  $: teamGuesses, sortGuesses();

  const guess = (valueEvent) => {
    const guessedValue = valueEvent.detail;
    currentGuess = guessedValue;
  };
</script>

<section class="p-4 border-2 h-80 border-gray-300 space-y-2">
  <p class="truncate">
    My current guess: <span class="font-medium">{currentGuess ?? "N/A"}</span>
  </p>
  <p>Top picks in team {teamNumber}:</p>
  <ScrollContainer styles=" max-h-56 border-0">
    <div class="flex flex-col items-center space-y-2">
      {#each teamGuesses as teamGuess, guessIndex}
        <GuessOption
          disabled={teamGuess.value === currentGuess}
          value={teamGuess.value}
          frequency={teamGuess.frequency}
          {teamSize}
          on:guess={guess}
        >
          {guessIndex + 1}:
        </GuessOption>
      {/each}
    </div>
  </ScrollContainer>
</section>
