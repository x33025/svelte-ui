<script lang="ts">
    import { calendar, DaysOfWeek } from './index.svelte.js';
    import YearSelector from './year-selector.svelte';

    let wasDraggingOutside = false;
    let isDragging = $state(false);


    let overlayType = $state<"month" | "year" | null>(null);


 

    function toggleMonthOverlay() {
        overlayType = overlayType === "month" ? null : "month";
    }

    function toggleYearOverlay() {
        overlayType = overlayType === "year" ? null : "year";
    }

    $effect(() => {
        window.addEventListener('mouseup', handleMouseUp);
    });

    function handleMouseDown(day: Date) {
        isDragging = true;
        calendar.rangeStart = day;
        calendar.rangeEnd = day;
        calendar.selectedDate = null;
    }

    function handleMouseEnter(day: Date) {
        if (isDragging || wasDraggingOutside) {
            isDragging = true;
            calendar.rangeEnd = day;
            wasDraggingOutside = false;  // Reset the flag once re-entered
        }
    }

    function handleMouseUp() {
        isDragging = false;
        wasDraggingOutside = false;
    }

    function handleMouseLeave() {
        if (isDragging) {
            wasDraggingOutside = true;  // Set the flag when leaving while dragging
        }
    }

    function handleDayClick(day: Date) {
        if (calendar.selectedDate === day) {
            calendar.selectedDate = null;
        } else {
            calendar.selectedDate = day;
        }
        calendar.rangeStart = null;
        calendar.rangeEnd = null;
    }
</script>

<div class="stack calendar no-gap border-highlight" style="--direction: column;">
    {@render Header()}
    <div class="z-stack">
        {@render Month()}
        {#if overlayType === "month"}
            <button class="overlay-content" onclick={toggleMonthOverlay}>
                {@render MonthSelection()}
            </button>
        {:else if overlayType === "year"}
            <button class="overlay-content" onclick={toggleYearOverlay}>
                {@render YearSelection()}
            </button>
        {/if}
    </div>
</div>

{#snippet Header()}
<div class="stack full-width calendar-header headline" style="--direction: row; --justify: space-around; --align: center;">
    <button onclick={calendar.prevMonth} aria-label="Previous month">&lt;</button>
    <div>
        <button class="ui-button" class:ui-selected={overlayType === "month"} onclick={toggleMonthOverlay}>
            {new Date(calendar.selectedYear ?? calendar.today.getFullYear(), calendar.selectedMonth ?? calendar.today.getMonth(), 1).toLocaleString('default', { month: 'long' })}
        </button>
        <button class="ui-button" class:ui-selected={overlayType === "year"} onclick={toggleYearOverlay}>
            {calendar.selectedYear ?? calendar.today.getFullYear()}
        </button>
    </div>
    <button onclick={calendar.nextMonth} aria-label="Next month">&gt;</button>
</div>
{/snippet}

{#snippet YearSelection()}
<YearSelector />
{/snippet}

{#snippet MonthSelection()}
<div class="grid month-selection">
    {#each Array.from({ length: 12 }, (_, i) => i) as month}
        <button 
            class="ui-button"
            class:selected={month === (calendar.selectedMonth ?? calendar.today.getMonth())} 
            onclick={() => calendar.selectedMonth = month}
        >
            {new Date(calendar.selectedYear ?? calendar.today.getFullYear(), month, 1).toLocaleString('default', { month: 'long' })}
        </button>
    {/each}
</div>
{/snippet}

{#snippet Month()}
<div 
    class="stack month" 
    role="grid" 
    tabindex="0"
    onmouseleave={handleMouseLeave}
>
    <div class="stack full-width days-of-week callout" style="--direction: row; --justify: space-between; --align: center;">
        {#each Array.from({ length: 7 }, (_, i) => (calendar.startDayOfWeek + i) % 7) as day}
            <div>{Object.keys(DaysOfWeek)[day].slice(0, 3)}</div>
        {/each}
    </div>

    <div class="grid full-width days" style="--direction: row; --justify: space-between; --align: center;">
        {#each calendar.days as day}
            {@render Day(day)}
        {/each}
    </div>
</div>
{/snippet}

{#snippet Day(day: Date)}
<button 
    class="stack day"
    style="--justify: center; --align: center;"
    class:selected={calendar.isSelected(day)}
    class:inactive={calendar.isInactive(day)}
    class:today={calendar.isToday(day)}
    class:in-range={calendar.isInRange(day)}
    class:range-start={calendar.isRangeStart(day)}
    class:range-end={calendar.isRangeEnd(day)}
    
    onmousedown={() => handleMouseDown(day)}
    onmouseenter={() => handleMouseEnter(day)}
    onmouseup={handleMouseUp}
    onclick={() => handleDayClick(day)} 
    tabindex="0"
    aria-label={`${day.getDate()} ${day.toLocaleString('default', { month: 'long' })} ${day.getFullYear()}`}
>
    {day.getDate()}
</button>
{/snippet}


<style>
    .calendar {
        background-color: white;
        border-radius: 1em;
        color: black;
        position: relative;
    }

    .calendar-header {
        padding: 0.5em;
        border-bottom: 1px solid var(--gray-2);
    }

    .days-of-week {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
        opacity: 0.8;
    }

    .days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
    }

    .day {
        padding: 0.5em 0;
        border-radius: 50%;
        cursor: pointer;
        width: 2em;
        height: 2em;
        transition: background-color var(--standard-duration), transform var(--snappy-duration);
    }

    .day:hover:not(.selected):not(.in-range) {
        background-color: var(--gray-1);
        color: black;
    }

    .day.selected {
        background-color: var(--blue);
        color: white;
        font-weight: bold;
        transform: scale(1.1);
        z-index: 2;
    }

    .day.in-range {
        background-color: var(--gray-2);
        color: black;
    }

    .day.range-start, .day.range-end {
        transform: scale(1.1);
        background-color: var(--blue);
        color: white;
        font-weight: bold;
        z-index: 2;
    }

    .day.today {
       background-color: var(--red);
       color: white;
    }

    .month {
        padding: 1em;
    }

    .inactive {
        opacity: 0.5;
    }

    .ui-button {
        padding: var(--small-padding);
        border-radius: 0.35em;
        transition: background-color 0.3s ease;
    }

    .ui-button:hover {
        background-color: var(--gray-1);
        color: black;
    }

    .ui-selected {
        background-color: var(--blue);
        color: white;
        padding: var(--small-padding);
    }

    .month-selection {
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5em;
    }

    .month-selection button,
    .year-selection button {
        padding: var(--default-padding);
        border-radius: 0.5em;
        cursor: pointer;
        border: none;
    }

    .month-selection button:hover,
    .year-selection button:hover {
        background-color: var(--blue);
        color: white;
    }

    .overlay-content {
        background-color: white;
        padding: 1em;
        border-radius: 0.5em;
        z-index: 101;
    }
</style>