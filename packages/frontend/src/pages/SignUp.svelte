<script>
    import {Hint, HintGroup, required, useForm, validators} from "svelte-use-form";
    import { API_URL } from "../socket";

    const form = useForm();

    const handleSubmit = async () => {
        const response = await signup();
        if (response) {
            if (response['status'] === 201) {
                alert("Successfully registered");
            }
        }
    };

    let email_address;
    let username = '';
    let password = '';
    const signup = async () => {
        const response = await fetch(API_URL + '/users', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({username, password})
        });

        if (response.status === 201) {
            alert("Account successfully created"); //FIXME redirect to some other page
        } else {
            alert("Sign up failed \n" + response.statusText); //FIXME display message from backend
        }
    }
</script>

<div class="container h-screen px-5 py-24 mx-auto flex flex-wrap items-center">
    <form use:form action="" on:submit|preventDefault={handleSubmit}
          class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">

        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign up</h2>

        <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" bind:value={email_address}
                   class=""/>
            <HintGroup for="email">
                <Hint on="required" class="text-red-500">This is a mandatory field</Hint>
                <Hint on="checkEmail" class="text-red-500" hideWhenRequired let:value>Invalid email</Hint>
            </HintGroup>
        </div>

        <div class="relative mb-4">
            <label for="username" class="leading-7 text-sm text-gray-600">Username</label>
            <input type="text" id="username" name="username" use:validators={[required]} bind:value={username}
                   class=""/>
            <Hint for="username" on="required" class="text-red-500">This is a mandatory field</Hint>
        </div>

        <div class="relative mb-4">
            <label for="password" class="">Password</label>
            <input type="password" id="password" name="password" bind:value={password}
                   class=""/>
            <HintGroup for="password">
                <Hint on="required" class="text-red-500">This is a mandatory field</Hint>
                <Hint on="checkPassword" class="text-red-500" hideWhenRequired let:value>Your password is not strong
                    enough
                </Hint>
            </HintGroup>
        </div>

        <button class=""
                on:click|preventDefault={signup}>Sign up</button>

        <p class="text-center">Already have an account? <a href="/login">Login</a></p>
    </form>
</div>