<script lang="ts">
    import { onMount } from 'svelte';
  
    let currentEarth = '🌎';
    const earthEmojis = ['🌎', '🌍', '🌏'];
    let index = 0;
  
    onMount(() => {
      const interval = setInterval(() => {
        index = (index + 1) % earthEmojis.length;
        currentEarth = earthEmojis[index];
      }, 500);
  
      return () => clearInterval(interval);
    });
  </script>
  
  <div class="earth-container" aria-label="Cycling Earth Emojis">
    {currentEarth}
  </div>
  
  <style>
    .earth-container {
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(7%) translateX(1%);
    
      font-size: 2.1em;
      width: 1em;
      height: 1em;
        text-align: center;

    }
  </style>