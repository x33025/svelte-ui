<script lang="ts">
    import { onMount } from 'svelte';
    import Prism from 'prismjs';

    import 'prism-svelte'; // Import Svelte syntax support
    export let code: string;
    export let language: string = 'javascript'; // Default language
  
    let codeElement: HTMLElement;
  
    onMount(() => {
      if (codeElement) {
        Prism.highlightElement(codeElement);
      }
    });
  </script>
  
  <pre class="stack full-width language-{language}" style="align-items: flex-start; justify-content: flex-start; ">
    <code  bind:this={codeElement} class="language-{language}">
      {code}
    </code>
  </pre>
  
  <style>
    pre {
      padding: 1em;
      background-color: var(--gray-1);
      border-radius: 0.5em;
      overflow-x: auto;
      overflow-y: auto; /* Add this line to enable vertical scrolling */
    }
  
    code {
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
    }
  </style>
  
