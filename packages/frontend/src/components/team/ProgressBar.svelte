<script>
  import { teamsValue } from "../../stores/teams";

  export let teams = [];
  teamsValue.subscribe((value) => (teams = value));

  let emeraldPosition = [25, 50, 80];
</script>

<div class="progressBar my-5 mx-3">
  <div class="progress-background">
    <img src="/images/ProgressBarEmpty.png" alt="Progress bar graphic" />
  </div>
  {#each emeraldPosition as emerald}
    <!-- Show emeralds on the progress bar -->
    <div class="emerald" style="left: {emerald}%  " />
  {/each}

  {#if teams && teams.length}
    {#each teams as team}
      <!-- Show team pointers on the progress bar -->
      <div
        class="teamPointer"
        style="left: {team.points}%; color: {team.colour}"
      >
        <span>{team.teamname}</span>
      </div>
    {/each}
  {/if}

  <div class="finish" />
</div>

<style>
  .progressBar {
    max-width: 680px;
    margin-right: auto;
    margin-left: auto;
    position: relative;
    margin-top: 5rem;
  }

  .emerald {
    background: url("/images/ProgressEmerald1st.png");
    background-size: 100% 100%;
    width: 32px;
    height: 16px;
    bottom: 38px;
    left: 0;
    position: absolute;
    transform: translate(-50%, 0);
  }
  .emerald + .emerald {
    background: url("/images/ProgressEmerald2nd.png");
    background-size: 100% 100%;
    width: 42px;
    height: 35px;
  }
  .emerald + .emerald + .emerald {
    background: url("/images/ProgressEmerald.png");
    background-size: 100% 100%;
    bottom: 35px;
    width: 83px;
    height: 72px;
  }

  .teamPointer {
    position: absolute;
    bottom: 62px;
    text-align: center;
    transform: translate(-50%, 0);
    white-space: nowrap;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0 10px;
  }
  .teamPointer::before {
    content: "";
    display: block;
    height: 1.5rem;
    border-left: black 1px solid;
    position: absolute;
    top: 1.5rem;
    transform: translate(-50%, 0);
    left: 50%;
  }
  .teamPointer::after {
    content: "";
    display: block;
    height: 0.5rem;
    width: 0.5rem;
    background: currentColor;
    position: absolute;
    top: 1.5rem;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 50%;
  }
  .teamPointer span {
    color: antiquewhite;
  }
</style>
