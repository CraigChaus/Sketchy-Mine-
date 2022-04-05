<script>
  import SvelteTooltip from "svelte-tooltip";
  export let myTeam;
</script>

{#if myTeam}
  <div class="TeamStatistics">
    <div class="myTeamShards">
      <div class="emeralds">
        <SvelteTooltip
          tip="Emeralds are used for your ranking"
          left
          color="#6024EB"
        >
          Emeralds: {Math.floor(myTeam.shards / 5)}
          <img src="/images/Emerald.png" alt="Emeralds graphic" />
        </SvelteTooltip>
        <!-- emeralds -->
      </div>
      <div class="shards">
        <SvelteTooltip
          tip="Get shards from a level to convert them into emeralds"
          left
          color="#6024EB"
        >
          Shards: {myTeam.shards}
          <img src="/images/Shard.png" alt="Shards graphic" />
        </SvelteTooltip>
        <!-- shards -->
      </div>
    </div>
    <!-- <div class="myTeamPoints"></div>  this is questionable-->
    <div class="myTeamLevel">
      <SvelteTooltip
        tip="Higher level gives higher shard multiplier"
        left
        color="#6024EB"
      >
        Level: {myTeam.level}
      </SvelteTooltip>
    </div>
  </div>
{/if}

<style>
  .TeamStatistics {
    display: flex;
  }

  .myTeamLevel {
    background: url("/images/EmeraldDisplay.png") no-repeat;
    margin-left: 1rem;
    width: 237px;
    height: 102px;
    top: 30px;
    right: 0;
    font-size: 1.5rem;
    font-weight: bold;
    font-style: italic;
    color: white;
    padding: 2rem;
    text-align: center;
    line-height: 30px;
    position: absolute;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  }

  .myTeamShards {
    background: url("/images/EmeraldDisplay.png") no-repeat;
    margin-left: auto;
    width: 237px;
    height: 102px;
    top: 30px;
    right: 257px;
    font-size: 1.5rem;
    font-weight: bold;
    font-style: italic;
    color: white;
    padding: 1rem;
    padding-left: 0;
    text-align: center;
    line-height: 30px;
    position: absolute;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  }

  .emeralds {
    white-space: nowrap;
  }

  .emeralds img {
    display: inline;
    vertical-align: initial;
  }

  .shards {
    white-space: nowrap;
  }

  .shards img {
    display: inline;
    vertical-align: initial;
    position: relative;
    top: -1px;
    left: 12px;
  }
</style>
