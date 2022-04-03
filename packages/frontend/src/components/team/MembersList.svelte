<script>
  /**
   * MembersList component
   * A dropdown list under each team showing players per team
   */
  import { token as tokenStore } from "../../stores/token";
  import Icon from "svelte-awesome";
  import {
    faSpellCheck,
    faPaintbrush,
    faUser,
    faBan,
    faPersonRunning,
  } from "@fortawesome/free-solid-svg-icons";
  import { user } from "../../stores/user";
  import { token } from '../../stores/token';

  import socket from "../../socket";

  export let membersJSON = [{ username: "N/A", guessed: false }]; // Default data
  export let showGuessedIndicator = true; // Used to indicate if someone submitted a guess from the team


  const kick = (username) => {
    console.log("hello");
        let payload = {
            player: username,
            token: $token,
        };
        socket.emit("moderation:kick_player", payload)
    }



</script>

<div class="bg-gray-100 mb-2 rounded-bl-lg p-2 flex-1 ml-5 divide-y">
  {#each membersJSON as member}
    <div class="flex justify-between my-1">
      <div>
        {#if member.current}
          <!-- Give user this mark when they are the current user-->
          <Icon data={faUser} class="mr-2 mt-0 text-green-600" />
        {/if}
        <p class="contents {member.current ? 'font-bold text-green-500 ' : ''}">
          <span class="">
            {member.username}
          </span>
        </p>
      </div>

      {#if $user.is_moderator}
        <p class="flex justify-end ">
<!--          <button>-->
          <button    on:click={() => kick(member.username)}
            class="flex justify-center h-6 w-6 bg-red-500 hover:bg-red-700  font-bold  rounded-full"
            ><Icon data={faPersonRunning} scale="1.4" style="color:black" />
          </button>
        </p>
      {/if}

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
