<script lang="ts">
    export let promise: Promise<any> | null = null;
    export let loadingText: string = 'Loading...'; // Default loading message
    export let errorText: string = 'Failed to load data'; // Default error message
  </script>
  
  {#await promise}
    <div class="loading">{loadingText}</div>
  {:then result}
    <slot name="success" {result} />
  {:catch error}
    <div class="error">{errorText}: {error.message}</div>
  {/await}
  
  <style>
    .loading {
      padding: 0.5em;
      text-align: center;
    }
  
    .error {
      padding: 0.5em;
      background-color: var(--red);
      border-radius: 0.25em;
      text-align: center;
      color: white;
    }
  </style>
  