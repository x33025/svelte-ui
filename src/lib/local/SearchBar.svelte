<script lang="ts">
    import { slide } from 'svelte/transition';
    import { routes, type Route } from '$lib/local/stores/routes.js';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import DropdownMenu from '$lib/components/dropdown-menu/index.svelte';
    import { closeDropdown } from '$lib/components/dropdown-menu/store.js';
    import MorphText from '$lib/components/morph-text/index.svelte';



    function handleRouteClick(route: Route) {
        goto(route.path);
        closeDropdown();

    }

    let buttonText = $derived($page.url.pathname.split('/')[1] || 'home');

    let componentText = $state('');
    let componentId = $state('');

    $effect(() => {

        componentText = $page.data.components.find((component: any) => component.id === $page.url.pathname.split('/')[2])?.name;
        componentId = $page.data.components.find((component: any) => component.id === $page.url.pathname.split('/')[2])?.id;
    })
    

</script>

<div class="stack subheadline search-container no-gap" style="--direction: row; --align: center; margin: 0.5em;">
    <span class="static-slash">/</span>
    <DropdownMenu alignment="left">
        {#snippet button()}
            <p class="button">{buttonText}</p>
        {/snippet}

        {#snippet content()}
            {#each routes as route}
                <button class="callout bold dropdown-item {$page.url.pathname === route.path ? 'selected' : ''}" onclick={() => handleRouteClick(route)}>{route.title.toLowerCase()}</button>
            {/each}
    {/snippet}

    </DropdownMenu>

    {#if $page.url.pathname.includes('/components/')}
        {@render ComponentDropdown()}
    {/if}


</div>

{#snippet ComponentDropdown()}
<span class="static-slash">/</span>
    <DropdownMenu alignment="left">
        {#snippet button()}
            <MorphText texts={[componentId, componentText]}  />
        {/snippet}

    {#snippet content()}
        {@render DropdownSearch()}
        {#each $page.data.components as component}
            <button class="callout bold dropdown-item" onclick={() => {goto(`/components/${component.id}`); closeDropdown()}}>{component.name}</button>
        {/each}
    {/snippet}
</DropdownMenu>

{/snippet}

{#snippet DropdownSearch()}
    <input class="component-search" type="text" placeholder="Search Components" />
{/snippet}


{#snippet SearchHint()}
    <p class="search-hint" style="margin-left: 1em;">{"press / to search"}</p>
{/snippet}



<style>

    .component-search {
        padding: 0.5em;
        font-size: 0.9em;
        background-color: var(--gray-1);
        border-radius: 0.5em;
        
     
    }

    .search-hint {
        font-size: 0.6em;
        font-weight: 400;
        color: var(--gray-6);
    }

    .button {
        color: black;
        font-size: 0.9em;
        font-weight: bold;
        z-index: 105;
    }

    .search-container {
        position: relative;
        font-family: 'Kode Mono';
        margin-right: 1em;
    }

    .static-slash {
        font-family: inherit;
        margin: 0 0.3em;
    }

 


    .selected {
        color: var(--indigo);
    }

</style>
