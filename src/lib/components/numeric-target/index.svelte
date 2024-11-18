<script lang="ts">


let { target = 5, current = $bindable(0) } = $props();
    


  
  

  
    function handleInput(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const value = parseFloat(inputElement.value);
      current = value;
    }


</script>

<div class="stack" style="--direction: row; --gap: 0.5em;">
  <p>{current}</p>
  <p>/</p>
  <input 

    class="{target === current ? 'bold' : ''}"
    type="number" 
    value={target} 
    oninput={handleInput}
   
  />
</div>


