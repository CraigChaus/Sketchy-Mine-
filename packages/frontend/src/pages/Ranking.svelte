<script>
    // import Table from ‘./Table.svelte’;

    //here we need to make get request from the database

    // let users=  async function getAllUsers() {
    //     const res = await fetch('http://localhost:8080//users');
    //
    //     if (res.ok) {
    //         return await res.json();
    //     } else {
    //         throw new Error(await res.text());
    //     }
    // }


    let users = [
        {    id: 1,
            username: 'Bob',
            total_emeralds: 12,
        },
        {
            id: 2,
            username: 'Jack',
            total_emeralds: 1,
        },
        {
            id: 3,
            username: 'Alice',
            total_emeralds: 18,
        },
        {id: 4,
            username: 'Bob1',
            total_emeralds: 120,
        },
        {
            id: 5,
            username: 'Jack1',
            total_emeralds: 111,
        },
        {
            id: 6,
            username: 'Alice1',
            total_emeralds: 19,
        },
        {
            id: 6,
            username: 'Alice1',
            total_emeralds: 19,
        },
        {
            id: 6,
            username: 'Alice1',
            total_emeralds: 19,
        },
        {
            id: 6,
            username: 'Alice1',
            total_emeralds: 19,
        },
    ];



//with this loop we will delete all data which we doesn't need to show in our table (it will be not only id):
    for (let i=0; i<users.length; i++) {
        delete users[i].id;
    }


//here is sorting of the objects in Json array in descending order by number of emeralds to show who is winner
    users.sort(function(a, b) {
        return b.total_emeralds - a.total_emeralds;
    });

</script>




<body class="bg-gray-100 font-family-karla flex body-bg min-h-screen ">
   <div class="w-6/12 mt-12 m-16" >
    <h3 class="text-center font-bold p-2 text-2xl">Ranking</h3>
     <div class="bg-white overflow-auto">


       <table class="text-left w-full border-collapse">
        <thead>
    <tr>
    <th className=" w-0.5 py-4 px-2  bg-green-400  font-bold uppercase text-sm text-grey-dark border-b border-grey-light"> </th>
    {#each Object.keys(users[0]) as columnHeading}
        <th class=" w-0.5 py-4 px-4  bg-green-400  font-bold uppercase text-sm text-grey-dark border-b border-grey-light">{columnHeading}</th>
    {/each}
    </tr>


    </thead>
    <tbody>

    {#each Object.values(users) as row,i}

        <tr class="hover:bg-grey-lighter">

                <td class=" w-0.5 py-4 px-2 border-b border-grey-light">{i+1}</td> <!--place number-->
            {#each Object.values(row) as cell}
                <td class=" w-0.5 py-4 px-4 border-b border-grey-light">{cell}</td>

            {/each}

        </tr>
    {/each}

    </tbody>



 </table>

 </div>
</div>
</body>

