<script>
  export let styles = "";
  export let input = "";
</script>

<input
  class="flex-1 object-scale-down border-2 rounded-xl outline-none h-10 px-2 py-2 border-green-600 {styles}"
  type="text"
  placeholder="Send chat message or guess a word"
  bind:value={input}
/>
