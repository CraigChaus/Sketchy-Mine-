<script>
    import { token } from '../stores/token';
    import { user } from '../stores/user';
    import {onDestroy, onMount} from 'svelte';
    import { API_URL } from "../socket";

    let userValue = {};
    onMount( async () => {
        user.subscribe((u) => (userValue = u))
    });

    const unsubscribe = user.subscribe((u) => (userValue = u))

    const handleLogin = async () => {
        const response = await login();
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
    async function login() {
        try {
            const response = await fetch(API_URL + '/credentials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({username, password}),
            });

            const data = await response.json();
            token.update(() => data.token);
            user.update(() => JSON.stringify(data.user));

            return await response;
        } catch (e) {
            console.log(e);
        }
    }

    const handleLogout = () => {
        user.update(() => (''))
    }

    onDestroy(unsubscribe);
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <form action="" on:submit|preventDefault ={handleLogin}>
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
