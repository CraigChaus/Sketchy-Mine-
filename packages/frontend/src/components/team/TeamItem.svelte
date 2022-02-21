<script>
    export let isSelf = false;          //True if the current player is in the team
    export let showResults = false;
    export let won = false;
    export let placementNr = -1;        //If guessed correctly, shows the place of the team
    export let isDrawingTeam = false;
  </script>
  
<div class="flex-1 w-full h-full flex max-h-20">
    {#if isSelf}
    <div class="bg-blue-700 my-1 p-2 text-white flex-1">
        <div class="flex justify-between">
            {#if showResults && won && !isDrawingTeam}
                <p class="mr-3" style="font-style: italic;">#{placementNr}</p>
            {:else if showResults && !won && !isDrawingTeam}
                <p class="mr-3" style="font-style: italic;">--</p>
            {/if}
            <p class="w-full"><slot/></p>
            {#if isDrawingTeam}
                <p style="font-style: italic;">drawing</p> <!-- TODO: Replace this to "pencil" icon -->
            {/if}
            {#if showResults && !isDrawingTeam}
                {#if won}
                    <p>:)</p>   <!-- TODO: Replace this to "victor" icon -->
                {:else}
                    <p>X</p>   <!-- TODO: Replace this to "loose" icon -->
                {/if}
            {/if}
        </div>
    </div>
    {:else}
    <div class="bg-gray-600 my-1 p-2 text-white flex-1">
        <div class="flex justify-between">
            {#if showResults && won && !isDrawingTeam}
                <p class="mr-3" style="font-style: italic;">#{placementNr}</p>
            {:else if showResults && !won && !isDrawingTeam}
                <p class="mr-3" style="font-style: italic;">--</p>
            {/if}
            <p class="w-full"><slot/></p>
            {#if isDrawingTeam}
                <p style="font-style: italic;">drawing</p> <!-- TODO: Replace this to "pencil" icon -->
            {/if}
            {#if showResults && !isDrawingTeam}
                {#if won}
                    <p>:)</p>   <!-- TODO: Replace this to "victor" icon -->
                {:else}
                    <p>X</p>   <!-- TODO: Replace this to "loose" icon -->
                {/if}
            {/if}
        </div>
    </div>
    {/if}
</div>
  