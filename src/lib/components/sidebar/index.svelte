<script lang="ts">
    import { sidebarVisible, sidebarContent } from './store.js';
    import { fly, fade } from 'svelte/transition';
    import type { Component } from 'svelte';


</script>

{#if $sidebarVisible && $sidebarContent}
    <button 
        class="sidebar-backdrop" 
        on:click={() => sidebarVisible.set(false)} 
        on:keydown={(e) => e.key === 'Enter' && sidebarVisible.set(false)}
        aria-label="Close sidebar"
        transition:fade={{ duration: 200 }}
    >
    </button>
    <div 
        class="sidebar {$sidebarContent.orientation}" 
        transition:fly={{ x: $sidebarContent.orientation === 'right' ? 300 : -300, duration: 300 }}
    >
        <svelte:component this={$sidebarContent.component} as Component />
    </div>
{/if}

<style>
    .sidebar-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.5);
        border: none;
        cursor: pointer;
    }

    .sidebar {
        position: fixed;
        z-index: 1100;
        background-color: white;
        overflow-y: auto;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .sidebar.right {
        top: 0;
        right: 0;
        width: 25%;
        height: 100%;
    }

    .sidebar.left {
        top: 0;
        left: 0;
        width: 25%;
        height: 100%;
    }

    .sidebar.top {
        top: 0;
        left: 0;
        width: 100%;
        height: 25%;
    }

    .sidebar.bottom {
        bottom: 0;
        left: 0;
        width: 100%;
        height: 25%;
    }
</style>