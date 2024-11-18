<script lang="ts">

import { logs } from "./store.js";
    import { writable } from "svelte/store";

    let isMinimized = $state(true);

    $effect(() => {
        logs.set([]);
    });

    function toggleMinimize() {
        if (isMinimized && $logs.length > 0) {
            isMinimized = false;
        } else {
            isMinimized = true;
        }
    }

    function clearLogs() {
        logs.set([]);
        isMinimized = true;
    }
</script>


<!-- Display log messages below -->
<div class="stack {isMinimized ? '' : 'expand'} log-container">

    <div class="stack " style="--direction: row; --align: center; ">
        {#if !isMinimized}
            <button style="padding-bottom: 0.16em;" onclick={toggleMinimize}>
                {"x"}
            </button>
            <div class="spacer"></div>
            <button class="callout" style="--background: var(--gray-1);" onclick={clearLogs}>Clear logs</button>
        {/if}
   

        <button onclick={toggleMinimize}>
            Logs { $logs.length }
        </button>
    
    </div>

    {#if !isMinimized}
    <div class="stack scrollable">
        
        {#each $logs as log}
        
            <p>{log}</p>
        {/each}
    </div>
    {/if}
</div>

<style>
    .log-container {
        position: fixed;
        bottom: 1em;
        right: 1em;
        max-width: calc(100% - 2em);
        max-height: calc(100% - 2em);
        overflow: auto;

        padding: var(--default-padding);
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 0.5em;
        z-index: 1000;
    }

    .log-container button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: var(--blue);
    }
</style>
