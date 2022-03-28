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
  import { token } from '../stores/token';
  import { user } from '../stores/user';
  import LeaveButton from "../components/LeaveButton.svelte";
  import router from "page";

  import { getNotificationsContext } from "svelte-notifications";

  const { addNotification } = getNotificationsContext();
  let myTeamName;

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

  // Progress bar functionality
  // FIXME: This function has been moved to the backend
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

    //sorr but this has to be called before the await else it won't work
    //ugly double checking of spectator to have optimal functionality :(

    if (spectator) {
      //user is a spectator
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
        currentTime: data.currentTime,
      },
    ];
  });

  // Update team listing
  socket.on("teams:update", (data) => {
    if (!data) {
      return;
    }

    data.forEach((t, i) => {
      t.members.forEach((u) => {
        if (u.username === username) {
          let teamName = "Team +" + (i + 1);
          myTeamName = t.teamname;
          myTeamName = t.teamname;

          if (teamSession !== teamName) {
            teamSession = teamName;

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
   * Helper function to hold the execution of the program
   * @param ms Milliseconds to wait
   */
  function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }

  /**
   * Exit current match and redirect page back to the home screen
   * Called by the matchmaking popup window
   */
  const exitMatch = () => {
    //TODO: Redirect to home screen
    router.redirect("/");
  };

  /**
   * Hide matchmaking popup box and place user into spectate mode
   */
  const startSpectate = () => (showMatchmakingPopup = false);

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
      // teamGuesses.push({ value: currentGuess, frequency: 1 });
      sendGuess(currentGuess);
    }

    chatInput = "";
  };

  const updateGuessState = (payload) => (teamGuesses = payload);

  const onClickGuessItem = (e) => sendGuess(e.detail);

  // Sending messages
  const onClickChat = () => {
    if (chatInput !== "") {
      socket.emit("chatMessage", chatInput);
      chatInput = "";
    }
  };

  const startRound = () => {
    isRoundActive = true;
    teamGuesses = [];
    currentGuess = null;
    socket.emit("round:start");
  };
  const sendGuess = (guess) => socket.emit("round:guess", guess);

  /**
   * Update timer
   * @param payload Timer data
   */
  const updateProgress = (payload) => {
    timeRemainingInSeconds = payload.roundTime;
    if (timeRemainingInSeconds < 1) isRoundActive = false;
    else isRoundActive = true;
  };

  const lockCanvas = () => {
    restrictCanvas = true;
  }

  const unlockCanvas = () => {
    restrictCanvas = false;
  }

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
  socket.on("canvas:unlock", unlockCanvas)

  

  const leaveGame = () => {
    router.redirect("/ended_session");
  };

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
    <LeaveButton on:buttonClicked={leaveGame}>LEAVE</LeaveButton>
    <button
              on:click={startRound}
              class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >Start Round</button
            >
    <ProgressBar {teams} />

    <TeamStatistics {myTeam}/>

    <div class="flex items-center justify-center">
      {#await promise}
        <p>Loading word...</p>
      {:then role}
        {#if role == 1}
          <h2 class="text-white text-xl">Word To Draw: <span class="italic font-medium">{correctWord}</span></h2>
        {/if}
      {/await}
    </div>

    <div class="flex">
      <div class="w-1/4 guesswindow">
        {#await promise}
          <p>loading..</p>
        {:then role}
          {#if role != 3}
            <GuessList
                    on:guessClicked={onClickGuessItem}
                    {teamGuesses}
                    teamNumber={1}
                    currentGuess={currentGuess ? currentGuess.toLowerCase() : null}
                    {timeRemainingInSeconds}
                    {teamSize}
            />
            {:else}
            <GuessList role={3} {timeRemainingInSeconds}/>
          {/if}
        {/await}

        <TeamList showResults={results != null} contentJSON={teams} />
      </div>

      <div class="w-2/4 h-full space-y-1 canvas">
        <Canvas
          {restrictCanvas}
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
            {#if role === 1 && !restrictCanvas}
              <Toolbox bind:SDraw bind:brushColor bind:brushRadius />
            {/if}
            {#if restrictCanvas}
            <p>round ended</p>
            {:else}
              <p>You are currently a {roles[role-1]}</p>
            {/if}
            
          {/await}
        </div>

        <MessageBar
          {role}
          bind:input={chatInput}
          on:guessWordClicked={onClickGuess}
          on:sendChatClicked={onClickChat}
          guessButtonDisabled={!isRoundActive}
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
  .guesswindow{
    border: 30px solid transparent;
    border-image: url("/images/ChatBox.png") 30 round;
    background: white;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.5) ;
  }
  .chatwindow{
    border: 30px solid transparent;
    border-image: url("/images/ChatBox.png") 30 round;
    background: white;
    border-radius: 5px;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.5) ;
  }
  .canvas{
    padding: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    background: white;
    border-radius: 5px;
  }

</style>