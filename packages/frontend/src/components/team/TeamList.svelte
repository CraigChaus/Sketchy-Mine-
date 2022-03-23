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

    import { token } from '../../stores/token';
    import socket from '../../socket'
    import WarningMessageForm from "../WarningMessageForm.svelte";
    import { onMount } from "svelte";


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
    let isModerator=true;  //change it later

    let showWarningForm = false;

    const warnTeam = (e) => {
        teamname = contentJSON[0].teamname;
        showWarningForm = true;
    }

    let cancelWarning = () => {
        showWarningForm = false;
    }
    let teamname;



</script>
{#if showWarningForm }
    <WarningMessageForm bind:cancel={cancelWarning} bind:teamname={teamname}/>
{/if}
<ScrollContainer>
    {#if contentJSON !== "" || contentJSON !== undefined || contentJSON !== null}
        {#each contentJSON as element}
            <TeamItem class="contents"
                members={element.members}
                {showResults}
                isSelf={element.isSelf}
                isDrawingTeam={element.isDrawing}
                won={element.won}
                placementNr={element.placementNr}>{element.teamname}

                {#if isModerator}
                <div class=" flex justify-end ">
                <button class="flex justify-center h-7 w-7 bg-black-300 hover:bg-black-500  font-bold  rounded"><Icon data={faEnvelope} scale="1.7" style="color:white" /></button>
                <button on:click={warnTeam} class="flex justify-center h-7 w-7 ml-3 bg-yellow-300 hover:bg-yellow-500 text-black font-bold  rounded-full"><Icon data={faTriangleExclamation} scale="1.4" style="color:black" /></button></div>
                {/if}

            </TeamItem>
        {/each}
    {/if}
</ScrollContainer>
