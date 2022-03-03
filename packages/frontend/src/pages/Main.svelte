<script>
    import Canvas from "../Canvas/Canvas.svelte";
    import ChatBox from "../components/chat/ChatBox.svelte";
    import GuessList from "../components/guess/GuessBox.svelte";
    import TeamList from "../components/team/TeamList.svelte";
    import MessageBar from "../components/chat/MessageBar.svelte";
    import Toolbox from "../Canvas/Toolbox.svelte";

    let teams = [
        {
            teamname: "Team 1",
            isDrawing: false,
            isSelf: true,
            won: true,
            placementNr: 2,
        },
        {
            teamname: "Team 2",
            isDrawing: true,
            isSelf: false,
            won: undefined,
            placementNr: undefined,
        },
        {
            teamname: "Team 3",
            isDrawing: false,
            isSelf: false,
            won: true,
            placementNr: 1,
        },
        {
            teamname: "Team 4",
            isDrawing: false,
            isSelf: false,
            won: false,
            placementNr: undefined,
        },
        {
            teamname: "Team 5",
            isDrawing: false,
            isSelf: false,
            won: false,
            placementNr: undefined,
        },
        {
            teamname: "Team 6",
            isDrawing: false,
            isSelf: false,
            won: true,
            placementNr: 3,
        },
        {
            teamname: "Team 7",
            isDrawing: false,
            isSelf: false,
            won: true,
            placementNr: 4,
        },
        {
            teamname: "Team 8",
            isDrawing: false,
            isSelf: false,
            won: false,
            placementNr: undefined,
        },
        {
            teamname: "Team 9",
            isDrawing: false,
            isSelf: false,
            won: false,
            placementNr: undefined,
        },
        {
            teamname: "Team 10",
            isDrawing: false,
            isSelf: false,
            won: false,
            placementNr: undefined,
        },
        {
            teamname: "Team 11",
            isDrawing: false,
            isSelf: false,
            won: false,
            placementNr: undefined,
        },
    ];

    let chatMessages = [
        {username: "Bob", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", type: 2},
        {username: "Jack", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", type: 1},
        {username: "Alice", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", type: 2},
        {username: "[SYSETM]", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.!", type: 3},
        {username: "Mark", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", type: 2},
        {username: "Susan", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", type: 2},
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

    let brushColor = "#444";
    let brushRadius = 8;
    let SDraw = null;

    function clear() {
        SDraw.clearDrawings();
    }
</script>

<div class="flex">
    <div class="w-1/4 h-12">
        <GuessList teamNumber={1} {currentGuess}/>
        <TeamList showResults={true} contentJSON={teams}/>
    </div>

    <div class="w-2/4 h-full">
        <Canvas bind:this={SDraw} {brushColor} {brushRadius} canvasWidth="640"/>
        <div class="flex-row justify-center">
            <Toolbox bind:SDraw={SDraw} bind:brushColor={brushColor} bind:brushRadius={brushRadius}/>
        </div>
        <MessageBar
                bind:input={chatInput}
                on:guessWordClicked={onClickGuess}
                on:sendChatClicked={onClickChat}
        />
    </div>
    <div class="w-1/4 h-full mx-3">
        <ChatBox messages={chatMessages} />
    </div>
</div>
