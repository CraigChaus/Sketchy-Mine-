<script>
    import { teamsValue } from '../../stores/teams';

    export let teams = [];
    teamsValue.subscribe(value => {
        teams = value;
    });

    // Needs to be updated, get from "somewhere"
    let totalPoints = 100;
    let teamPoints;

    let emeraldPosition = [25, 50, 80];
</script>

<div class="progressBar my-5 mx-3">
    <div class="progress-background">
        <img src="/images/progressBarEmpty.png">
    </div>
    {#each emeraldPosition as emerald}
        <div class="emerald" style="left: {emerald}%  ">

        </div>
    {/each}

    {#if teams && teams.length}
        {#each teams as team}
            <div class="teamPointer" style="left: {team.points}%; color: {team.colour}">
                <span>{team.teamname}</span>
            </div>
        {/each}
    {/if}


    <div class="finish">

    </div>
</div>


<style>
    .progress-background {


    }
    .progressBar {
        max-width: 680px;
        margin-right: auto;
        margin-left: auto;
        position: relative;
        margin-top: 4rem;
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
    .emerald + .emerald{
        background: url("/images/ProgressEmerald2nd.png");
        background-size: 100% 100%;
        width: 42px;
        height: 35px;
    }
    .emerald + .emerald + .emerald{
        background: url("/images/ProgressEmerald.png");
        background-size: 100% 100%;
        bottom: 35px;
        width: 83px;
        height: 72px
    }

    .teamPointer {
        position: absolute;
        top: -3rem;
        text-align: center;
        transform: translate(-50%, 0);
        white-space: nowrap;
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
        height: .5rem;
        width: .5rem;
        background: currentColor;
        position: absolute;
        top: 1.5rem;
        left: 50%;
        transform: translate(-50%, 0);
        border-radius: 50%;
    }
    .teamPointer span {
        color: black;
    }

</style>