<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    let numbers = Array.from({ length: 10 }, (_, i) => (i + 1).toString());
    let selectedNumber = '1';
    let column: HTMLElement;
    let isDragging = false;
    let startY = 0;
    let scrollStart = 0;
    let scrollTimeout: number | undefined;

    function updateHighlight() {
    const columnCenter = column.clientHeight / 2;
    let closestItem: HTMLElement | null = null;
    let closestDistance = Infinity;

    column.querySelectorAll('.picker-item').forEach((item) => {
        const itemElement = item as HTMLElement;
        const itemCenter = itemElement.offsetTop + itemElement.clientHeight / 2 - column.scrollTop;
        const distance = Math.abs(columnCenter - itemCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestItem = itemElement;
        }
        });
        console.log("closestItem", closestItem);
        // Update selectedNumber if closestItem is found
        if (closestItem) {
            const item = closestItem as HTMLElement;
            selectedNumber = item.textContent || '';
        }
    }

function snapToCenter() {
    if (!column) return; // Ensure column is defined

    const columnCenter = column.clientHeight / 2;
    let closestItem: HTMLElement | null = null;
    let closestDistance = Infinity;

    column.querySelectorAll('.picker-item').forEach((item) => {
        const itemElement = item as HTMLElement;
        const itemCenter = itemElement.offsetTop + itemElement.clientHeight / 2 - column.scrollTop;
        const distance = Math.abs(columnCenter - itemCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestItem = itemElement;
        }
    });

    if (closestItem) {
        scrollToCenter(closestItem);
    }
}


    function scrollToCenter(item: HTMLElement) {
        const columnCenter = column.clientHeight / 2;
        const itemCenter = item.offsetTop + item.clientHeight / 2;
        const scrollOffset = itemCenter - columnCenter;

        column.scrollTo({ top: scrollOffset, behavior: 'smooth' });
    }

    function handleItemClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (target && target.classList.contains('picker-item')) {
            selectedNumber = target.textContent || '';
            scrollToCenter(target);
        }
    }

    function handleMouseDown(event: MouseEvent) {
        isDragging = true;
        startY = event.clientY;
        scrollStart = column.scrollTop;
    }

    function handleMouseMove(event: MouseEvent) {
        if (isDragging) {
            const dy = event.clientY - startY;
            column.scrollTop = scrollStart - dy;
            updateHighlight();
        }
    }

    function handleMouseUp() {
        isDragging = false;
        triggerSnapToCenter();
    }

    function triggerSnapToCenter() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            snapToCenter();
        }, 150) as unknown as number; // Delay to detect scroll end
    }

    onMount(() => {
        column.addEventListener('scroll', () => {
            updateHighlight();
            triggerSnapToCenter(); // Trigger smooth snap after scroll stops
        });

        // Initial highlight update
        updateHighlight();

        // Event listeners for dragging
        column.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    });

    onDestroy(() => {
        if (column) {
            column.removeEventListener('scroll', updateHighlight);
            column.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
    });
</script>

<style>
    .picker {

        background-color: white;
        padding: 1em;
        border-radius: 1em;
        overflow: hidden;
        position: relative;
    }

    .picker-column {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        scroll-behavior: smooth;
        max-height: 180px;
        margin: 0 10px;
        position: relative;
        scrollbar-width: none;
    }

    .picker-column::-webkit-scrollbar {
        display: none;
    }

    .picker-item {
        color: gray;
        padding: 10px 0;
        cursor: pointer;
        transition: color 0.3s, font-size 0.3s;
        user-select: none;
    }

    .picker-item.selected {
        color: black;
        font-weight: bold;
    }
</style>

<div class="stack picker border-highlight">
    <div
        aria-label="picker"
        role="button"
        tabindex="0"
        class="picker-column"
        bind:this={column}
        onclick={handleItemClick}
    >
        {#each numbers as number}
            <button class="picker-item" class:selected={number === selectedNumber}>{number}</button>
        {/each}
    </div>
</div>
