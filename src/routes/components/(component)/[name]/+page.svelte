<script lang="ts">
    import { page } from "$app/stores";
    import Stack from "$lib/layout/stack.svelte";
    import ComponentFileExplorer from "$site/components/component-file-explorer/index.svelte";
    import CodeMirror from "$site/components/code-mirror/index.svelte";
    import { onMount } from 'svelte';
    import type { DirectoryContent } from "$site/components/component-file-explorer/types.ts";
  
    // Selected file state and open folders state
    let selectedFile: DirectoryContent | null = $state(null);
    let openFolders = $state(new Set<string>());
  
    // Initialize the selected file on mount or when page data changes
    $effect(() => {
      const indexFile = $page.data.component.contents.find(
        (item: any) => item.type === 'file' && item.name === 'index.svelte'
      );
      if (indexFile) {
        selectedFile = indexFile;
      }
    });
  
    function toggleFolder(folderName: string) {
      if ($state.snapshot(openFolders).has(folderName)) {
        openFolders.delete(folderName);
      } else {
        openFolders.add(folderName);
      }
      openFolders = new Set(openFolders); // Create a new Set to trigger reactivity
    }
  </script>
  
  <Stack expand gap={0.5} class="component-editor" style="padding: 1em; margin: 1em;">
    <Stack horizontal>
      <!-- File Explorer for selecting files -->
      <ComponentFileExplorer
        structure={$page.data.component.contents}
        bind:selectedFile={selectedFile}
        bind:openFolders={openFolders}
        onToggleFolder={toggleFolder}
      />
      <div class="divider"></div>
      <Stack >
        {#if selectedFile?.name.endsWith('.svelte')}
          <Stack horizontal>
            <p>{"fields"}</p>
            <p>{"style editor"}</p>
          </Stack>
        {/if}
        {#if selectedFile?.fileContent}
          <CodeMirror code={selectedFile.fileContent} />
        {/if}
      </Stack>
      <Stack >
        <p>{"preview"}</p>
        <p>{"docs"}</p>
      </Stack>
    </Stack>
  </Stack>
  
  <style>
    :global(.component-editor) {
      border: 1px solid var(--gray-2);
      border-radius: 0.5em;
    }
    .divider {
      border-left: 1px solid var(--gray-3);
      height: 100%;
      width: 0;
    }
  </style>
  