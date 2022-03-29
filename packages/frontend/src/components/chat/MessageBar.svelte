<script>
  /**
   * MessageBar component
   * Represents the user interaction bar where users can type in text and send it as a guess/chat
   */
  import TextInput from "./TextInput.svelte";
  import ActionButton from "./ChatButton.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let input; // Text that the user enters
  export let role;
  export let guessButtonDisabled;

  let textInputPlaceholder;

  const onSendChatClicked = () => dispatch("sendChatClicked");

  const onGuessWordClicked = () => dispatch("guessWordClicked");

  const updateTextInputPlaceholder = () => {
    if (role == 2) {
      if (!guessButtonDisabled) {
        textInputPlaceholder = "Type chat message or word to guess here!";
      } else {
        textInputPlaceholder = "Type chat message here!";
      }
    } else {
      textInputPlaceholder = "Type chat message here!";
    }
  };

  // Every time the role gets updated or the ability of guessing changes
  // we change the prompt of the text input field
  $: role, updateTextInputPlaceholder();
  $: guessButtonDisabled, updateTextInputPlaceholder();

  const onSubmit = (e) => {
    e.preventDefault();

    if (input) {
      if (role == 2) {
        if (!guessButtonDisabled) {
          onGuessWordClicked();
        } else {
          onSendChatClicked();
        }
      } else {
        onSendChatClicked();
      }
    }
  };
</script>

<div class="flex-1 flex mt-8 space-x-2">
  <form class="flex flex-1" on:submit={onSubmit}>
    <TextInput
      placeholder={textInputPlaceholder}
      bind:input
      styles="lg:inline"
      on:submit={onSendChatClicked}
    />
  </form>

  <div class="ml-2 lg:inline mt-2 lg:mt-0">
    <ActionButton
      styles="search-button bg-blue-600"
      on:buttonClicked={onSendChatClicked}>Send Chat</ActionButton
    >

    {#if role === 2}
      <ActionButton
        disabled={guessButtonDisabled}
        styles="search-button"
        on:buttonClicked={onGuessWordClicked}>Guess Word</ActionButton
      >
    {/if}
  </div>
</div>
