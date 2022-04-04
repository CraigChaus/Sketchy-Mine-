<script>
    import Icon from "svelte-awesome";
    import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
    import { createEventDispatcher } from "svelte";
    import SvelteTooltip from "svelte-tooltip";

    /**
     * Component to be used as a popup window
     */

    export let title = "Matchmaking";
    export let instruction = "Trying to find team a team ...";
    export let status = "Waiting for players...";
    export let showButtons = true;

    const dispatch = createEventDispatcher();

    export let exitButtonClicked = () => dispatch("ClickExit");
    export let spectateButtonClicked = () => dispatch("ClickSpectate");
</script>

<div
    class="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
>
    <div class="absolute bg-black opacity-80 inset-0 z-0" />
    <div
        class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white "
    >
        <!--Main content-->
        <div class="">
            <!-- Body of the popup-->
            <div class="text-center p-5 flex-auto justify-center">
                <Icon data={faCircleInfo} scale="3" style="color: blue" />
                <h2 class="text-xl font-bold py-4 ">{title}</h2>
                <p class="text-sm text-gray-700 px-8">
                    {instruction}
                </p>
                <p class="text-xs mt-2 text-gray-500 px-8">
                    {status}
                </p>
            </div>
            <!-- Action buttons-->
            <div class="p-3  mt-2 text-center space-x-4 md:block">
                {#if showButtons}
                    <SvelteTooltip
                        tip="Go back to title page"
                        top
                        color="#C9D9FF"
                    >
                        <button
                            class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm font-medium tracking-wider border text-gray-600 rounded-full hover:bg-gray-100 transition-all"
                            on:click={exitButtonClicked}
                        >
                            Exit
                        </button>
                    </SvelteTooltip>
                    <SvelteTooltip
                        tip="Cancel matchmaking and spectate instead"
                        top
                        color="#C9D9FF"
                    >
                        <button
                            class="mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-5 py-2 text-sm font-medium tracking-wider text-white rounded-full hover:bg-blue-600 transition-all"
                            on:click={spectateButtonClicked}
                        >
                            Spectate
                        </button>
                    </SvelteTooltip>
                {/if}
            </div>
        </div>
    </div>
</div>
