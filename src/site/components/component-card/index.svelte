<script lang="ts">
    import { onMount } from 'svelte';
    import { animate, stagger } from 'motion';
    import { goto } from '$app/navigation';
    import Stack from '$lib/layout/stack.svelte';


     let { component } = $props<{component: any}>();


    // Function to convert train case to title case (capitalize every word)
    function trainToTitleCase(trainCase: string | undefined): string {
        if (!trainCase) return ''; // Return an empty string if trainCase is undefined
        return trainCase
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    onMount(() => {
        animate('.component-card', { scale: [0.8, 1], opacity: [0, 1] }, { duration: 0.4, delay: stagger(0.1) });
    });
</script>

<div  class="component-card" style="--align: flex-start; --justify: flex-start;">
    
    <Stack horizontal>
   
        <h2>{trainToTitleCase(component.name)}</h2>
        <div class="spacer"></div>
        <button onclick={() => goto(`/components/${component.name}`)} class="base-item">View</button>
    </Stack>

    <p>{component.description}</p>

</div>

<style>
    .component-card {
        background-color: white;
        border: 1px solid var(--gray-2);
        padding: 1em;
        border-radius: 0.7em;
        min-height: 20em;
    }

    h2 {
        white-space: nowrap;
    }
</style>