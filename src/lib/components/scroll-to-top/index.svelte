<script lang="ts">
    import { onMount, afterUpdate, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
  
    let scrollContainer: HTMLElement | null = null;
    let showScrollToTop = false;

  
    const scrollToTop = () => {
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }
    };
  
    function handleScroll() {
      if (scrollContainer) {
        showScrollToTop = scrollContainer.scrollTop > 200;
      }
    }
  
    function attachScrollListener() {
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll);
      }
    }
  
    function detachScrollListener() {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    }
  
    onMount(() => {
      scrollContainer = document.querySelector('.scrollable');
      attachScrollListener();
    });
  
    afterUpdate(() => {
      detachScrollListener();
      scrollContainer = document.querySelector('.scrollable');
      attachScrollListener();
    });
  
    onDestroy(() => {
      detachScrollListener();
    });
  </script>
  
  {#if showScrollToTop}
    <button class="stack scroll-to-top regular-material" on:click={scrollToTop} transition:fade={{ duration: 100 }}>
      <slot>Scroll to top</slot>
    </button>
  {/if}
  
  <style>
    .scroll-to-top {
      position: fixed;
      bottom: 3em;
      right: 3em;
      padding: 0.75em;
      color: black;
      cursor: pointer;
      border-radius: 0.5em;
      z-index: 1000;
    }
  </style>
  