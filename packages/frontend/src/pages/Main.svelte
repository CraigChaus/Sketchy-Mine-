<script>
    import Canvas from "../Canvas/Canvas.svelte";
    import ChatBox from "../components/chat/ChatBox.svelte";
    import GuessList from "../components/guess/GuessBox.svelte";
    import TeamList from "../components/team/TeamList.svelte";
    import MessageBar from "../components/chat/MessageBar.svelte";
    import Toolbox from "../Canvas/Toolbox.svelte";
    import Chat from "./Chat.svelte";
    import PageLayout from "../components/PageLayout/PageLayout.svelte";

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
        {username: "Bob", message: "Hello everyone!", type: 2},
        {username: "Jack", message: "Good luck!", type: 1},
        {username: "Alice", message: "Thank you! Same to y'all!", type: 2},
        {username: "Mark", message: "Have fun!", type: 2},
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
<PageLayout>
    <div class="p-4">
        <div class="flex mb-4">
            <div class="w-1/3 h-full bg-gray-300">
                <p>teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go
                    here.
                    teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go
                    here.
                    teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go
                    here.
                    teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go
                    here.
                    teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go
                    here.
                    teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go
                    here.
                    teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go
                    here.
                    teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go
                    here.
                </p>
            </div>
            <div class="flex my-8">
                <div class="w-1/3 h-12 m-3">
                    <GuessList teamNumber={1} {currentGuess}/>
                    <TeamList showResults={true} contentJSON={teams}/>
                </div>

                <div class="w-full h-full">
                    <Canvas bind:this={SDraw} {brushColor} {brushRadius} canvasWidth="640"/>
                    <MessageBar
                            bind:input={chatInput}
                            on:guessWordClicked={onClickGuess}
                            on:sendChatClicked={onClickChat}
                    />
                </div>
                <div class="w-2/5 h-full mx-3">
                    <ChatBox messages={chatMessages}/>
                </div>
                <div class="flex-row justify-center">
                    <Toolbox bind:SDraw={SDraw} bind:brushColor={brushColor} bind:brushRadius={brushRadius}/>
                </div>
                <div class="w-1/3 p-2 m-4 justify-center">
                    <Chat/>
                </div>
            </div>
        </div>
    </div>
</PageLayout>
