<script>
    import Icon from 'svelte-awesome';
    import { faSpellCheck } from '@fortawesome/free-solid-svg-icons';

    export let membersJSON = [{"username": "N/A", "guessed": false}];
    export let showGuessedIndicator = true;
</script>

<div class="bg-gray-100 mb-2 rounded-bl-lg p-2 flex-1 ml-5 divide-y">
    {#each membersJSON as member}
        <div class="flex justify-between my-1">
            <p class="w-full">{member.username}</p>
            {#if showGuessedIndicator && member.guessed}
                <div>
                    <Icon data="{faSpellCheck}" style="color: darkgray"/>
                </div>
            {/if}
        </div>
    {/each}
</div>