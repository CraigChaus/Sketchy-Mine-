<script>
  import Canvas from "../Canvas/Canvas.svelte";
  import ChatBox from "../components/chat/ChatBox.svelte";
  import GuessList from "../components/guess/GuessBox.svelte";
  import TeamList from "../components/team/TeamList.svelte";
  import MessageBar from "../components/chat/MessageBar.svelte";
  import {io} from "socket.io-client";
  import ProgressBar from "../components/team/ProgressBar.svelte";

  const socket = io("ws://localhost:3000");

  console.log("Before connect")
  socket.on("connect", () => {
    // either with send()
    console.log("hello.")

    // or with emit() and custom event names
    socket.emit("chat:send", "Hello!", { "mr": "john" }, Uint8Array.from([1, 2, 3, 4]));
  });

  socket.on("chat:send", data => {
    console.log(data);
  });

  let currentColourIndex = 0;
  function teamColour () {
    return "hsl("+((currentColourIndex++)*37)+", 100%, 50%)";
  }

  // Points and colour are used by ProgressBar.
  let teams = [
    {
      teamname: "Team 1",
      isDrawing: false,
      isSelf: true,
      won: true,
      placementNr: 2,
      points: 37,
      colour: teamColour()
    },
    {
      teamname: "Team 2",
      isDrawing: true,
      isSelf: false,
      won: undefined,
      placementNr: undefined,
      points: 21,
      colour: teamColour()
    },
    {
      teamname: "Team 3",
      isDrawing: false,
      isSelf: false,
      won: true,
      placementNr: 1,
      points: 79,
      colour: teamColour()
    },
    {
      teamname: "Team 4",
      isDrawing: false,
      isSelf: false,
      won: false,
      placementNr: undefined,
      points: 90,
      colour: teamColour()
    },
    {
      teamname: "Team 5",
      isDrawing: false,
      isSelf: false,
      won: false,
      placementNr: undefined,
      points: 80,
      colour: teamColour()
    },
    {
      teamname: "Team 6",
      isDrawing: false,
      isSelf: false,
      won: true,
      placementNr: 3,
      points: 56,
      colour: teamColour()
    },
    {
      teamname: "Team 7",
      isDrawing: false,
      isSelf: false,
      won: true,
      placementNr: 4,
      points: 33,
      colour: teamColour()
    },
    {
      teamname: "Team 8",
      isDrawing: false,
      isSelf: false,
      won: false,
      placementNr: undefined,
      points: 74,
      colour: teamColour()
    },
    {
      teamname: "Team 9",
      isDrawing: false,
      isSelf: false,
      won: false,
      placementNr: undefined,
      points: 13,
      colour: teamColour()
    },
    {
      teamname: "Team 10",
      isDrawing: false,
      isSelf: false,
      won: false,
      placementNr: undefined,
      points: 88,
      colour: teamColour()
    },
    {
      teamname: "Team 11",
      isDrawing: false,
      isSelf: false,
      won: false,
      placementNr: undefined,
      points: 99,
      colour: teamColour()
    },
  ];

  let chatMessages = [

  ];

  let chatInput;

  const onClickChat = () => {
    chatMessages = [
      ...chatMessages,
      {
        username: "Bob",
        message: chatInput,
        type: 1,
      },
    ];
    chatInput = "";
  };

  const onClickGuess = () => {
    currentGuess = chatInput;
    chatInput = "";
  };

  let currentGuess = null;
</script>
<ProgressBar teams="{teams}">

</ProgressBar>


<div class="flex my-8">
  <div class="w-1/3 h-12 m-3">
    <GuessList teamNumber={1} {currentGuess} />
    <TeamList showResults={true} contentJSON={teams} />
  </div>

  <div class="w-full h-full">
    <Canvas />
    <MessageBar
      bind:input={chatInput}
      on:guessWordClicked={onClickGuess}
      on:sendChatClicked={onClickChat}
    />
  </div>
  <div class="w-2/5 h-full mx-3">
    <ChatBox messages={chatMessages} />
  </div>
</div>
