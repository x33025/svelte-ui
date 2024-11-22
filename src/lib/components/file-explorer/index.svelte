<script lang="ts">
    import FileExplorer from "./index.svelte";
    // Define a type for the structure items
    type StructureItem = {
        type: 'folder' | 'file';
        name: string;
        contents?: StructureItem[]; // Only folders will have contents
    };

    // Use $props to receive props
    let { structure, autoOpenAll = false } = $props();

    // Ensure structure is typed
    let openFolders = $state(new Set<string>());

    // Initialize openFolders based on autoOpenAll
    if (autoOpenAll) {
        structure.forEach((item: StructureItem) => {
            if (item.type === 'folder') {
                openFolders.add(item.name);
            }
        });
    }

    let sortedStructure = $state<StructureItem[]>([]);

    // Derived state to sort the structure with folders on top
    $effect(() => {
        sortedStructure = structure.sort((a: StructureItem, b: StructureItem) => {
            if (a.type === 'folder' && b.type === 'file') return -1;
            if (a.type === 'file' && b.type === 'folder') return 1;
            return 0; // Preserve the order for the same type
        })
    });

    // Function to toggle folder visibility
    function toggle(folder: StructureItem) {
        if (openFolders.has(folder.name)) {
            openFolders.delete(folder.name);
        } else {
            openFolders.add(folder.name);
        }
        // Trigger reactivity manually
        openFolders = new Set(openFolders);
    }
</script>

<div class="stack file-explorer" style="--direction: column; --gap: 0.5em">
    {#each sortedStructure as item}
        {#if item.type === 'folder'}
            <button class="folder" onclick={() => toggle(item)}>
                {openFolders.has(item.name) ? '📂' : '📁'} {item.name}
            </button>

            {#if openFolders.has(item.name)}
                <div class="contents">
                    <FileExplorer structure={item.contents} autoOpenAll={autoOpenAll} />
                </div>
            {/if}
        {:else if item.type === 'file'}
            <div class="file">📄 {item.name}</div>
        {/if}
    {/each}
</div>

<style>
    .file-explorer {
        
    }
    
    .folder {
        font-weight: bold;

    }

    .file {
   
      
    }

    .contents {
        padding-left: 1.5em;
    }
</style>