<script>
  import { onMount } from "svelte";
  import Canvas from "../Canvas/Canvas.svelte";
  import ChatBox from "../components/chat/ChatBox.svelte";
  import GuessList from "../components/guess/GuessBox.svelte";
  import TeamList from "../components/team/TeamList.svelte";
  import MessageBar from "../components/chat/MessageBar.svelte";
  import Toolbox from "../Canvas/Toolbox.svelte";
  import socket from "../socket";
  import { teamsValue } from "../stores/teams";
  import ProgressBar from "../components/team/ProgressBar.svelte";

  let results = null;

  // Points and colour are used by ProgressBar.
  let teams = [];

  // Progress bar functionality
  /**
   * This function updates the team's points that guessed correctly.
   * The increase is based on certain timestamps, as it follows:
   * If guessedTimeTaken is less than 30 seconds, the points are increased by 20,
   * if less than 60, by 15,
   * and less than 90, by 10.
   * @param correctGuessedTeam the team that correctly guessed the answer
   * @param guessedTimeTaken the time taken to get the correct guess
   */
  const updateCorrectGuessingTeamPoints = (
    correctGuessedTeam,
    guessedTimeTaken
  ) => {
    teams.forEach((team) => {
      if (team.teamname === correctGuessedTeam) {
        if (guessedTimeTaken < 30) {
          // if they guessed in less than 30 seconds, they get 20 points and so on
          team.points += 20;
        } else if (guessedTimeTaken < 60) {
          team.points += 15;
        } else if (guessedTimeTaken < 90) {
          team.points += 10;
        } else {
          team.points += 5;
        }
      }

      validateLevelPoints(team);
    });

    teamsValue.set(teams);
  };

  /**
   * This updates the team's points that guessed wrongly.
   * It increases the team's points by 3 with every wrong guess,
   * no matter the time taken.
   * @param wrongGuessingTeam the team that made the wrong guess
   */
  const updateWrongGuessingTeamPoints = (wrongGuessingTeam) => {
    teams.forEach((team) => {
      if (team.teamname === wrongGuessingTeam) {
        team.points += 3;
      }

      validateLevelPoints(team);
    });

    teamsValue.set(teams);
  };

  /**
   * This function updates the drawing team's points.
   * It increases the points based on the percentage
   * of those who guessed correctly as to the total number
   * of teams playing the round.
   * The points awarded as follows:
   * percentage up to 25 gets 10 points,
   * up to 50 - 20 points,
   * up to 75 - 30,
   * up to 100 - 40.
   * @param drawingTeam the currently drawing team
   * @param numberOfGuessedTeams the number of teams that guessed correctly
   */
  const updateDrawingTeamPoints = (drawingTeam, numberOfGuessedTeams) => {
    if (numberOfGuessedTeams < teams.length) {
      const percentage = getGuessedTeamsPercentage(numberOfGuessedTeams);

      teams.forEach((team) => {
        if (team.teamname === drawingTeam) {
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

        validateLevelPoints(team);
      });

      teamsValue.set(teams);
    }
  };

  /**
   * This calculates the percentage of the teams
   * that guessed correctly out of the total number of teams.
   * It excludes the drawing team.
   * @param numberOfGuessedTeams the number of teams that guessed correctly
   * @returns {number} the percentage
   */
  const getGuessedTeamsPercentage = (numberOfGuessedTeams) => {
    const teamsSize = teams.length - 1;
    const percentage = (numberOfGuessedTeams / teamsSize) * 100;

    return percentage;
  };

  /**
   * This function checks the level per team
   * and the amount of shards each team can get.
   * It increases the amount of shards by the number
   * of level at every checkpoint.
   * The checkpoints are: 25, 50 and 80.
   * When the team levels up, the checkpoints are reset.
   * @param team the team whose points are being checked
   */
  const validateLevelPoints = (team) => {
    if (team.points >= 25 && !team.checkpoints.one) {
      team.shards += team.level;
      team.checkpoints.one = true;
    } else if (team.points >= 50 && !team.checkpoints.two) {
      team.shards += team.level;
      team.checkpoints.two = true;
    } else if (team.points >= 80 && !team.checkpoints.three) {
      team.shards += team.level;
      team.checkpoints.three = true;
    } else if (team.points >= 100) {
      // we make sure no team has more than the maximum amount of points
      team.points -= 100;
      team.level++;
      team.checkpoints.one = false; // TODO needs refactoring
      team.checkpoints.two = false;
      team.checkpoints.three = false;
    }
  };

  let username;

  const session = "main";

  onMount(() => {
    username = `User${Math.round(Math.random() * 10000)}`;
    socket.emit("joinSession", { username, session }, () => {
      randomizeDrawer();
      promise = getRole();
      socket.emit("canvas:new-user");
      joinMatch();
    });
  });

  teamsValue.set(teams);

  const joinMatch = () => {
    socket.emit("teams:get");
    socket.emit("teams:join"); //TODO: This should only run on matchmaking
  };

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

  let teamSize = 0;

  socket.on("teams:update", (data) => {
    if (!data) {
      return;
    }

    data.forEach((t) => {
      t.members.forEach((u) => {
        if (u.username === username) {
          t.isSelf = true;
          u.current = true;
          teamSize = t.members.length;
        }
      });
    });

    teams = data;
  });

  async function getRole() {
    return role;
  }

  let role = 3;

  let randomizeDrawer = () => {
    const rng = Math.random();
    if (rng < 0.33) {
      role = 1;
    } else if (rng > 0.33 && rng < 0.66) {
      role = 2;
    } else {
      role = 3;
    }
  };

  let promise = getRole();

  const becomeDrawer = () => {
    role = 1;
    promise = getRole();
  };
  const becomeGuesser = () => {
    role = 2;
    promise = getRole();
  };
  const becomeSpectator = () => {
    role = 3;
    promise = getRole();
  };

  // 1: drawer
  // 2: guesser
  // 3: spectator
  socket.on("canvas:drawer", becomeDrawer);
  socket.on("canvas:guesser", becomeGuesser);
  socket.on("canvas:spectator", becomeSpectator);

  const makeAllSpec = () => {
    socket.emit("canvas:spectator");
  };
  const makeAllDrawer = () => {
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

  const updateGuessState = (payload) => (teamGuesses = payload);
  socket.on("round:progress", updateGuessState);

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

  socket.on("round:result", (payload) => (results = payload));

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
      {teamSize}
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
