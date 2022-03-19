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

<div class="progressBar my-5 mx-3"  >
    <div class="progress-background">

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
        background: crimson;
        height: 1rem;
    }
    .progressBar {
        position: relative;
        margin-top: 4rem;
    }
    .emerald {
        background: greenyellow;
        height: 3rem;
        width: 2rem;
        top: 0;
        left: 0;
        position: absolute;
        transform: translate(-50%, -50%);

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