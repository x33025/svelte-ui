<script lang="ts">
    export let words: string[] = []; // Array of words to be animated
    export let loaderColor: string = 'black'; // Default loader color
    export let loaderFont: number = 1; // Default loader font size
    export let loadingText: string = 'loading'; // Default loading text
    export let loaderTextColor: string = 'rgb(124, 124, 124)'; // Default loading text color
    export let loaderTextBackground: string = 'transparent'; // Default loading text background
</script>


<style>
    .loader {
        color: var(--loader-color);
        font-size: var(--loader-font)rem; /* Use rem for responsive font size */
        box-sizing: content-box;
    }

    .words {
        overflow: hidden;
        position: relative;
        height: 1.5em; /* Adjust based on font size */
    }

    .word {
        display: block;
        height: 100%;
        padding-left: 0.5rem; /* Use rem for padding */
        color: var(--loader-text-color);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        transform: translateY(100%); /* Start off-screen */
        animation: spin_dynamic 4s infinite;
    }

    @keyframes spin_dynamic {
        0%, 25% { transform: translateY(0); opacity: 1; }
        30%, 45% { transform: translateY(-100%); opacity: 1; }
        50%, 70% { transform: translateY(-200%); opacity: 1; }
        75%, 100% { transform: translateY(0); opacity: 0; }
    }

    .words span:nth-child(1) {
        animation-delay: 0s;
    }

    .words span:nth-child(2) {
        animation-delay: 1s;
    }

    .words span:nth-child(3) {
        animation-delay: 2s;
    }
</style>



<div class="stack loader" style="--loader-color: {loaderColor}; --loader-font: {loaderFont}; --loader-text-color: {loaderTextColor}; --loader-text-background: {loaderTextBackground}; --gap: 0.5em;" aria-live="polite">
    <p>{loadingText}</p>
    <div class="stack words" style="--direction: column;">
        {#each words as word}
            <span class="word">{word}</span>
        {/each}
    </div>
</div>

