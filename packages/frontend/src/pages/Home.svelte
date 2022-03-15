<script>
  import router from "page";


  const login = async () =>{
    router.redirect('/login')
  }
  const play = async () =>{
    router.redirect('/game')
  }
  const register = async () =>{
    router.redirect('/signup')
  }
  const leaderboards = async () =>{
    
  }
</script>

<div class="flex flex-col">
    <button
      on:click={login}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >login</button
    >
    <button
      on:click={play}
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >play</button
    >
    <button
      on:click={register}
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >register</button
    >
    <button
      class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      >leaderboards</button
    >
</div>