<script>

import Canvas from "../Canvas/Canvas.svelte";
import Toolbox from "../Canvas/Toolbox.svelte";
export let styles = "";
let brushColor = "#444";
let brushRadius = 10;
let SDraw = null;


function clear() {
    SDraw.clearDrawings();
}
</script>

<div class="flex mb-4">
    <div class="w-1/3 bg-gray-400 h-12">
        <p>teams go here.
            teams go here. teams go here. teams go here. teams go here. teams go here. teams go here.
            teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go here.
            teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go here.
            teams go here. teams go here. teams go here. teams go here. teams go here. teams go here.
            teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go here.
            teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go here.v
            teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go here. teams go here.
        </p>
    </div>

    <div class="w-full h-full h-full h-12">
        <div class="container">


            <div class="col">

                <div class="row">
                    <div class="col d-flex justify-content-center">
                        <h2>Draw board </h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col d-flex justify-content-center">
                        <Canvas
                                bind:this={SDraw}
                                {brushColor}
                                {brushRadius}
                                canvasWidth="640" />
                    </div>
                </div>
                <hr>
                <div class="flex-row justify-center">
                 <div  class="inline-block float-left">
                                        <label >Color</label>
                                        <input  type="color" bind:value={brushColor} />
                 </div>
                 <div  class="inline-block float-left">
                                        <label>Size</label>
                                        <input type="number" bind:value={brushRadius} />
                 </div>

                    <div class="inline-block float-right">
                        <button class="bg-green-600 rounded-lg border-none text-white p-2 text-center text inline-block transition-all cursor-pointer {styles}" on:click={clear}>Clear</button>
                    </div>




                </div>
            </div>
        </div>

    </div>
    <div class="w-1/3 h-full bg-gray-400 h-12">
        <p>chat goes here. chat goes here. chat goes here. chat goes here. chat goes here. chat goes here. chat goes here.
            chat goes here. chat goes here. chat goes here. chat goes here. chat goes here. chat goes here. chat goes here. chat goes here.
            chat goes here. chat goes here. chat goes here. chat goes here. chat goes here. chat goes here. chat goes here.
            chat goes here. chat goes here. chat goes here. chat goes here. chat goes here. chat goes here. chat goes here.
            chat goes here. chat goes here. chat goes here. chat goes here. chat goes here. chat goes here.
        </p>
    </div>
</div>
