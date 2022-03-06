<script>
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
    export let showResults = false;

  </script>
  
  <ScrollContainer>
    {#if contentJSON !== "" || contentJSON !== undefined || contentJSON !== null}
        {#each contentJSON as element}
            <TeamItem members={element.members} showResults={showResults} isSelf={element.isSelf} isDrawingTeam={element.isDrawing} won={element.won} placementNr={element.placementNr}>{element.teamname}</TeamItem>
        {/each}
    {/if}
  </ScrollContainer>