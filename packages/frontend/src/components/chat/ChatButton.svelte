<script>
    export let styles = "";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let buttonClicked = () => dispatch ("buttonClicked");

</script>

<div class="bg-green-600 rounded-full border-none text-white p-2 text-center text inline-block transition-all cursor-pointer {styles}" on:click={buttonClicked}>
    <p><slot/></p>
</div>

<style>
  div:hover{
        filter: brightness(0.85);
    }
    div:hover.disabled{
        filter: brightness(0.50);
    }
    div:hover p:after {
        opacity: 1;
        right: 0;
    }
</style>