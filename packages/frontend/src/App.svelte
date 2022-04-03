<script>
  import Main from "./pages/Main.svelte";
  import LogIn from "./pages/LogIn.svelte";
  import Home from "./pages/Home.svelte";
  import router from "page";
  import SignUp from "./pages/SignUp.svelte";
  import Ranking from "./pages/Ranking.svelte";
  import EndedSession from "./pages/EndedSession.svelte";
  import Rules from "./pages/Rules.svelte"

  import Notifications from "svelte-notifications";
  import Auth from "./pages/Auth.svelte";
  import qs from "qs";

  let page;
  let params;

  router("*", parse);
  router("/game", (ctx) => (page = Main));
  router("/rules",(ctx) => (page = Rules));
  router("/login", (ctx) => (page = LogIn));
  router("/register", (ctx) => (page = SignUp));
  router("/game?spectate", (ctx) => (page = Main));
  router("/leaderboards", (ctx) => (page = Ranking));
  router("/ended_session", (ctx) => (page = EndedSession));
  router(
    "/auth",
    (ctx, next) => {
      params = ctx.query;
      next();
    },
    (ctx) => (page = Auth)
  );

  router("/", (ctx) => (page = Home));

  router.start();

  function parse(ctx, next) {
    ctx.query = qs.parse(location.search.slice(1));
    next();
  }
</script>

<Notifications>
  <svelte:component this={page} {params} />
</Notifications>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
