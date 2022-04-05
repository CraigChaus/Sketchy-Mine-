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
  import Popup from "../components/Popup.svelte";
  import TeamStatistics from "../components/team/TeamStatistics.svelte";
  import { token } from "../stores/token";
  import LeaveButton from "../components/LeaveButton.svelte";
  import router from "page";
  import { getNotificationsContext } from "svelte-notifications";

  const { addNotification } = getNotificationsContext();

  // Receiving guesses
  socket.on("guess", (guesses) => {
    if (!guesses) {
      return;
    }

    teamGuesses = [...guesses];
  });

  let roles = ["drawer", "guesser", "spectator"];

  let restrictCanvas = false; //used when the round ends.
  let results = null; // It has to be null when we want to hide the results on the team listing
  let username; //Current user's username
  let teams = []; // Points and colour are used by ProgressBar.
  let teamSize = 0;
  let chatMessages = []; //List of all chat messages
  let teamGuesses = []; //List of all guesses of current team
  let role = 2;
  let promise = getRole();
  let chatInput; //User's chat input
  let currentGuess = null; //Current guess of the user
  let brushColor = "#444";
  let brushRadius = 8;
  let SDraw = null;
  let showMatchmakingPopup = true; // Show popup window while player is not in an active team
  let popupWindowInstruction = "Looking for a team"; // Shown on the popup window (usually used at matchmaking)
  let popupWindowStatusText = `Please wait...`; // Used by the popup window to display various match statuses
  let popupWindowShowButtons = true; // Toggle the visibility of the popup window's buttons
  let cachedTeamSize = 0; // Used to check wether the team's size grows or declines
  let teamSession = "main";
  let correctWord;
  let myTeam;
  let isRoundActive = false; // Used to track when a round (when the times is running) is active
  let timeRemainingInSeconds = -1; // Set to -1 by default to indicate mid-round state
  let guessingDisabled = false;

  let sendingMessageAudio = new Audio("sounds/sendMessage_sound.mp3"); // Used to add audio when a message is sent
  // Set sendingMessageAudio to 40%
  sendingMessageAudio.volume = 0.4;

  let receivingMessageAudio = new Audio("sounds/messageReceived_sound.mp3"); // Used to add audio when a message is received
  // Set receivingMessageAudio to 40%
  receivingMessageAudio.volume = 0.4;

  /**
   * Warning: Unused
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
  // close socket connection on button click
  const leaveGame = () => {
    socket.disconnect();
  };

  const switchRoundStates = () => {
    // When round is over, we clear the guess cache
    if (!isRoundActive) {
      teamGuesses = [];
      currentGuess = null;
    }
  };

  $: isRoundActive, switchRoundStates();

  /**
   * Warning: Unused
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

  const showWarning = (message) => {
    addNotification({
      text: message,
      position: "bottom-left",
      type: "danger",
      removeAfter: 7000,
    });
  };

  onMount(() => {
    let spectator = window.location.href.includes("spectator");

    // Sorry but this has to be called before the await else it won't work
    //ugly double checking of spectator to have optimal functionality :(

    if (spectator) {
      // User is a spectator
      role = 3;
      showMatchmakingPopup = false;
    }

    let tokenValue = $token;

    socket.emit("joinSession", { tokenValue }, (sessionUsername) => {
      username = sessionUsername;
      if (!spectator) {
        // randomizeDrawer();
        joinMatch();
      } else {
        spectate();
      }
      socket.emit("canvas:new-user");
    });
    promise = getRole();
  });

  teamsValue.set(teams);

  const spectate = () => {
    socket.emit("teams:get");
    socket.emit("spectators:join");
  };

  const joinMatch = () => {
    socket.emit("teams:get");
    socket.emit("teams:join");
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
        currentTime: data.currentTime,
      },
    ];

    //receivingMessageAudio.play();
  });

  // Update team listing
  socket.on("teams:update", (data) => {
    if (!data) {
      return;
    }

    data.forEach((t, i) => {
      t.members.forEach((u) => {
        if (u.username === username) {
          if (teamSession !== t.teamname) {
            teamSession = t.teamname;
            socket.emit("joinTeamChat", { teamSession });
          }

          t.isSelf = true;
          u.current = true;
          teamSize = t.members.length;
          myTeam = t;
        }
      });
    });

    teams = data;
    if (role != 3) {
      handlePopup(); // Every time the teams get updated, we check if we need to show the matchmaking popup
    }
  });

  /**
   * Logic for when to show popup
   */
  function handlePopup() {
    if (teamSize === 3 && cachedTeamSize < 3) {
      cachedTeamSize = 3;
      showMatchmakingPopup = true;
      popupWindowInstruction = "Ready!";
      popupWindowStatusText = "Team formed";
      popupWindowShowButtons = false; // This time we hide the buttons, since team was formed (no more spectating)
      setTimeout(() => (showMatchmakingPopup = false), 2000); // Show the popup only for 2 seconds to inform players
    } else if (teamSize === 2 && cachedTeamSize >= 3) {
      cachedTeamSize = 2;
      showMatchmakingPopup = true;
      popupWindowInstruction = "Team disassembled";
      popupWindowStatusText = `Looking for more players (${teamSize}/3 players)`;
      popupWindowShowButtons = true; // We show the buttons to allow player to exit or spectate
    } else if (teamSize < 3 && cachedTeamSize < 3) {
      // Safe keeping
      cachedTeamSize = teamSize;
      showMatchmakingPopup = true;
      popupWindowInstruction = "Trying to make a team ...";
      popupWindowStatusText = `(${teamSize}/3 players)`;
      popupWindowShowButtons = true; // We show the buttons to allow player to exit or spectate
    }
  }

  /**
   * Exit current match and redirect page back to the home screen
   * Called by the matchmaking popup window
   */
  const exitMatch = () => {
    router("/");
  };

  /**
   * Hide matchmaking popup box and place user into spectate mode
   */
  const startSpectate = () => {
    showMatchmakingPopup = false;
    becomeSpectator();
  };

  async function getRole() {
    return role;
  }

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

  const onClickGuess = () => {
    if (chatInput !== "") {
      currentGuess = chatInput;
      sendGuess(currentGuess);
    }

    chatInput = "";
  };

  const updateGuessState = (payload) => (teamGuesses = payload);

  const onClickGuessItem = (e) => sendGuess(e.detail);

  // Sending messages
  const onClickChat = () => {
    if (chatInput !== "") {
      sendingMessageAudio.play();
      socket.emit("chatMessage", chatInput);
      chatInput = "";
    }
  };

  const sendGuess = (guess) => socket.emit("round:guess", guess);

  /**
   * Update timer
   * @param payload Timer data
   */
  const updateProgress = (payload) => {
    timeRemainingInSeconds = payload.roundTime;
    if (timeRemainingInSeconds < 1) isRoundActive = false;
    else {
      isRoundActive = true;
      if (teamGuesses.length === 0) guessingDisabled = false;
    }
  };

  const lockCanvas = () => {
    restrictCanvas = true;
  };

  const unlockCanvas = () => {
    restrictCanvas = false;
  };

  const lockGuesses = () => (guessingDisabled = true);

  socket.on("round:result", (payload) => {
    results = payload;
    correctWord = results.result;
    isRoundActive = false;
  });
  socket.on("round:progress", updateGuessState);

  // 1: drawer
  // 2: guesser
  // 3: spectator
  socket.on("canvas:drawer", becomeDrawer);
  socket.on("canvas:guesser", becomeGuesser);
  socket.on("canvas:spectator", becomeSpectator);
  socket.on("round:state", updateProgress);
  socket.on("canvas:lock", lockCanvas);
  socket.on("canvas:unlock", unlockCanvas);
  socket.on("moderation:receive_warning", showWarning);
