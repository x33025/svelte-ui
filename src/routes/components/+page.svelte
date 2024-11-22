<script lang="ts">
    import ComponentCard from '$site/components/component-card.svelte';
    import { page } from '$app/stores';
    import Stack from '$lib/layout/stack.svelte';


      </script>   
    


<Stack> 
  {@render SearchBar()}

    <div class="components-grid ">
      {#if $page.data.components}
      {#each $page.data.components as component}

         <ComponentCard {component} />
 

      {/each}
      {/if}
    </div>
</Stack>

{#snippet SearchBar()}
<Stack full-width center style="height: 375px;">
   
  <input class="search-input regular-material"  type="text" placeholder="Search Components" />

    </Stack>
{/snippet}

  


      <style>

        .search-input {
          font-size: 1.6em;
          border-bottom: 1px solid var(--gray-2);
          padding: 0.2em 0.5em;
          width: 30%;

        }

        @media (max-width: 600px) {
          .search-input {
            width: 100%;
            padding: 0.5em 1em;
          }
        }

  

    
   
      :global(.components-grid) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1em;
        padding: 1.5em;
      }

      @media (max-width: 600px) {
        :global(.components-grid) {
          display: flex;
          flex-direction: column;
        }
      }



 

      </style>
