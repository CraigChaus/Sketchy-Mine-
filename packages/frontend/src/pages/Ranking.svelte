<script>
  import { token as tokenStore } from "../stores/token";
  import { API_URL } from "../socket";

  //here we need to make get request from the database
  async function getAllUsers() {
    const res = await fetch(API_URL + "/users/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$tokenStore}`,
      },
    });

    if (res.ok) {
      return res.json();
    } else {
      throw new Error(await res.text());
    }
  }
</script>

{#await getAllUsers()}
  <p>...waiting</p>
{:then data}
  <body class="bg-gray-100 font-family-karla flex body-bg min-h-screen">
    <div class="w-6/12 mt-12 m-96">
      <h3 class="text-center font-bold p-2 text-2xl">Ranking</h3>
      <div class="bg-white overflow-auto">
        <table class="text-left w-full border-collapse">
          <thead>
            <tr>
              <th
                class="  py-4 px-2  bg-green-400  font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
              />
              <th
                class="  py-4 px-4  bg-green-400  font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
                >username</th
              >
              <th
                class=" py-4   bg-green-400  font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
              />
              <th
                class="  py-4 px-4  bg-green-400  font-bold uppercase text-sm text-grey-dark border-b border-grey-light"
                >Emeralds</th
              >
            </tr>
          </thead>
          <tbody>
            {#each data as row, i}
              <tr class=" hover:bg-grey-lighter">
                <td
                  class=" font-bold uppercase py-4 px-4 border-b border-grey-light"
                  >{i + 1}</td
                >
                <!--place number-->
                <td class="  py-4 px-4 border-b border-grey-light"
                  >{row.username}</td
                ><td class=" border-b border-grey-light"
                  ><img
                    class="flash"
                    src="./images/ProgressEmerald.png"
                    alt=""
                    height="40%"
                    width="40%"
                  /></td
                >
                <td class="  py-4 px-4 border-b border-grey-light"
                  >{row.total_emeralds}</td
                >
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </body>
{:catch error}
  <p style="color: red">{error.message}</p>
  <p>
    You probably didn't add any new users to database. Add it first and than you
    will see
  </p>
{/await}

<style>
  img {
    fill: lightseagreen;
    -webkit-animation: glowing-polygon 1300ms infinite;
    -moz-animation: glowing-polygon 1300ms infinite;
    -o-animation: glowing-polygon 1300ms infinite;
    animation: glowing-polygon 1300ms infinite;
  }
  @-webkit-keyframes glowing-polygon {
    0% {
      fill: #0091b2;
      -webkit-filter: drop-shadow(0 0 3px #21e4e3);
    }
    50% {
      fill: #21c7ed;
      -webkit-filter: drop-shadow(0 0 15px #14a4a3);
    }
    100% {
      fill: #0091b2;
      -webkit-filter: drop-shadow(0 0 3px #0c605f);
    }
  }
  @keyframes glowingPolygon {
    0% {
      fill: #0091b2;
      filter: drop-shadow(0 0 3px #21e4e3);
    }
    50% {
      fill: #21c7ed;
      filter: drop-shadow(0 0 15px #14a4a3);
    }
    100% {
      fill: #0091b2;
      filter: drop-shadow(0 0 3px #0c605f);
    }
  }
</style>
