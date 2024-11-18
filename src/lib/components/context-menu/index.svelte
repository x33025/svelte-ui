<script lang="ts">
    import { contextMenuStore, closeContextMenu } from './store.js';
    import { onMount } from 'svelte';
  
    let menu: HTMLDivElement | null = null;
  
  
    // Handle clicks outside the menu to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (menu && !menu.contains(event.target as Node)) {
        closeContextMenu();
      }
    };
  
    onMount(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    });
  </script>
  
  {#if $contextMenuStore && $contextMenuStore.show}
    <div bind:this={menu} class="stack context-menu" style="top: {$contextMenuStore.y}px; left: {$contextMenuStore.x}px; --align: left;">
        {#each $contextMenuStore.options as option (option.label)}
          <button class="context-menu-item" on:click={() => { option.action(); closeContextMenu(); }}>{option.label}</button>
        {/each}
    </div>
  {/if}
  
  <style>
    .context-menu {
      position: absolute;
      background-color: white;
      border: 1px solid #ccc;
      z-index: 1000;
      border-radius: 0.5em;
      padding: 0.3em;
    }
  
  .context-menu-item {


    padding: 0.5em;
    border-radius: 0.25em;

  }

  .context-menu-item:hover {
    background-color: var(--gray-1);
  }
  </style>
  