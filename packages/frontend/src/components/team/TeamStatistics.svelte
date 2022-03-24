<script>
    export let myTeam;

</script>

{#if myTeam}

<!-- <div class="myTeamPoints"></div>  this is questionable-->
<div class="myTeamLevel">

    {myTeam.level}
</div>
<div class="myTeamShards">

    {myTeam.shards}
</div>

{/if}


<style>
    .myTeamLevel {

    }

    .myTeamShards {

    }
</style>