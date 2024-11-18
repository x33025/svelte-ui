<svelte:head>
  <title>Svelte UI</title>
  <meta name="description" content="Explore Svelte UI library with a growing collection of clean, minimal, and versatile UI components for fast, modern web apps." />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<script lang="ts">
    import { stagger, timeline } from 'motion';
    import { fade } from 'svelte/transition';
    import Copy from '$lib/icons/os/copy.svelte';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    import { bentoItems, type BentoItem } from '$lib/local/stores/routes.js';

    let copied = $state(false);

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text).then(() => {
            copied = true;
            setTimeout(() => copied = false, 2000); // Reset after 2 seconds
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    onMount(() => {
        timeline([
            [ 
                '.feature', 
                {  opacity: [0, 1], scale: [0.7, 1] }, 
                { duration: 0.4 }
            ],
            [ 
                '.bento button:not(.feature .install-code-block )', 
                { opacity: [0, 1] }, 
                { duration: 0.4, delay: stagger(0.1), at: 0.2 }
            ]
        ]);
    });    
</script>

<div class="bento" style="padding: 1em;">
    {#each bentoItems as item}
        {#if item.title === 'Svelte UI'}
           
                {@render Feature(item)}
          
        {:else}
              {@render BentoItem(item)}
     
        {/if}
    {/each}
</div>

{#snippet Feature(item: BentoItem)}
    <div class="stack {item.gridArea}" style={` background: var(--gray-1); --justify: center; --align: center;  padding: 1.5em; border-radius: 1.3em; text-align: center;`}>
        <h1 class="feature-text">{item.title}</h1>
        <div class="spacer"></div>
        <p style="font-size: 1.1em;">{@html item.description}</p>
        <div class="spacer"></div>
        {@render InstallCode()}
    </div>
{/snippet}


{#snippet InstallCode()}
    <button class="install-code-block callout bold" style="position: relative; display: flex; align-items: center; gap: 0.5em; justify-content: center;" onclick={() => copyToClipboard('npm install @x33025/svelte-ui')}>
        <code style="background: var(--gray-2); padding: 0.5em; border-radius: 0.5em;">npm install @x33025/svelte-ui</code>
        <Copy size={16} />
        
        {#if copied}
            <span transition:fade={{ duration: 200 }} class="copied-message callout full-width" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--gray-1); padding: 0.5em; border-radius: 0.5em;">Copied!</span>
        {/if}
    </button>
{/snippet}

{#snippet BentoItem(item: BentoItem)}
    <button class="stack expand {item.gridArea} " style={`background: linear-gradient(to top left, rgba(var(${item.color}-rgb), 0.4), rgba(var(${item.color}-rgb), 0.85));`} onclick={() => item.path && goto(item.path)}>

        <h2 style={`color: white; ${item.title === "Playground" ? "font: 'Kode Mono', monospace; color: black;" : ""}`}>{item.title}</h2>
        <p style="color: white; font-weight: bold;">{item.description}</p>
    </button>
{/snippet}

<style>
    button.stack {
        will-change: opacity, transform;
        opacity: 0; /* Initially hide the components */
        padding: 1.3em;
        border-radius: 1.3em;
        transition: box-shadow 0.3s ease; /* Smooth transition for the glow effect */
        position: relative; /* Position relative for absolute children */
        text-overflow: ellipsis;
        overflow: wrap;
        white-space: normal; /* Allow text to wrap */
    }

    .feature-text {
        font-size: 2.6em;
        background-image: linear-gradient(to bottom right, var(--svelte-orange), var(--yellow));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .icon {
        position: absolute;
        top:    80px; /* Adjust positioning as needed */
        right: 21px; /* Adjust positioning as needed */

        rotate: 13deg;
        z-index: -1; /* Place behind the content */
    }

    .bento {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 1em;
    grid-template-areas:
        "components components workshop core"
        "layout feature feature core"
        "layout style style comingSoon";
}

.workshop {
    grid-area: workshop;
}

.components {
    grid-area: components;
}

.core {
    grid-area: core;
}

.layout {
    grid-area: layout;
}

.feature {
    grid-area: feature;
    will-change: opacity, transform;
    opacity: 0;
}

.style {
    grid-area: style;
}

.comingSoon {
    grid-area: comingSoon;
}

    @media (max-width: 600px) {
        .bento {
            grid-template-columns: 1fr; /* Single column for vertical stacking */
            grid-template-rows: auto; /* Adjust rows automatically */
            padding: 0em;
            grid-template-areas:
                "feature"
                "components"
                "core"
                "layout"
                "style"
                "workshop"
                "comingSoon";
        }
    }

    .install-code-block {
        display: flex;
        align-items: center;
        gap: 0.5em;
        
    }

    .copied-message {
        color: var(--green);
        font-weight: bold;
  
    }
</style>