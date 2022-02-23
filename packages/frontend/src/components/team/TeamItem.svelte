<script>
    import Icon from 'svelte-awesome';
    import { faPaintbrush, faCircleCheck, faCircleXmark, faCrown, faAngleDown } from '@fortawesome/free-solid-svg-icons';

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
                {#if placementNr === 1}
                    <Icon data="{faCrown}" scale="1.5" style="color: gold"/>
                {:else}
                    <p class="font-bold text-yellow-300" style="font-style: italic">#{placementNr}</p>
                {/if}
            {:else if showResults && !won && !isDrawingTeam}
                <Icon data="{faAngleDown}" scale="1.5" style="color: red"/>
            {/if}
            <p class="w-full"><slot/></p>
            {#if isDrawingTeam}
                <Icon data="{faPaintbrush}" scale="1.5"/>
            {/if}
            {#if showResults && !isDrawingTeam}
                {#if won}
                    <Icon data="{faCircleCheck}" scale="1.5" style="color: greenyellow"/>
                {:else}
                    <Icon data="{faCircleXmark}" scale="1.5" style="color: red"/>
                {/if}
            {/if}
        </div>
    </div>
    {:else}
    <div class="bg-gray-600 my-1 p-2 text-white flex-1">
        <div class="flex justify-between">
            {#if showResults && won && !isDrawingTeam}
                {#if placementNr === 1}
                    <Icon data="{faCrown}" scale="1.5" style="color: gold"/>
                {:else}
                    <p class="font-bold text-yellow-300" style="font-style: italic">#{placementNr}</p>
                {/if}
            {:else if showResults && !won && !isDrawingTeam}
                <Icon data="{faAngleDown}" scale="1.5" style="color: red"/>
            {/if}
            <p class="w-full"><slot/></p>
            {#if isDrawingTeam}
                <Icon data="{faPaintbrush}" scale="1.5"/>
            {/if}
            {#if showResults && !isDrawingTeam}
                {#if won}
                    <Icon data="{faCircleCheck}" scale="1.5" style="color: greenyellow"/>
                {:else}
                    <Icon data="{faCircleXmark}" scale="1.5" style="color: red"/>
                {/if}
            {/if}
        </div>
    </div>
    {/if}
</div>
  