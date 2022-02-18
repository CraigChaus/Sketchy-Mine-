<script>
    import TextInput from "./TextInput.svelte";
    import ActionButton from "./ChatButton.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let input;

    const onSendChatClicked = () => dispatch("sendChatClicked");

    const onGuessWordClicked = () => dispatch("guessWordClicked");
</script>

<div class="flex-1 flex mt-8 space-x-2">
    <TextInput instruction="Search by title..." bind:input styles="lg:inline" />

    <div class="ml-2 lg:inline mt-2 lg:mt-0">
        <ActionButton on:buttonClicked={onSendChatClicked}>DM</ActionButton>
        <ActionButton on:buttonClicked={onGuessWordClicked}>GW</ActionButton>
    </div>
</div>
