<script>
  import router from "page";


  const play = async () =>{
    router.redirect('/game')
  }
  const spectate = async () =>{
    router.redirect('/game?spectator')
  }
  const ranking = async () =>{
    router.redirect('/leaderboards')
  }
  const rules = async () =>{
    // router.redirect('/rules')
    console.log("no rules yet")
  }
  const login = async () =>{
    router.redirect('/login')
  }
  const register = async () =>{
    router.redirect('/register')
  }



</script>


<body class="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" style="font-family:'Lato',sans-serif;">
<main  class="bg-white max-w-lg mx-auto p-8 md:p-12 my-3 rounded-lg shadow-2xl">

    <section>
        <button on:click={play} class="text-4xl font-bold text-white text-center bg-green-400 hover:bg-green-600  py-2 px-4 rounded my-3 mx-16 w-72">Play</button>
        <button on:click={spectate} class="text-4xl font-bold text-white text-center bg-yellow-400 hover:bg-yellow-600  py-2 px-4 rounded my-3 mx-16 w-72">Spectate</button>
        <button on:click={ranking} class="text-4xl font-bold text-white text-center bg-pink-400 hover:bg-pink-600  py-2 px-4 rounded my-3 mx-16 w-72">Ranking</button>
        <button on:click={rules} class="text-4xl font-bold text-white text-center bg-red-500 hover:bg-red-700  py-2 px-4 rounded my-3 mx-16 w-72">Rules</button>
    </section>

    <section class="mt-10">
        <button on:click={login} class="text-4xl font-bold text-white text-center bg-blue-400 hover:bg-blue-600  py-2 px-4 rounded my-3 mx-16 w-72">Log in</button>
        <button on:click={register} class="text-4xl font-bold text-white text-center bg-blue-700 hover:bg-blue-900  py-2 px-4 rounded my-3 mx-16 w-72">Register</button>
    </section>

</main>
</body>
