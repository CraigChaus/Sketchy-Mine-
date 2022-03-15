<script>

  
  import Main from './pages/Main.svelte';
  import Login from './pages/Login.svelte';
  import Home from './pages/Home.svelte';

  import router from 'page';
  import SignUp from './pages/SignUp.svelte';

  let page;
  let params;

  router('/game', (ctx) => page = Main);
  router('/login', (ctx) => page = Login);
  router('/signup', (ctx) => page = SignUp);
  router('/', (ctx) => page = Home);

  router.start();

</script>

<!-- <Main /> -->
<!-- <Home/> -->

<svelte:component this="{page}" {params} />

<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>