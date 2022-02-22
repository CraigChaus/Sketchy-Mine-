<script>
  import ChatBox from "../components/chat/ChatBox.svelte";
  import MessageBar from "../components/chat/MessageBar.svelte";

  let input;

  const onClickChat = () => {
    // alert("Chat button: " + input);
    chatMessages = [
      ...chatMessages,
      {
        username: "Bob",
        message: input,
        type: 1,
      },
    ];
    input = "";
  };

  const onClickGuess = () => {
    // alert("Guess button: " + input);
    input = "";
  };

  let chatMessages = [
    {
      username: "Bob",
      message: "Hello everyone!",
      type: 1,
    },
    {
      username: "Alice",
      message: "Let's do this :)",
      type: 2,
    },
    {
      username: "SYSTEM",
      message: "Game is starting...",
      type: 3,
    },
    {
      username: "Bob",
      message: "Hello everyone!",
      type: 1,
    },
    {
      username: "Alice",
      message: "Let's do this :)",
      type: 2,
    },
    {
      username: "Alice",
      message: "Let's do this :)asgasfgfgadfgdfgdfgsdfgsfdgsfdgsdfg",
      type: 2,
    },
  ];
</script>

<div class="w-full h-full flex justify-center">
  <div class="flex flex-col justify-center max-w-3xl flex-1">
    <ChatBox messages={chatMessages} />
    <MessageBar
      bind:input
      on:guessWordClicked={onClickGuess}
      on:sendChatClicked={onClickChat}
    />
  </div>
</div>
