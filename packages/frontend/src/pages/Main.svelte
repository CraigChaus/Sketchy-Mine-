<script>
    import Canvas from "../Canvas/Canvas.svelte";
    import Toolbox from "../Canvas/Toolbox.svelte";
    import Chat from "./Chat.svelte";
    import PageLayout from "../components/PageLayout/PageLayout.svelte";

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

            <div class="">

                <div class="row m-2 p-2 items-center justify-center">
                    <div class=" ">
                        <Canvas bind:this={SDraw} {brushColor} {brushRadius} canvasWidth="640"/>
                    </div>
                </div>
                <div class="flex-row justify-center">
                    <Toolbox bind:SDraw={SDraw} bind:brushColor={brushColor} bind:brushRadius={brushRadius}/>
                </div>

            </div>
            <div class="w-1/3 p-2 m-4 justify-center">
                <Chat/>
            </div>
        </div>
    </div>
</PageLayout>