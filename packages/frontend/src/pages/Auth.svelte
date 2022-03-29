<script>
  import { onMount } from "svelte";
  import router from "page";
  import { token } from "../stores/token";
  import jwtDecode from "jwt-decode";
  import { user } from "../stores/user";

  export let params;

  onMount(() => {
    $token = params.token;
    $user = jwtDecode(params.token);
    router.redirect("/game");
  });
</script>
