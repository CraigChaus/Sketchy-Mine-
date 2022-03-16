<script>
    /**
     * MembersList component
     * A dropdown list under each team showing players per team
     */
    import Icon from "svelte-awesome";
    import {
        faSpellCheck,
        faPaintbrush,
        faUser,
    } from "@fortawesome/free-solid-svg-icons";

    export let membersJSON = [{ username: "N/A", guessed: false }]; // Default data
    export let showGuessedIndicator = true; // Used to indicate if someone submitted a guess from the team
</script>

<div class="bg-gray-100 mb-2 rounded-bl-lg p-2 flex-1 ml-5 divide-y">
    {#each membersJSON as member}
        <div class="flex justify-between my-1">
            {#if member.current}
                <!-- Give user this mark when they are the current user-->
                <Icon
                    data={faUser}
                    class="mr-2 mt-1"
                    style="color: blueviolet"
                />
            {/if}
            <p
                class="w-full {member.current
                    ? 'font-bold text-purple-600'
                    : ''}"
            >
                {member.username}
            </p>
            {#if showGuessedIndicator && member.guessed}
                <div>
                    <!-- Give user this mark when they submitted a guess-->
                    <Icon data={faSpellCheck} style="color: darkgray" />
                </div>
            {:else if member.draws}
                <div>
                    <!-- Give user this mark when they are drawing-->
                    <Icon data={faPaintbrush} style="color: darkgray" />
                </div>
            {/if}
        </div>
    {/each}
</div>
