<script>
    export let myTeam;

</script>

{#if myTeam}
<div class="TeamStatistics">
    <div class="myTeamShards">
        <div class="emeralds">
            Emeralds: {Math.floor(myTeam.shards / 50)} <img src="/images/Emerald.png" /> <!-- emeralds -->
        </div>
        <div class="shards">
            Shards: {myTeam.shards % 50} <img src="/images/Shard.png"/><!-- shards -->
        </div>
    </div>
    <!-- <div class="myTeamPoints"></div>  this is questionable-->
    <div class="myTeamLevel">

        Level: {myTeam.level}
    </div>
</div>
{/if}


<style>
    .TeamStatistics{
    display: flex;
    }

    .myTeamLevel {
        background: url("/images/EmeraldDisplay.png") no-repeat;
        margin-left: 1rem;
        width: 237px;
        height: 102px;
        top: 30px;
        right: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        font-style: italic;
        color: white;
        padding: 2rem;
        text-align: center;
        line-height: 30px;
    }

    .myTeamShards {
        background: url("/images/EmeraldDisplay.png") no-repeat;
        margin-left: auto;
        width: 237px;
        height: 102px;
        top: 30px;
        right: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        font-style: italic;
        color: white;
        padding: 1rem;
        padding-left: 0;
        text-align: center;
        line-height: 30px;
    }

    .emeralds {
        white-space: nowrap;
    }

    .emeralds img{
        display: inline;
        vertical-align: initial;
    }

    .shards{
        white-space: nowrap;
    }

    .shards img{
        display: inline;
        vertical-align: initial;
        position: relative;
        top: -1px;
        left: 12px;
    }


</style>