<script lang="ts">
    import { BROWSER } from 'esm-env';
    import { onMount } from 'svelte';

    const text = "x33025";
    let textRing: HTMLDivElement;

    onMount(() => {
        if (BROWSER) {
            const chars = text.split('');
            textRing.style.setProperty('--total', chars.length.toString());

            // Set a fixed radius value
            const fixedRadius = 4.2; // Example fixed radius value
            textRing.style.setProperty('--radius', `${-fixedRadius}ch`);

            const visibleSpan = document.createElement('span');
            visibleSpan.setAttribute('aria-hidden', 'true');

            let currentAngle = 352; // Start angle for the first character
            const angleIncrement = 13; // Fixed angle increment for each character

            chars.forEach((char, index) => {
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                charSpan.style.setProperty('--index', index.toString());
                charSpan.style.setProperty('--start-angle', `${currentAngle}deg`);
                visibleSpan.appendChild(charSpan);

                currentAngle += angleIncrement; // Increment the angle for the next character
            });

            const srSpan = document.createElement('span');
            srSpan.classList.add('sr-only');
            srSpan.textContent = text;

            textRing.appendChild(visibleSpan);
            textRing.appendChild(srSpan);
        }
    });
</script>

<div class="text-ring" bind:this={textRing}>
 
</div>


<style>

    .text-ring {
        position: relative;
      
        width: 1em;  /* Fixed width */
        height: 1em; /* Fixed height */
        --font-size: 0.17em; /* Reduced from 1.5rem */
        font-weight: bold; /* Set font weight to bold */
    }

    :global(.text-ring [style*="--index"]) {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: var(--font-size);
        transform:
            translate(-50%, -50%)
            rotate(var(--start-angle))
            translateY(var(--radius));
    }


    :global(.sr-only) {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
</style>
