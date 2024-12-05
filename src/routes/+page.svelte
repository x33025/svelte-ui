<svelte:head>
  <title>Svelte UI</title>
  <meta name="description" content="Explore Svelte UI library with a growing collection of clean, minimal, and versatile UI components for fast, modern web apps." />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<script lang="ts">
    import { animate, stagger } from 'motion';
    import { fade } from 'svelte/transition';
    import Copy from '$lib/icons/os/copy.svelte';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { Stack } from '$lib/index.js';

    

    import { heroItems, type HeroItem } from '$site/stores/routes.js';

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
        animate([
            [ 
                '.feature', 
                {  opacity: [0, 1], scale: [0.7, 1] }, 
                { duration: 0.4 }
            ],
            [ 
                'button:not(.feature .install-code-block )', 
                { opacity: [0, 1] }, 
                { duration: 0.4, delay: stagger(0.1), at: 0.2 }
            ]
        ]);
    });    
</script>

<Stack expand center style="padding: 1em;">
    {@render Feature(heroItems.find(item => item.title === 'Svelte UI')!)}

    {#each heroItems.filter(item => item.title !== 'Svelte UI') as item, index}
        {@render HeroCard(item, index)}
    {/each}
 
</Stack>

{#snippet Feature(item: HeroItem)}
    <Stack center class={item.gridArea}>
        <h1 class="feature-text">{item.title}</h1>
        <div class="spacer"></div>
        <p style="font-size: 1.1em; overflow: wrap; white-space: normal;">{@html item.description}</p>
        <div class="spacer"></div>
        {@render InstallCode()}
    </Stack>
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

{#snippet HeroCard(item: HeroItem, index: number)}     
    <button 
        class="stack 0-0 expand hero-card" 
        style={`background: linear-gradient(to top left, rgba(var(${item.color}-rgb), 0.4), rgba(var(${item.color}-rgb), 0.85)); align-self: ${index % 2 === 0 ? 'flex-start' : 'flex-end'}; transform: rotate(${index % 2 === 0 ? '-3deg' : '3deg'});`}
        onclick={() => item.path && goto(item.path)}
    >
        <h2 style={`color: white; ${item.title === "Playground" ? "font: 'Kode Mono', monospace; color: black;" : ""}`}>
            {item.title}
        </h2>

        <p style="color: white; font-weight: bold;">
            {item.description}
        </p>
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
        white-space: normal; /* Allow text to wrap */
    }

    .feature-text {
        font-size: 2.6em;
        background-image: linear-gradient(to bottom right, var(--svelte-orange), var(--yellow));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }


:global(.feature) {
    background: var(--gray-1);
    padding: 1.5em;
    margin: 5em 0;
    border-radius: 1.3em;
    text-align: center;
    will-change: opacity, transform;
    opacity: 0;
    max-width: 60%;
}



    @media (max-width: 600px) {
        :global(.feature) {
            max-width: 100%;
        }
    }

.install-code-block {
        display: flex;
        align-items: center;
        gap: 0.5em;
        
    }

    .hero-card {
        width: 500px; 
        aspect-ratio: 5/3;
        margin: 1.5em;
    }


   .copied-message {
        color: var(--green);
        font-weight: bold;
  
    }
</style>