<script>
  import router from "page";
  import Notifications from "svelte-notifications";
  import qs from "qs";
  import Main from "./pages/Main.svelte";
  import LogIn from "./pages/LogIn.svelte";
  import Home from "./pages/Home.svelte";
  import SignUp from "./pages/SignUp.svelte";
  import Ranking from "./pages/Ranking.svelte";
  import EndedSession from "./pages/EndedSession.svelte";
  import Rules from "./pages/Rules.svelte";

  import Auth from "./pages/Auth.svelte";

  // Delete the stored user and token if they're invalid
  const token = window.localStorage.getItem("token");
  const user = window.localStorage.getItem("user");

  if (!token || token === "undefined") {
    window.localStorage.removeItem("token");
  }

  if (!user || user === "undefined") {
    window.localStorage.removeItem("user");
  }

  let page;
  let params;

  router("*", parse);
  router("/game", (ctx) => (page = Main));
  router("/rules", (ctx) => (page = Rules));
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
