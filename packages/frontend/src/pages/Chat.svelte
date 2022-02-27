<script>
  import ChatBox from "../components/chat/ChatBox.svelte";
  import MessageBar from "../components/chat/MessageBar.svelte";
  import { io } from "socket.io-client";

  let input;
  const socket = io("ws://localhost:3000");

  console.log("Before connect")
  socket.on("connect", () => {
    // either with send()
    console.log("hello.")

    // or with emit() and custom event names
    // socket.emit("salutations", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
  });

  const onClickChat = () => {
    // alert("Chat button: " + input);
    chatMessages = [
      ...chatMessages,
      {
        username: "Bob",
        message: input,
        type: 2,
      },
    ];
    input = "";
  };

  const onClickGuess = () => {
    // alert("Guess button: " + input);
    input = "";
  };

  let chatMessages = [  ];


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
