<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    let { texts, loop = false, delay = 1750, morphSpeed = 21 } = $props<{ 
        texts: string[], 
        loop?: boolean, 
        delay?: number, 
        morphSpeed?: number 
    }>();

    let currentIndex = $state(0);
    let displayedText = $state('');
    let morphing = $state(false);
    

    $effect(() => {
        displayedText = texts[currentIndex];
        console.log(texts);

        
    });

    onMount(() => {
        interval = setInterval(() => {
            if (!morphing) morphToNext();
        }, delay);

        return () => clearInterval(interval);
    });
    

    let interval: NodeJS.Timeout;

    const scrambleChars = "#@*!&%$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    function generateRandomScramble(length: number) {
        return Array.from({ length }, () =>
            scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
        ).join('');
    }

    async function morphToNext() {
        if (texts.length <= 1) return;

        morphing = true;

        const nextIndex = (currentIndex + 1) % texts.length;
        const currentText = texts[currentIndex];
        const nextText = texts[nextIndex];
        const longestLength = Math.max(currentText.length, nextText.length);

        let tempText = currentText;

        // Step 1: Mash current text into a scrambled state
        for (let i = 0; i < longestLength; i++) {
            tempText = tempText.split("").map((char: string, index: number) => {
                if (index < i) return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                return currentText[index] || scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }).join("");

            displayedText = tempText;
            await new Promise((r) => setTimeout(r, morphSpeed));
        }

        // Step 2: Transition from scrambled state to next text
        for (let i = 0; i < longestLength; i++) {
            tempText = tempText.split("").map((char: string, index: number) => {
                if (index < i) return nextText[index] || "";
                return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            }).join("");

            displayedText = tempText;
            await new Promise((r) => setTimeout(r, morphSpeed));
        }

        // Finalize the next text
        displayedText = nextText;
        currentIndex = nextIndex;
        morphing = false;

        if (!loop && currentIndex === texts.length - 1) {
            clearInterval(interval);
        }
    }



    onDestroy(() => {
        clearInterval(interval);
    
    });
</script>

<stack class="text">{ displayedText }</stack>

<style>
    .text {
        font-size: 0.9em;
        font-weight: bold;
    }
</style>
