<script>

import Canvas from "../Canvas/Canvas.svelte";
import ChatBox from "../components/chat/ChatBox.svelte";
import TeamList from "../components/team/TeamList.svelte";
let teamContentJSON = [
    {"teamname":"Team 1", "isDrawing": false, "isSelf": true, "won": true, "placementNr": 2},
    {"teamname":"Team 2", "isDrawing": true, "isSelf": false, "won": undefined, "placementNr": undefined},
    {"teamname":"Team 3", "isDrawing": false, "isSelf": false, "won": true, "placementNr": 1},
    {"teamname":"Team 4", "isDrawing": false, "isSelf": false, "won": false, "placementNr": undefined},
    {"teamname":"Team 5", "isDrawing": false, "isSelf": false, "won": false, "placementNr": undefined},
    {"teamname":"Team 6", "isDrawing": false, "isSelf": false, "won": true, "placementNr": 3},
    {"teamname":"Team 7", "isDrawing": false, "isSelf": false, "won": true, "placementNr": 4},
    {"teamname":"Team 8", "isDrawing": false, "isSelf": false, "won": false, "placementNr": undefined},
    {"teamname":"Team 9", "isDrawing": false, "isSelf": false, "won": false, "placementNr": undefined},
    {"teamname":"Team 10", "isDrawing": false, "isSelf": false, "won": false, "placementNr": undefined},
    {"teamname":"Team 11", "isDrawing": false, "isSelf": false, "won": false, "placementNr": undefined}
]

let chatContentJSON = [
    {"username":"Bob","message":"Hello everyone!","type": 2},
    {"username":"Jack","message":"Good luck!","type": 1},
    {"username":"Alice","message":"Thank you! Same to y'all!","type": 2},
    {"username":"Mark","message":"Have fun!","type": 2},
]
</script>

<div class="flex mb-4">
    <div class="w-1/3 h-12">
        <TeamList showResults={true} contentJSON={teamContentJSON}/>
    </div>

    <div class="w-full h-full h-full bg-gray-500 h-12">
        <Canvas/>
    </div>
    <div class="w-1/3 h-full h-12">
        <ChatBox contentJSON={chatContentJSON}/>
    </div>
</div>