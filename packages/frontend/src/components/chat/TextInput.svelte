<script>
  export let styles = "";
  export let input = "";
  export let disabled = false;
</script>

<input
  {disabled}
  class="flex-1 object-scale-down border-2 rounded-xl outline-none h-10 px-2 py-2 border-green-600 {disabled ? "bg-gray-300 cursor-not-allowed" : ""} {styles}"
  type="text"
  placeholder="{disabled ? "" : "Send chat message or guess a word"}"
  bind:value={input}
/>
