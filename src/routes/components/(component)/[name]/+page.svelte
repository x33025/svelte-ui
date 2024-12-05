<script lang="ts">
    import { page } from "$app/stores";
    import Stack from "$lib/layout/stack.svelte";
    import FileExplorer from "$lib/components/file-explorer/index.svelte";
    import { onMount } from 'svelte';

    import Prism from 'prismjs';
    // import 'prism-svelte'; // Svelte syntax highlighting support
  
    let selectedFile: any = $state(null); // Selected file
    let codeElement: HTMLElement | null = $state(null); // Reference for the code block
    let language: string = $state('svelte'); // Default language for highlighting
  
    // Update highlighting when the selected file changes
    $effect(() => {
      if (selectedFile?.fileContent && codeElement) {
        Prism.highlightElement(codeElement);
      }
    });
  
    function handleFileSelect(file: any) {
      selectedFile = file;
      language = 'svelte'; // Adjust the language dynamically if needed
    }
  </script>


<Stack expand gap={0.5}>
    <Stack horizontal>
      <!-- File Explorer for selecting files -->
      <FileExplorer 
        structure={$page.data.component.contents} 
        onFileSelect={handleFileSelect} 
      />
  
      <!-- Display selected file content -->
      <div>
        <p>Selected File: {selectedFile?.name}</p>
  
        {#if selectedFile?.fileContent}
          <pre 
            class="stack full-width language-{language}" 
            style="align-items: flex-start; justify-content: flex-start;">
            <code 
              bind:this={codeElement} 
              class="language-{language}">
              {selectedFile.fileContent}
            </code>
          </pre>
        {/if}
      </div>
    </Stack>
  </Stack>
  