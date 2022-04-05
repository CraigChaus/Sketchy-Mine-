<script xmlns="http://www.w3.org/1999/html">
    import {
        Hint,
        HintGroup,
        required,
        useForm,
        validators,
    } from "svelte-use-form";
    import { API_URL } from "../socket";

    const form = useForm();

    const handleSubmit = async () => {
        const response = await signup();
        if (response) {
            if (response["status"] === 201) {
                alert("Successfully registered");
            }
        }
    };

    let username = "";
    let password = "";
    const signup = async () => {
        const response = await fetch(API_URL + "/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 201) {
            alert("Account successfully created"); //FIXME redirect to some other page
        } else {
            alert("Sign up failed \n" + response.statusText); //FIXME display message from backend
        }
    };
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <form use:form action="" on:submit|preventDefault={handleSubmit}>
            <div class="relative mb-4">
                <label for="username" class="leading-7 text-sm text-gray-600"
                    >Username</label
                >
                <input
                    type="text"
                    id="username"
                    name="username"
                    use:validators={[required]}
                    bind:value={username}
                    class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                <Hint for="username" on="required" class="text-red-500"
                    >This is a mandatory field</Hint
                >
            </div>

            <div class="relative mb-4">
                <label for="password" class="leading-7 text-sm text-gray-600"
                    >Password</label
                >
                <input
                    type="password"
                    id="password"
                    name="password"
                    bind:value={password}
                    class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                <HintGroup for="password">
                    <Hint on="required" class="text-red-500"
                        >This is a mandatory field</Hint
                    >
                    <Hint
                        on="checkPassword"
                        class="text-red-500"
                        hideWhenRequired
                        let:value
                        >Your password is not strong enough
                    </Hint>
                </HintGroup>
            </div>

            <button
                class="px-6 py-2 mt-1 text-white bg-green-500 rounded-lg hover:bg-green-700"
                on:click|preventDefault={signup}>Sign up</button
            >

            <p class="text-center mt-2">
                Already have an account? <a
                    href="/login"
                    class="text-green-600 font-medium underline">Login</a
                >
            </p>
        </form>
    </div>
</div>
