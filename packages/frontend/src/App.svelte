<script>

  
  import Main from './pages/Main.svelte';
  import Login from './pages/Login.svelte';
  import Register from './pages/Register.svelte';
  import Home from './pages/Home.svelte';

  import router from 'page';

  let page;
  let params;

  router('/game', (ctx) => page = Main);
  router('/login', (ctx) => page = Login);
  router('/register', (ctx) => page = Register);
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