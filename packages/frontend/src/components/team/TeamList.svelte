<script>
    /**
     * TeamList Components
     * Stores team listing (individual team items)
     */
    import ScrollContainer from "../ScrollContainer.svelte";
    import TeamItem from "./TeamItem.svelte";

    /*
       Expected content:
       [
           {
               "teamname":"Team 1",
               "isDrawing": false,
               "isSelf": true,
               "won": true,
               "placementNr": 4
               "members": [
                   {"username": "Bob", "guessed": true}
               ]
           }
       ]
       */
    export let contentJSON = [];
    export let showResults = false; // If set to true will show end round results on teams
</script>

<ScrollContainer>
    {#if contentJSON !== "" || contentJSON !== undefined || contentJSON !== null}
        {#each contentJSON as element}
            <TeamItem
                members={element.members}
                {showResults}
                isSelf={element.isSelf}
                isDrawingTeam={element.isDrawing}
                won={element.won}
                placementNr={element.placementNr}>
                <div class="flex flex-row">
                    <p>
                        {element.teamname}
                    </p>
                    {#if element.teamname !== "Spectators"}
                        <p class="ml-auto font-semibold text-blue-100 mr-1">
                            Level {element.level}
                        </p>
                    {/if}
                </div>
                </TeamItem
            >
        {/each}
    {/if}
</ScrollContainer>
