<script>
    export let reason = 'You exited the game successfully!';

</script>

<div class="background">
    <div class="container">
        <div class="flex-row items-center justify-center p-20">
            <div class="bg-gray-100 opacity-50 rounded-md shadow-lg w-auto items-center justify-center font-serif">
                <div class="flex flex-col items-center justify-center m-8 p-10">
                    <p class="h-10 m-8 font-bold text-4xl">SESSION ENDED</p>
                    <p class="h-12 text-2xl"> {reason} </p>
                    <p class="h-12 text-xl">Your progress until now has been saved</p>
                </div>
                <div class="flex items-center justify-center m-8 p-10">
                    <p class="text-2xl">Click <a class="font-bold underline text-blue-600" href="/">here</a> to go to the home screen!</p>
                </div>
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
</style>
