<script>
</script>

<body
  class="flex bg-no-repeat bg-cover items-center justify-center min-h-screen pt-12 sm:pt-6 pb-3 px-1 "
  style="background-image: url(./images/Background2.png)"
>
  <main
    class="bg-white max-w-lg mx-auto items-center pt-3 sm:pt-6 pb-3 px-1 w-2/3 md:p-12 my-3 rounded-lg shadow-2xl"
  >
    <section>
      <a href="/game">
        <button
          class="text-4xl font-bold text-white text-center bg-green-400 hover:bg-green-600  py-2 px-4 rounded my-3 mx-16 w-72"
        >
          Play
        </button>
      </a>

      <a href="/game?spectator">
        <button
          class="text-4xl font-bold text-white text-center bg-yellow-400 hover:bg-yellow-600  py-2 px-4 rounded my-3 mx-16 w-72"
        >
          Spectate
        </button>
      </a>

      <a href="/leaderboards">
        <button
          class="text-4xl font-bold text-white text-center bg-pink-400 hover:bg-pink-600  py-2 px-4 rounded my-3 mx-16 w-72"
        >
          Ranking
        </button>
      </a>

      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="/rules">
        <button
          class="text-4xl font-bold text-white text-center bg-red-500 hover:bg-red-700  py-2 px-4 rounded my-3 mx-16 w-72"
        >
          Rules
        </button>
      </a>
    </section>

    <section class="mt-10">
      <a href="/login">
        <button
          class="text-4xl font-bold text-white text-center bg-blue-400 hover:bg-blue-600  py-2 px-4 rounded my-3 mx-16 w-72"
        >
          Log in
        </button>
      </a>

      <a href="/register">
        <button
          class="text-4xl font-bold text-white text-center bg-blue-700 hover:bg-blue-900  py-2 px-4 rounded my-3 mx-16 w-72"
        >
          Register
        </button>
      </a>
    </section>
  </main>
</body>
