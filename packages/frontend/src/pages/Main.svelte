<script>
  import Canvas from "../Canvas/Canvas.svelte";
  import ChatBox from "../components/chat/ChatBox.svelte";
  import GuessList from "../components/guess/GuessBox.svelte";
  import TeamList from "../components/team/TeamList.svelte";
  import MessageBar from "../components/chat/MessageBar.svelte";
  import Toolbox from "../Canvas/Toolbox.svelte";
  import ProgressBar from "../components/team/ProgressBar.svelte";
  import socket from "../socket/index";
  import { onMount } from "svelte";

  let username;

  const session = "main";

  onMount(() => {
    username = "User" + Math.round(Math.random() * 10000);
    socket.emit("joinSession", { username, session });
  });

  // Receiving messages
  socket.on("message", (data) => {
    if (!data) {
      return;
    }

    chatMessages = [
      ...chatMessages,
      {
        username: data.username,
        message: data.text,
        type: data.type,
      },
    ];
  });

  // Receiving guesses
  socket.on("guess", (guesses) => {
    if (!data) {
      return;
    }

    teamGuesses = [...guesses];

  });

  let currentColourIndex = 0;
  function teamColour() {
    return "hsl(" + currentColourIndex++ * 37 + ", 100%, 50%)";
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
      colour: teamColour(),
      members: [
        {username: "Bob", guessed: false},
        {username: "Jack", guessed: true},
        {username: "Alice", guessed: false},
        {username: "John", guessed: false},
      ]
    },
    {
      teamname: "Team 2",
      isDrawing: true,
      isSelf: false,
      won: undefined,
      placementNr: undefined,
      points: 21,
      colour: teamColour(),
      members: [
        {username: "Bob", guessed: false, draws: false},
        {username: "Jack", guessed: true, draws: false},
        {username: "Alice", guessed: false, draws: true},
        {username: "John", guessed: false, draws: false},
      ]
    },
    {
      teamname: "Team 3",
      isDrawing: false,
      isSelf: false,
      won: true,
      placementNr: 1,
      points: 79,
      colour: teamColour(),
      members: [
        {username: "Bob", guessed: false, draws: false},
        {username: "Jack", guessed: true, draws: false},
        {username: "Alice", guessed: false, draws: false},
        {username: "John", guessed: false, draws: false},
      ]
    },
    {
      teamname: "Team 4",
      isDrawing: false,
      isSelf: false,
      won: false,
      placementNr: undefined,
      points: 90,
      colour: teamColour(),
      members: [
        {username: "Bob", guessed: false, draws: false},
        {username: "Jack", guessed: true, draws: false},
        {username: "Alice", guessed: false, draws: false},
        {username: "John", guessed: false, draws: false},
      ]
    },
    {
      teamname: "Team 5",
      isDrawing: false,
      isSelf: false,
      won: false,
      placementNr: undefined,
      points: 80,
      colour: teamColour(),
      members: [
        {username: "Bob", guessed: false, draws: false},
        {username: "Jack", guessed: true, draws: false},
        {username: "Alice", guessed: false, draws: false},
        {username: "John", guessed: false, draws: false},
      ]
    },
    {
      teamname: "Team 6",
      isDrawing: false,
      isSelf: false,
      won: true,
      placementNr: 3,
      points: 56,
      colour: teamColour(),
      members: [
        {username: "Bob", guessed: false, draws: false},
        {username: "Jack", guessed: true, draws: false},
        {username: "Alice", guessed: false, draws: false},
        {username: "John", guessed: false, draws: false},
      ]
    },
    {
      teamname: "Team 7",
      isDrawing: false,
      isSelf: false,
      won: true,
      placementNr: 4,
      points: 33,
      colour: teamColour(),
      members: [
        {username: "Bob", guessed: false, draws: false},
        {username: "Jack", guessed: true, draws: false},
        {username: "Alice", guessed: false, draws: false},
        {username: "John", guessed: false, draws: false},
      ]
    },
    {
      teamname: "Team 8",
      isDrawing: false,
      isSelf: false,
      won: false,
      placementNr: undefined,
      points: 74,
      colour: teamColour(),
      members: [
        {username: "Bob", guessed: false, draws: false},
        {username: "Jack", guessed: true, draws: false},
        {username: "Alice", guessed: false, draws: false},
        {username: "John", guessed: false, draws: false},
      ]
    },
    {
      teamname: "Team 9",
      isDrawing: false,
      isSelf: false,
      won: false,
      placementNr: undefined,
      points: 13,
      colour: teamColour(),
      members: [
        {username: "Bob", guessed: false, draws: false},
        {username: "Jack", guessed: true, draws: false},
        {username: "Alice", guessed: false, draws: false},
        {username: "John", guessed: false, draws: false},
      ]
    },
    {
      teamname: "Team 10",
      isDrawing: false,
      isSelf: false,
      won: false,
      placementNr: undefined,
      points: 88,
      colour: teamColour(),
      members: [
        {username: "Bob", guessed: false, draws: false},
        {username: "Jack", guessed: true, draws: false},
        {username: "Alice", guessed: false, draws: false},
        {username: "John", guessed: false, draws: false},
      ]
    },
    {
      teamname: "Team 11",
      isDrawing: false,
      isSelf: false,
      won: false,
      placementNr: undefined,
      points: 99,
      colour: teamColour(),
      members: [
        {username: "Bob", guessed: false, draws: false},
        {username: "Jack", guessed: true, draws: false},
        {username: "Alice", guessed: false, draws: false},
        {username: "John", guessed: false, draws: false},
      ]
    },
  ];

  let chatMessages = [];
  let teamGuesses = [];

  let chatInput;

  const onClickGuess = () => {
    if(chatInput !== "") {
      currentGuess = chatInput;
      teamGuesses.push({value: currentGuess, frequency: 1});
      socket.emit("wordGuess", currentGuess);
    }

    chatInput = "";
  };

  const onClickGuessItem = (e) => {
      socket.emit("wordGuess", e.detail);
  }

  // Sending messages
  const onClickChat = () => {
    if(chatInput !== ""){
      socket.emit("chatMessage", chatInput);
      // chatMessages = [
      //   ...chatMessages,
      //   {
      //     username: username,
      //     message: chatInput,
      //     type: 1,
      //   },
      // ];
      chatInput = "";
    }
  };

  let currentGuess = null;

  let brushColor = "#444";
  let brushRadius = 8;
  let SDraw = null;
</script>

<ProgressBar {teams} />

<div class="flex min-h-screen flex-row flex-grow">
  <div class="flex-1 w-1/4 h-12">
    <GuessList on:guessClicked={onClickGuessItem} teamGuesses={teamGuesses} teamNumber={1} {currentGuess} />
    <TeamList showResults={true} contentJSON={teams} />
  </div>

  <div class="flex-1 w-2/4 h-full">
    <Canvas bind:this={SDraw} {brushColor} {brushRadius} canvasWidth="640" />
    <div class="flex-row justify-center">
      <Toolbox bind:SDraw bind:brushColor bind:brushRadius />
    </div>
    <MessageBar
      bind:input={chatInput}
      on:guessWordClicked={onClickGuess}
      on:sendChatClicked={onClickChat}
    />
  </div>
  <div class="flex-1 w-1/4 h-full mx-3">
    <ChatBox messages={chatMessages} />
  </div>
</div>
