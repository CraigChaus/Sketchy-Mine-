<script>
    import Canvas from "../Canvas/Canvas.svelte";
    import ChatBox from "../components/chat/ChatBox.svelte";
    import GuessList from "../components/guess/GuessBox.svelte";
    import TeamList from "../components/team/TeamList.svelte";
    import MessageBar from "../components/chat/MessageBar.svelte";
    import Toolbox from "../Canvas/Toolbox.svelte";
    import {onMount} from "svelte";
import socket from "../socket";
import { faL, fas } from "@fortawesome/free-solid-svg-icons";

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
    
    async function getRole(){
        return role;
    }

    let role = 3;

    onMount( () =>{
        randomizeDrawer();
        promise = getRole();
        socket.emit('canvas:new-user')

    });
    let randomizeDrawer = () => {
        let rng = Math.random();
        if (rng < 0.33){
            role = 1;
        }else if (rng > 0.33 && rng < 0.66) {
            role = 2;
        }else{
            role = 3;
        }
        console.log(role);

    }

    let promise = getRole();

    let becomeDrawer = () =>{
        role = 1;    
        promise = getRole();
    }
    let becomeGuesser = () =>{
        role = 2;
        promise = getRole();
    }
    let becomeSpectator = () => {
        role = 3;
        promise = getRole();
        
        
    }

    //1: drawer
    //2: guesser
    //3: spectator
    socket.on('canvas:drawer', becomeDrawer);
    socket.on('canvas:guesser', becomeGuesser);
    socket.on('canvas:spectator', becomeSpectator);

    let makeAllSpec = () => {
        socket.emit('canvas:spectator')
    }
    let makeAllDrawer = () => {
        socket.emit('canvas:drawer')
    }
</script>

<div class="flex my-8">
    <div class="w-1/3 h-12 m-3">
        <GuessList teamNumber={1} {currentGuess}/>
        <TeamList showResults={true} contentJSON={teams}/>
    </div>

    <div class="w-full h-full">
        <Canvas role={role} bind:this={SDraw} {brushColor} {brushRadius} canvasWidth="640"/>
        <div class="flex-row justify-center">
            {#await promise}
            <p>loading..</p>
            {:then role}
            {#if role === 1}
                <Toolbox bind:SDraw={SDraw} bind:brushColor={brushColor} bind:brushRadius={brushRadius}/>
            {/if}
            <p>You are currently role {role}</p>
            {/await}
        </div>
        <MessageBar role={role}
                bind:input={chatInput}
                on:guessWordClicked={onClickGuess}
                on:sendChatClicked={onClickChat}
        />
        <button on:click={becomeDrawer} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">become drawer</button>
        <button on:click={becomeGuesser} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">become guesser</button>
        <button on:click={makeAllDrawer} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">make all users drawers</button>
        <button on:click={makeAllSpec} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">make all users spectators</button>
    </div>
    <div class="w-2/5 h-full mx-3">
        <ChatBox messages={chatMessages}/>
    </div>
</div>
