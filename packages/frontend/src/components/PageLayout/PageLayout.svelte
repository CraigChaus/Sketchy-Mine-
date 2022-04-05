<script>
    import Header from "./Header.svelte";
</script>

<div class="bg-bgColors bg-cover text-gray-800 overflow-y-auto ">
    <Header />

    <div
        class="flex flex-col w-screen h-screen bg-no-repeat bg-cover overflow-x-auto items-center"
    >
        <!--         style="background-image: url('/background.jpg')">-->
        <slot />
    </div>
</div>
