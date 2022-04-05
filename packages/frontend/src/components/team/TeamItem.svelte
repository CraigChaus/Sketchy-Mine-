<script>
    /**
     * TeamItem Component
     * Represents a team
     */
    import Icon from "svelte-awesome";
    import {
        faPaintbrush,
        faCircleCheck,
        faCircleXmark,
        faCrown,
        faAngleDown,
    } from "@fortawesome/free-solid-svg-icons";
    import MembersList from "./MembersList.svelte";

    export let isSelf = false; //True if the current player is in the team
    export let showResults = false;
    export let won = false;
    export let placementNr = -1; //If guessed correctly, shows the place of the team
    export let isDrawingTeam = false;
    export let members = [{ username: "N/A", guessed: false }]; //Default data

    let showMembers = isSelf;

    $: isSelf, (showMembers = isSelf); //Update "showMembers' variable when 'isSelf' changes

    let buttonClicked = () => (showMembers = !showMembers);
</script>

<div class="flex-1 w-full h-full flex max-h-20">
    {#if isSelf}
        <!--Current user is in this team-->
        <div
            on:click={buttonClicked}
            class="bg-blue-700 mt-1 p-2 text-white flex-1 cursor-pointer transition-all duration-200 hover:brightness-90"
        >
            <div class="flex justify-between">
                {#if showResults}
                    <div style="width: 2rem;">
                        {#if won && !isDrawingTeam}
                            {#if placementNr === 1}
                                <!-- If team guessed first -->
                                <Icon
                                    data={faCrown}
                                    scale="1.5"
                                    style="color: gold; display: block; margin-left: auto; margin-right: auto"
                                />
                            {:else}
                                <p
                                    class="font-bold text-yellow-300"
                                    style="font-style: italic"
                                >
                                    #{placementNr}
                                </p>
                            {/if}
                        {:else if !won && !isDrawingTeam}
                            <Icon
                                data={faAngleDown}
                                scale="1.5"
                                style="color: red"
                            />
                        {/if}
                    </div>
                {/if}
                <p class="w-full"><slot /></p>
                {#if isDrawingTeam}
                    <Icon data={faPaintbrush} scale="1.5" />
                {/if}
                {#if showResults && !isDrawingTeam}
                    {#if won}
                        <Icon
                            data={faCircleCheck}
                            scale="1.5"
                            style="color: greenyellow"
                        />
                    {:else}
                        <Icon
                            data={faCircleXmark}
                            scale="1.5"
                            style="color: red"
                        />
                    {/if}
                {/if}
            </div>
        </div>
    {:else}
        <!-- Other teams-->
        <div
            on:click={buttonClicked}
            class="bg-gray-600 mt-1 p-2 text-white flex-1 cursor-pointer transition-all duration-200 hover:brightness-90"
        >
            <div class="flex justify-between">
                {#if showResults}
                    <div style="width: 2rem;">
                        {#if won && !isDrawingTeam}
                            {#if placementNr === 1}
                                <Icon
                                    data={faCrown}
                                    scale="1.5"
                                    style="color: gold; display: block; margin-left: auto; margin-right: auto"
                                />
                            {:else}
                                <p
                                    class="font-bold text-yellow-300"
                                    style="font-style: italic"
                                >
                                    #{placementNr}
                                </p>
                            {/if}
                        {:else if !won && !isDrawingTeam}
                            <Icon
                                data={faAngleDown}
                                scale="1.5"
                                style="color: red"
                            />
                        {/if}
                    </div>
                {/if}
                <p class="w-full"><slot /></p>
                {#if isDrawingTeam}
                    <Icon data={faPaintbrush} scale="1.5" />
                {/if}
                {#if showResults && !isDrawingTeam}
                    {#if won}
                        <Icon
                            data={faCircleCheck}
                            scale="1.5"
                            style="color: greenyellow"
                        />
                    {:else}
                        <Icon
                            data={faCircleXmark}
                            scale="1.5"
                            style="color: red"
                        />
                    {/if}
                {/if}
            </div>
        </div>
    {/if}
</div>
{#if showMembers}
    <!-- Show members for a team -->
    <MembersList membersJSON={members} showGuessedIndicator={isSelf} />
{/if}
