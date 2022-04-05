<script>
  /**
   * TeamList Components
   * Stores team listing (individual team items)
   */
  import ScrollContainer from "../ScrollContainer.svelte";
  import TeamItem from "./TeamItem.svelte";
  import Icon from "svelte-awesome";
  import {
    faEnvelope,
    faTriangleExclamation,
  } from "@fortawesome/free-solid-svg-icons";

  import { user } from "../../stores/user";
  import WarningMessageForm from "../WarningMessageForm.svelte";

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

  let showWarningForm = false;

  const warnTeam = (teamName) => {
    teamname = teamName;
    showWarningForm = true;
  };

  let cancelWarning = () => {
    showWarningForm = false;
  };
  let teamname;
</script>

{#if showWarningForm}
  <WarningMessageForm bind:cancel={cancelWarning} bind:teamname />
{/if}
<ScrollContainer>
  {#if contentJSON !== "" || contentJSON !== undefined || contentJSON !== null}
    {#each contentJSON as element}
      {#if element.teamname !== 'Spectators'}
        <TeamItem
          class="contents"
          members={element.members}
          {showResults}
          isSelf={element.isSelf}
          isDrawingTeam={element.isDrawing}
          won={element.won}
          placementNr={element.placementNr}
        >
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

          {#if $user.is_moderator}
            <div class=" flex justify-end">
              <button
                on:click={() => warnTeam(element.teamname)}
                class="flex justify-center h-7 w-7 ml-3 bg-yellow-300 hover:bg-yellow-500 text-black font-bold  rounded-full"
                ><Icon
                  data={faTriangleExclamation}
                  scale="1.4"
                  style="color:black"
                /></button
              >
            </div>
          {/if}
        </TeamItem>
      {/if}
    {/each}
  {/if}
</ScrollContainer>
