<script lang="ts">

  let layouts = [
    {title: "Basic Stack", description: "A basic stack with a gap of 1em.", newClass: "stack"},
     {title: "Z-Stack", description: "A stack that creates a z-index effect with overlapping items.", newClass: "z-stack"},
    {title: "Scrollable Component", description: "A scrollable component that can be used to display a list of items.", newClass: "scrollable"}
    
  ]

</script>

<div class="grid " style="--gap: 1em; padding: 1.5em;">
  {#each layouts as layout}
      {@render Layout(layout.title, layout.description, layout.newClass)}
  {/each}
</div>

{#snippet Layout(title: string, description: string, newClass: string)}
<div class="stack layout-item" style="--align: center;">
  <h2>{title}</h2>
  <p>{description}</p>
  <div class="spacer"></div>
  <div class="stack {newClass}" style=" --align: center; --justify: center; {newClass === 'scrollable' ? 'height: 500px;' : 'height: 42%;'}">
     
          {#if newClass === "scrollable"}
            {@render Scrollable()}
          {:else}
            {@render Box()}
            {@render Box()}
            {@render Box()}
          {/if}
  </div>
  <div class="spacer"></div>
  </div>
{/snippet}

{#snippet Box()}
    <div class="stack box-item " style="--align: center; --justify: center; ">Box</div>
{/snippet}

{#snippet Scrollable()}

        {#each Array(10) as _}
        <div class="stack" style="gap: 1em;">
            {@render Box()}
          </div>
        {/each}

{/snippet}





  <style>

.layout-item {
border: 1px solid var(--gray-3);
border-radius: 0.5em;
padding: 1em;
  }

    .box-item {
      min-width: 150px;
      min-height: 150px;
       border: 1px solid var(--gray-2);
       background-color: var(--gray-1);
      color: var(--gray-6);
      border-radius: 0.71em;
    }

    .z-stack > :nth-child(1) {
      background-color: var(--gray-3);
      width: 94px;
      height: 94px;
    }

    .z-stack > :nth-child(2) {
      transform: translate(10px, -10px);
  
      background-color: var(--gray-2);
      width: 98px;
      height: 98px;
    }
    
    .z-stack > :nth-child(3) {
      transform: translate(20px, -20px);
 
      background-color: var(--gray-1);
      width: 100px;
      height: 100px;
    }

  </style>
