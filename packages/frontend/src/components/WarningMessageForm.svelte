<script>
    export let teamname;
    export let warning = '';
    import { token } from '../stores/token';
    import { createEventDispatcher } from 'svelte'
    import socket from '../socket';

    const dispatch = createEventDispatcher();

    // let showWarningFormMethod = () =>{
    //     showWarningForm = true;
    // }

    export let cancel = dispatch('cancelWarning');

    export let send = () => {
        let payload = {
            team: teamname,
            token: $token,
            message: warning
        };
        socket.emit("moderation:send_warning", payload)
        cancel();
    }
    
</script>

<div class="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex
    justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
    <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
    <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        <!--Main content-->
        <div class="">
            <!-- Body of the popup-->
            <div class="text-center p-5 flex-auto justify-center">
                <h2 class="text-xl font-bold py-4 ">Warning form</h2>
                <p class="text-sm text-gray-700 px-8">
                    Sending warning to {teamname}
                </p>
            </div>
            <!-- Message box to contain the warning -->
            <div class="items-center">
                <input class="bg-gray-200 border-green-400 rounded-md w-full h-12 p-2" type="text" bind:value={warning}>
            </div>
            <!-- Action buttons-->
            <div class="p-3 mt-2 text-center space-x-4 md:block">
                <button class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm font-medium tracking-wider border
                                text-gray-600 rounded-full hover:bg-gray-100 transition-all"
                        on:click={cancel}>Cancel
                </button>
                <button class="mb-2 md:mb-0 bg-blue-500 border border-blue-500 px-5 py-2 text-sm font-medium
                                tracking-wider text-white rounded-full hover:bg-blue-600 transition-all"
                        on:click={send}>Send
                </button>
            </div>
        </div>
    </div>
</div>
