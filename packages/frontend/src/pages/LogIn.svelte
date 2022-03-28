<script>
  import router from "page";
  import { token } from "../stores/token";
  import { user } from "../stores/user";
  import { API_URL } from "../socket";

  const handleLogin = async () => {
    const response = await login();
    if (response) {
      if (response["status"] === 200) {
        router.redirect("/game");
      } else {
        alert("Unsuccessful login, sorry!");
      }
    }
  };

  let username = "";
  let password = "";
  async function login() {
    try {
      const response = await fetch(API_URL + "/credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      $token = data.token;
      $user = data.user;

      return await response;
    } catch (e) {
      alert("Unsuccessful login, sorry!");
      console.log(e);
    }
  }

  const handleLogout = () => {
    $token = "";
    $user = "";
  };
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
    <form action="" on:submit|preventDefault={handleLogin}>
      <div class="mt-4">
        <div>
          <label class="block" for="username">Username</label>
          <input
            type="text"
            id="username"
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            bind:value={username}
          />
        </div>
        <div class="mt-4">
          <label class="block" for="password">Password</label>
          <input
            type="password"
            id="password"
            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            bind:value={password}
          />
        </div>
        <div class="flex items-baseline justify-between">
          <button
            class="px-6 py-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-700"
          >
            Log in</button
          >
        </div>
        <p class="text-center mt-2">
          Don't have an account? <a
            href="/register"
            class="text-green-600 font-medium underline">Sign Up</a
          >
        </p>
      </div>
    </form>
  </div>
</div>
