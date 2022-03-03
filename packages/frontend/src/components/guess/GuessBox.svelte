<script>
  import GuessOption from "./GuessOption.svelte";

  export let teamNumber = 0;
  export let teamSize = 20;

  export let currentGuess = null;

  export let teamGuesses = [
    { value: "Monkey", frequency: 5 },
    { value: "Car", frequency: 7 },
    { value: "Horse", frequency: 2 },
  ];

  export function sortGuesses(){
    teamGuesses.sort((a, b) => {
      return b.frequency - a.frequency;
    });
  }
 
  sortGuesses();

  const guess = (valueEvent) => {
    const guessedValue = valueEvent.detail;
    currentGuess = guessedValue;
  };
</script>

<section class="p-4 border-2 border-gray-300 space-y-2">
  <p>
    My current guess: <span class="font-medium">{currentGuess ?? "N/A"}</span>
  </p>
  <p>Top picks in team {teamNumber}:</p>
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
</section>
