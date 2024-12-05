<script lang="ts">
    import type { DirectoryContent } from "./types.ts";
    import ComponentFileExplorer from "./index.svelte";
  
    let { structure, autoOpenAll = false, selectedFile = $bindable(), openFolders = $bindable(), onToggleFolder } = $props<{
        structure: DirectoryContent[];
        autoOpenAll?: boolean;
        selectedFile: DirectoryContent | null;
        openFolders: Set<string>;
        onToggleFolder: (folderName: string) => void;
    }>();
  
    // Sort the structure to display folders first
    let sortedStructure = $state<DirectoryContent[]>([]);

    $effect(() => {
      sortedStructure = structure.sort((a: DirectoryContent, b: DirectoryContent) => {
        if (a.type === 'folder' && b.type === 'file') return -1;
        if (a.type === 'file' && b.type === 'folder') return 1;
        return 0;
      });
    });
  

  </script>
  
  <div class="stack file-explorer" style="--direction: column; --gap: 0.5em">
    {#each sortedStructure as item}
      {#if item.type === 'folder'}
        <button class="folder" onclick={() => openFolders.add(item.name)}>
          {openFolders.has(item.name) ? '📂' : '📁'} {item.name}
        </button>
        {#if openFolders.has(item.name)}
          <div class="contents">
            <!-- <ComponentFileExplorer
              structure={item.contents}
              autoOpenAll={autoOpenAll}
              bind:selectedFile={selectedFile}
              bind:openFolders={openFolders}
              onToggleFolder={onToggleFolder}
            /> -->
          </div>
        {/if}
      {:else if item.type === 'file'}
        <button
          class="file"
          onclick={() => selectedFile = item}
          class:selected={selectedFile === item}
        >
          📄 {item.name}
        </button>
      {/if}
    {/each}
  </div>
  
  <style>
    .file-explorer {}
    .folder {
      font-weight: bold;
      padding: var(--small-padding);
      border-radius: 0.35em;
      transition: background-color 0.1s ease-in-out;
    }
    .folder:hover {
      background-color: var(--gray-1);
    }
    .file {
      cursor: pointer;
      padding: var(--small-padding);
      border-radius: 0.35em;
      transition: background-color 0.1s ease-in-out;
    }
    .file:hover {
      background-color: var(--gray-1);
    }
    .file.selected {
      background-color: var(--gray-2);
    }
    .contents {
      padding-left: 1.5em;
    }
  </style>
  