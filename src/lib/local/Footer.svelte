<script lang="ts">
    import SpinningEarth from '$lib/components/circular-text/spinning-earth.svelte';
    import CircularText from '$lib/components/circular-text/index.svelte';
    import { goto } from '$app/navigation';

</script>

<div class="stack footer full-width" style="--direction: row; --align: flex-start; --justify: space-around;">

<div class="stack expand" style="--direction: column; --align: flex-start; --justify: flex-end;">
    <p class="callout bold" style="color:black;">{"Why?"}</p>
    <p class="callout bold" style="color: black;">{"What?"}</p>
    <p class="callout bold" style="color: black;">{"How?"}</p>

</div>

<div class="stack expand" style="--direction: column; --align: flex-end; --justify: center;">
    {@render CVButton()}
    <a class="callout" href="mailto:g.tchelidze@icloud.com">Contact</a>
    <a class="callout" href="/sitemap.xml">Sitemap</a>
    <p class="caption">{"© 2024"}</p>
</div>

</div>



{#snippet CVButton()}
<a href="https://read.cv/x33025" target="_blank" class="z-stack" style="align-items: center; justify-items: center;">
    <SpinningEarth />
    <CircularText />
</a>
{/snippet}




<style>

    .footer {
        background-color: var(--gray-1);
        height: 250px;
        padding: 3em 5em;
        margin-top: 5em;
        
    }

    @media (max-width: 768px) {
        .footer {
            padding: 2em;
        }
    }
</style>
