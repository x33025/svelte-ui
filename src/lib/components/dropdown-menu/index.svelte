<script lang="ts">
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import { openDropdownId, openDropdown, closeDropdown } from './store.js';
  import { v4 as uuidv4 } from 'uuid';
  import { fade } from 'svelte/transition';

  interface Props {
    button: Snippet;
    content: Snippet;
    alignment?: 'left' | 'right' | 'center';
  }

  let { button, content, alignment = 'right' }: Props = $props();
  
  let isOpen = $state(false);
  let id: string = uuidv4();

  let unsubscribe = openDropdownId.subscribe(value => {
    isOpen = value === id;
  });

  function toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown(id);
      // No need to call positionMenu if not dynamically positioning
    }
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Element | null;
    if (target && !target.closest(`.menu-button-${id}`) && !target.closest(`.menu-content`)) {
      closeDropdown();
    }
  }

  $effect(() => {
    if (typeof document !== 'undefined') {
      if (isOpen) {
        document.addEventListener('click', handleClickOutside, true);
      } else {
        document.removeEventListener('click', handleClickOutside, true);
      }
    }
  });

  onMount(() => {
    if (typeof document !== 'undefined') {
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
        unsubscribe();
      };
    }
    return unsubscribe;
  });
</script>

<div class="dropdown-menu"> 
  <button class={`menu-button-${id}`} onclick={toggleMenu}>
      {@render button()}
</button>

{#if isOpen}
    <div transition:fade={{ duration: 96 }} class="stack scrollable menu-content shadow-default glass" style="--align: flex-start; --justify: flex-start; --gap: 0.25em; text-align: {alignment};">
        {@render content()}
    </div>
{/if}
</div>

<style>
  .dropdown-menu {
    position: relative;
  }


  .menu-content {
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 0.75em;

    position: absolute; /* Position absolutely within the container */
    z-index: 9999;
    display: flex;
    flex-direction: column;
    padding: 0.25em;
    margin-top: 0.35em;
    max-height: 25em;
    top: 100%; /* Position directly below the button */
    right: auto;
    transform: translateY(10px); /* Adjust for any additional spacing */
    transform: translateX(-1em); /* Adjust for any additional spacing */
  }

  .menu-content[style*="text-align: right;"] {
    left: auto;
    right: 0;
  }

  .menu-content[style*="text-align: center;"] {
    left: 50%;
    transform: translateX(-50%) translateY(0.1em);
  }
</style>
