<script>
    /**
     * Component to implement scroll bar on a div element
     */
    export let styles;
    export let container;
</script>

<div
    class="overflow-y-auto flex flex-col flex-1 {styles}"
    bind:this={container}
>
    <slot />
</div>

