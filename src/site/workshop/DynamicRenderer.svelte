<script lang="ts">
  import { onMount } from 'svelte';
  import { compile } from 'svelte/compiler';

  export let code = ''; // The Svelte source code to compile and render

  let container: HTMLElement; // Target container for the dynamic component
  let componentInstance: any;

  onMount(() => {
    try {
      if (code) {
        // Compile the source code with the existing options
        const { js, css, warnings } = compile(code, {
          generate: 'client',
          runes: true
        });

        console.log(js.code);
        console.log(css?.code);
        console.log(warnings);

        // Inject CSS into the document head
        if (css && css.code) {
          const style = document.createElement('style');
          style.textContent = css.code;
          document.head.appendChild(style);
        }


      }
    } catch (err) {
      console.error('Failed to compile or render Svelte source:', err);
    }

    return () => {
      // Cleanup the dynamically created component instance
      if (componentInstance) {
        componentInstance.$destroy();
      }
    };
  });
</script>

<!-- Target container for dynamic component rendering -->
<div bind:this={container}></div>
