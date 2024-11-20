<script lang="ts"   >
    import { page } from "$app/stores";


    $effect(() => {
        console.log($page.data.componentFiles);
    })
</script>

<stack expand>
    {#each $page.data.componentFiles as file}
        <p>{file.name}</p>
    {/each}
</stack>

