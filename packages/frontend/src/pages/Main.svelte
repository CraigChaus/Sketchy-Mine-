<script>
  import Canvas from "../Canvas/Canvas.svelte";
  import ChatBox from "../components/chat/ChatBox.svelte";
  import GuessList from "../components/guess/GuessBox.svelte";
  import TeamList from "../components/team/TeamList.svelte";
  import MessageBar from "../components/chat/MessageBar.svelte";
  import Toolbox from "../Canvas/Toolbox.svelte";
  import { onMount } from "svelte";
  import socket from "../socket";
  import { teamsValue } from "../stores/teams";
  import ProgressBar from "../components/team/ProgressBar.svelte";

  let results = null;

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
        {username: "Bob", guessed: false, current: true},
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
      points: 45,
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
      points: 85,
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
      points: 95,
      colour: teamColour(),
      members: [
        {username: "Bob", guessed: false, draws: false},
        {username: "Jack", guessed: true, draws: false},
        {username: "Alice", guessed: false, draws: false},
        {username: "John", guessed: false, draws: false},
      ]
    },
  ];

  teamsValue.set(teams);

  // Progress bar functionality

  // This updates the team's points that guessed correctly
  const updateCorrectGuessingTeamPoints = (correctGuessedTeam, guessedTimeTaken) => {
    teams.forEach(team => {
      if ((team.teamname === correctGuessedTeam)) {
        if (guessedTimeTaken < 30) { // if they guessed in less than 30 seconds, they get 20 points and so on
          team.points += 20;
        } else if (guessedTimeTaken < 60) {
          team.points += 15;
        } else if (guessedTimeTaken < 90) {
          team.points += 10;
        } else {
          team.points += 5;
        }
      }

      team.points = validateLevelPoints(team.points);
    });

    teamsValue.set(teams);
  };

  // This updates the team's points that guessed wrongly
  const updateWrongGuessingTeamPoints = (wrongGuessingTeam) => {
    teams.forEach(team => {
      if (team.teamname === wrongGuessingTeam) {
        team.points += 3;
      }

      team.points = validateLevelPoints(team.points);
    });

    teamsValue.set(teams);
  };

  // This is to update the drawing team's points
  const updateDrawingTeamPoints = (drawingTeam, numberOfGuessedTeams) => {
    if (numberOfGuessedTeams < teams.length) {
      let percentage = getGuessedTeamsPercentage(numberOfGuessedTeams);

      teams.forEach(team => {
        if ((team.teamname === drawingTeam)) {
          if (percentage > 0 && percentage < 25) {
            team.points += 10;
          } else if (percentage < 50) {
            team.points += 20;
          } else if (percentage < 75) {
            team.points += 30;
          } else {
            team.points += 40;
          }
        }

        team.points = validateLevelPoints(team.points);
      });

      teamsValue.set(teams);
    }
  };

  // This calculates the percentage of the teams that guessed correctly
  const getGuessedTeamsPercentage = (numberOfGuessedTeams) => {
    let teamsSize = teams.length - 1; // we exclude the drawing team
    let percentage = (numberOfGuessedTeams / teamsSize) * 100;

    return percentage;
  }

  const validateLevelPoints = (points) => {
    if (points >= 100) { // we make sure no team has more than the maximum amount of points
      points -= 100;
    }

    return points;
  }

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

  async function getRole() {
    return role;
  }

  let role = 3;

  onMount(() => {
    randomizeDrawer();
    promise = getRole();
    socket.emit("canvas:new-user");
  });
  let randomizeDrawer = () => {
    let rng = Math.random();
    if (rng < 0.33) {
      role = 1;
    } else if (rng > 0.33 && rng < 0.66) {
      role = 2;
    } else {
      role = 3;
    }
    console.log(role);
  };

  let promise = getRole();

  let becomeDrawer = () => {
    role = 1;
    promise = getRole();
  };
  let becomeGuesser = () => {
    role = 2;
    promise = getRole();
  };
  let becomeSpectator = () => {
    role = 3;
    promise = getRole();
  };

  //1: drawer
  //2: guesser
  //3: spectator
  socket.on("canvas:drawer", becomeDrawer);
  socket.on("canvas:guesser", becomeGuesser);
  socket.on("canvas:spectator", becomeSpectator);

  let makeAllSpec = () => {
    socket.emit("canvas:spectator");
  };
  let makeAllDrawer = () => {
    socket.emit("canvas:drawer");
  };

  let chatMessages = [];
  let teamGuesses = [];

  let chatInput;

  const onClickGuess = () => {
    if (chatInput !== "") {
      currentGuess = chatInput;
      // teamGuesses.push({ value: currentGuess, frequency: 1 });
      sendGuess(currentGuess);
    }

    chatInput = "";
  };

  const updateGuessState = (payload) => {
    console.log(payload);
    teamGuesses = payload;
  };

  socket.on("round:state", updateGuessState);

  const onClickGuessItem = (e) => {
    sendGuess(e.detail);
  };

  const sendGuess = (guess) => {
    socket.emit("round:guess", guess);
  };

  // Sending messages
  const onClickChat = () => {
    if (chatInput !== "") {
      socket.emit("chatMessage", chatInput);
      chatInput = "";
    }
  };

  const startRound = () => {
    socket.emit("round:start");
  };

  socket.on("round:result", (payload) => {
    results = payload;
  });

  let currentGuess = null;

  let brushColor = "#444";
  let brushRadius = 8;
  let SDraw = null;
</script>

<ProgressBar {teams} />

<div class="flex">
  <div class="w-1/4 h-12">
    <GuessList
      on:guessClicked={onClickGuessItem}
      {teamGuesses}
      teamNumber={1}
      currentGuess={currentGuess ? currentGuess.toLowerCase() : null}
    />
    <TeamList showResults={results != null} contentJSON={teams} />
  </div>
  <div class="w-2/4 h-full space-y-1">
    <Canvas
      {role}
      bind:this={SDraw}
      {brushColor}
      {brushRadius}
      canvasWidth="640"
    />
    <div class="flex-row justify-center">
      {#await promise}
        <p>loading..</p>
      {:then role}
        {#if role === 1}
          <Toolbox bind:SDraw bind:brushColor bind:brushRadius />
        {/if}
        <p>You are currently role {role}</p>
      {/await}
    </div>
    <button
      on:click={becomeDrawer}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >become drawer</button
    >
    <button
      on:click={becomeGuesser}
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >become guesser</button
    >
    <button
      on:click={makeAllDrawer}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >make all users drawers</button
    >
    <button
      on:click={makeAllSpec}
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >make all users spectators</button
    >

    <button
      on:click={startRound}
      class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      >Start Round</button
    >

    <MessageBar
      {role}
      bind:input={chatInput}
      on:guessWordClicked={onClickGuess}
      on:sendChatClicked={onClickChat}
    />
  </div>

  <div class="w-1/4 h-full mx-3">
    <ChatBox messages={chatMessages} />
  </div>
</div>
