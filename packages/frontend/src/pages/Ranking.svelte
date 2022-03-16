<script>
    // import Table from ‘./Table.svelte’;
    import tokenStore from '../stores/token';

    //here we need to make get request from the database
    async function getAllUsers() {
        const res = await fetch('http://localhost:3000/users', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${$tokenStore.token}`
            }});

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
    <body class="bg-gray-100 font-family-karla flex body-bg min-h-screen ">
    <div class="w-6/12 mt-12 m-16" >
        <h3 class="text-center font-bold p-2 text-2xl">Ranking</h3>
        <div class="bg-white overflow-auto">


            <table class="text-left w-full border-collapse">
                <thead>
                <tr>
                    <th className=" w-0.5 py-4 px-2  bg-green-400  font-bold uppercase text-sm text-grey-dark border-b border-grey-light"> </th>
                    <th class=" w-0.5 py-4 px-4  bg-green-400  font-bold uppercase text-sm text-grey-dark border-b border-grey-light">username</th>
                    <th class=" w-0.5 py-4 px-4  bg-green-400  font-bold uppercase text-sm text-grey-dark border-b border-grey-light"># emeralds</th>
                </tr>


                </thead>
                <tbody>

                {#each data as row,i}

                    <tr class="hover:bg-grey-lighter">

                        <td class=" w-0.5 py-4 px-2 border-b border-grey-light">{i+1}</td> <!--place number-->
                        <td class=" w-0.5 py-4 px-4 border-b border-grey-light">{row.username}</td>
                        <td class=" w-0.5 py-4 px-4 border-b border-grey-light">{row.total_emeralds}</td>

                    </tr>
                {/each}

                </tbody>
            </table>
        </div>
    </div>
    </body>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}