</script>

<div class="background">
  <div class="container">
    {#if showMatchmakingPopup}
      <Popup
        instruction={popupWindowInstruction}
        status={popupWindowStatusText}
        on:ClickExit={exitMatch}
        on:ClickSpectate={startSpectate}
        showButtons={popupWindowShowButtons}
      />
    {/if}
    <LeaveButton on:buttonClicked={leaveGame} href="/ended_session"
      >LEAVE</LeaveButton
    >
    <ProgressBar {teams} />

    <TeamStatistics {myTeam} />

    <div class="flex items-center justify-center">
      {#await promise}
        <p>Loading word...</p>
      {:then role}
        {#if role == 1}
          <h2 class=" mb-3 text-white text-xl ">
            Word To Draw: <span class="neons italic font-medium "
              >{correctWord}</span
            >
          </h2>
        {/if}
      {/await}
    </div>

    <div class="flex fixedHeight">
      <div class="w-1/4 guesswindow h-full overflow-y-auto overflow-x-hidden">
        {#await promise}
          <p>Loading..</p>
        {:then role}
          {#if role != 3}
            <GuessList
              on:guessClicked={onClickGuessItem}
              {teamGuesses}
              currentGuess={currentGuess ? currentGuess.toLowerCase() : null}
              {timeRemainingInSeconds}
              {teamSize}
              {role}
              on:finalized={lockGuesses}
            />
          {:else}
            <GuessList
              role={3}
              {timeRemainingInSeconds}
              on:finalized={lockGuesses}
            />
          {/if}
        {/await}

        <TeamList showResults={results != null} contentJSON={teams} />
      </div>

      <div class="w-2/4 h-full space-y-1 canvas rounded-md">
        {#if timeRemainingInSeconds <= 5 && timeRemainingInSeconds > 0}
          <div class="p-2 bg-red-400 rounded-md animate-pulse" />
        {/if}
        <Canvas
          {restrictCanvas}
          {role}
          bind:this={SDraw}
          {brushColor}
          {brushRadius}
          canvasWidth="w-2/4"
        />
        {#if timeRemainingInSeconds <= 5 && timeRemainingInSeconds > 0}
          <div class="p-2 bg-red-400 rounded-md animate-pulse" />
        {/if}
        <div class="flex-row justify-center">
          {#await promise}
            <p>Loading..</p>
          {:then role}
            {#if role === 1 && !restrictCanvas}
              <Toolbox bind:SDraw bind:brushColor bind:brushRadius />
            {/if}
            {#if restrictCanvas}
              <p>Round over</p>
            {:else}
              <p>
                You are currently a <span class="text-blue-600 font-medium"
                  >{roles[role - 1]}</span
                >
              </p>
            {/if}
          {/await}
        </div>

        <MessageBar
          {role}
          bind:input={chatInput}
          on:guessWordClicked={onClickGuess}
          on:sendChatClicked={onClickChat}
          guessButtonDisabled={!isRoundActive || guessingDisabled}
        />
      </div>

      <div class="w-1/4 h-full chatwindow">
        <ChatBox messages={chatMessages} />
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 1366px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }
  .background {
    min-height: 100vh;
    background: url("/images/Background2.png");
    background-size: 100% 100%;
  }
  .guesswindow {
    border: 30px solid transparent;
    border-image: url("/images/ChatBox.png") 30 round;
    background: white;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  }
  .chatwindow {
    border: 30px solid transparent;
    border-image: url("/images/ChatBox.png") 30 round;
    background: white;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  }
  .canvas {
    padding: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    background: white;
  }

  /*  here will go styles for Guess word */
  @import url("https://fonts.googleapis.com/css?family=Codystar:300&display=swap");

  .neons {
    font-size: 2rem;
    text-align: center;
    font-weight: bold;
    -webkit-animation: glow 2s ease-in-out infinite alternate;
    -moz-animation: glow 2s ease-in-out infinite alternate;
    animation: glow 2s ease-in-out infinite alternate;
  }

  @-webkit-keyframes glow {
    from {
      color: #fff;
      text-shadow: 0 0 10px #00fff2, 0 0 20px #00fff2, 0 0 30px #00fff2,
        0 0 40px #00fff2, 0 0 50px #00fff2, 0 0 60px #00fff2, 0 0 70px #00fff2,
        0 0 90px #00fff2;
    }

    to {
      color: mediumspringgreen;
      text-shadow: 0 0 20px #00fff2, 0 0 30px #00fff2, 0 0 40px #00fff2,
        0 0 50px #00fff2, 0 0 60px #00fff2, 0 0 70px #00fff2, 0 0 80px #00fff2,
        0 1 90px #00fff2;
    }
  }

  .fixedHeight {
    max-height: 555px;
    height: 555px;
  }
</style>
