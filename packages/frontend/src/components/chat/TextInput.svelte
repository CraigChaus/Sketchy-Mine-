<script>
  /**
   * TextInput component
   * Represents a basic text-box where users can enter text
   */
  export let styles = "";
  export let input = "";
  export let disabled = false;
  export let placeholder = "Send chat message or guess a word";
</script>

<input
  {disabled}
  class="flex-1 object-scale-down border-2 rounded-lg outline-none h-10 px-2 py-2 border-green-600 {disabled
    ? 'bg-gray-300 cursor-not-allowed'
    : ''} {styles}"
  type="text"
  placeholder={disabled ? "" : placeholder}
  bind:value={input}
/>
