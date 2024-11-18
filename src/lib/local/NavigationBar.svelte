<script lang="ts">

    import SearchBar from './SearchBar.svelte';


 
   

  

</script>

<nav class="stack navigation-bar full-width regular-material" style="--direction: row; --align: center; --justify: space-between; ">
    <SearchBar />
    {@render StatusButton()}
</nav>

{#snippet StatusButton()}
    <p class="status-text">Alpha v0.0.5</p>
{/snippet}





<style>

    .status-text {
        color: var(--green);
        background-color: rgba(var(--green-rgb), 0.2);
        border-radius: 9999px;
        padding: var(--small-padding);
        border: 1px solid var(--green);
        margin-right: 0.5em;
        font-weight: bold;
    }

    @media (max-width: 600px) {
        .status-text {
            margin-right: 0;
        }
    }
   

    .navigation-bar {
        position: sticky;
        top: 0;
        padding: var(--default-padding);
        border-bottom: 1px solid var(--gray-2);


        z-index: 100;
    }

    @media (max-width: 600px) { /* Adjust the max-width as needed for your mobile breakpoint */
        .navigation-bar {
            margin-right: 0.5em; /* Add desired padding-right */
        }
    }

</style>
    