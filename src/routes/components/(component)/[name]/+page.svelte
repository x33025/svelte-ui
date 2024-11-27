<script lang="ts"   >
    import { page } from "$app/stores";
    import Stack from "$lib/layout/stack.svelte";
    import FileExplorer from "$lib/components/file-explorer/index.svelte";
    
    $effect(() => {
        
    })


    function handleFileSelect(file: any) {
        console.log(file.fileContent);
    }
</script>

<Stack expand  gap={0.5} >

   <FileExplorer structure={$page.data.component.contents} onFileSelect={handleFileSelect} /> 
   
</Stack>

