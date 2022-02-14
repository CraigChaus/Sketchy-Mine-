<script>

import Canvas from "../Canvas/Canvas.svelte";
import Toolbox from "../Canvas/Toolbox.svelte";
</script>

<main>
    <div class="w-full flex flex-col ">
        <div class="w-1/5 bg-gray-400 h-12">
            <h1>hello</h1>
        </div>
        <div class="w-1/3 bg-gray-500 h-12">
            <Canvas/>
        </div>
        <div class="w-1/5 bg-gray-400 h-12">
            <Toolbox/>
        </div>
    </div>
</main>
