<script lang="ts">
    import FileExplorer from "./index.svelte";
    type StructureItem = {
        type: 'folder' | 'file';
        name: string;
        contents?: StructureItem[];
    };

    // Use $props to receive props and a callback
    let { structure, autoOpenAll = false, onFileSelect = () => {} } = $props();

    let openFolders = $state(new Set<string>());

    if (autoOpenAll) {
        structure.forEach((item: StructureItem) => {
            if (item.type === 'folder') {
                openFolders.add(item.name);
            }
        });
    }

    let sortedStructure = $state<StructureItem[]>([]);

    $effect(() => {
        sortedStructure = structure.sort((a: StructureItem, b: StructureItem) => {
            if (a.type === 'folder' && b.type === 'file') return -1;
            if (a.type === 'file' && b.type === 'folder') return 1;
            return 0;
        });
    });

    function openFolder(folder: StructureItem) {
        if (openFolders.has(folder.name)) {
            openFolders.delete(folder.name);
        } else {
            openFolders.add(folder.name);
        }
        openFolders = new Set(openFolders);
    }

    // Function to handle file selection
    function selectFile(file: StructureItem) {
        onFileSelect(file);
    }
</script>

<div class="stack file-explorer" style="--direction: column; --gap: 0.5em">
    {#each sortedStructure as item}
        {#if item.type === 'folder'}
            <button class="folder" onclick={() => openFolder(item)}>
                {openFolders.has(item.name) ? '📂' : '📁'} {item.name}
            </button>

            {#if openFolders.has(item.name)}
                <div class="contents">
                    <FileExplorer structure={item.contents} autoOpenAll={autoOpenAll} onFileSelect={onFileSelect} />
                </div>
            {/if}
        {:else if item.type === 'file'}
            <button class="file" onclick={() => selectFile(item)}>📄 {item.name}</button>
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
        cursor: pointer;
    }

    .contents {
        padding-left: 1.5em;
    }
</style>