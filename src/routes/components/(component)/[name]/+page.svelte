<script lang="ts"   >
    import { page } from "$app/stores";
    import Stack from "$lib/layout/stack.svelte";

    $effect(() => {
        console.log($page.data.componentFiles);
    })
</script>

<Stack expand>
    {#each $page.data.componentFiles as file}
        <p>{file.name}</p>
    {/each}
</Stack>

