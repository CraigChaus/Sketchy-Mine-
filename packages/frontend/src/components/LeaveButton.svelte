<script>
    /**
     * LeaveButton Component
     * Used as an action button for leaving the ongoing game
     */
    export let styles = "";
    export let disabled = false;
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let buttonClicked = () => dispatch("buttonClicked");
</script>

<div
    class="bg-red-600 hover:brightness-90 rounded-full border-none text-white p-2 text-center text inline-block transition-all cursor-pointer {disabled
    ? 'bg-gray-500 cursor-not-allowed hover:brightness-100'
    : ''} {styles}"
    on:click={buttonClicked}
    >
    <p><slot /></p>
</div>