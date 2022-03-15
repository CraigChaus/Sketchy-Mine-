<script>
    import tokenStore from '../stores/token';
    import userStore from '../stores/user';
    import { onMount } from 'svelte';

    let user = {};
    onMount(async () => {
        userStore.subscribe(value => user = value);
    });

    const handleSubmit = async () => {
        const response = await submit();
        if (response) {
            if (response['status'] === 200) {
                alert("You have successfully logged in, you should be redirected to some other page")
            } else {
                alert("Unsuccessful login, sorry ")
            }
        }
    };

    let username = '';
    let password = '';
    async function submit() {
        try {
            const response = await fetch('http://localhost:3000/credentials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({username, password}),
            });
            const data = await response.json();
            $tokenStore.token = data.token;
            $userStore = data.user;
            return await response;
        } catch (e) {
            console.log(e);           }
    }

</script>
<div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <form action="" on:submit|preventDefault ={handleSubmit}>
            <div class="mt-4">
                <div>
                    <label class="block">Username</label>
                        <input type="text"
                               class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                               bind:value={username}>
                </div>
                <div class="mt-4">
                    <label class="block">Password</label>
                        <input type="password"
                               class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                               bind:value={password}>
                </div>
                <div class="flex items-baseline justify-between">
                    <button class="px-6 py-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-blue-900">Login</button>
                </div>
            </div>
        </form>
    </div>
</div>

