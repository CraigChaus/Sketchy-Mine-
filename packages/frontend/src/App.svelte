<script>

  import Main from './pages/Main.svelte';
  import LogIn from './pages/LogIn.svelte';
  import Home from './pages/Home.svelte';
  import router from 'page';
  import SignUp from './pages/SignUp.svelte';
  import Ranking from './pages/Ranking.svelte';
  import EndedSession from "./pages/EndedSession.svelte";

  let page;
  let params;

  router('/game', (ctx) => page = Main);
  router('/login', (ctx) => page = LogIn);
  router('/register', (ctx) => page = SignUp);
  router('/game?spectate', (ctx) => page = Main);
  router('/leaderboards', (ctx) => page = Ranking);
  router('/ended_session', (ctx) => page = EndedSession);

  router('/', (ctx) => page = Home);

  router.start();

  const home = async () =>{
    router.redirect('/')
  }

</script>
<!-- <a href="">
  <img on:click={home} style="width: 100px;" src="favicon.png" alt="logo">
</a> -->
<!-- <Main /> -->
<!-- <Home/> -->

<svelte:component this="{page}" {params} />

<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>