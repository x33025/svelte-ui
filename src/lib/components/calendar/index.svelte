<script lang="ts">
    import { calendar, DaysOfWeek } from './index.svelte.js';

    let wasDraggingOutside = false;
    let isDragging = $state(false);
    let showMonthOverlay = $state(false);

    function toggleMonthOverlay() {
        showMonthOverlay = !showMonthOverlay;
    }

    $effect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
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

    function handleYearInputFocus() {
        showMonthOverlay = false;
    }

    function handleClickOutside(event: MouseEvent) {
        const calendarElement = document.querySelector('.calendar');
        if (calendarElement && !calendarElement.contains(event.target as Node)) {
            calendar.selectedDate = null;
            calendar.rangeStart = null;
            calendar.rangeEnd = null;
        }
    }
</script>

<div class="stack calendar no-gap border-highlight" >
    {@render Header()}
    <div class="z-stack">
        {@render Month()}
        {#if showMonthOverlay}
            <button class="overlay-content" onclick={toggleMonthOverlay}>
                {@render MonthSelection()}
            </button>
        {/if}
    </div>
</div>

{#snippet Header()}
<div class="stack full-width calendar-header subheadline" style="--direction: row; --justify: space-around; --align: center;">
    <button onclick={calendar.prevMonth} aria-label="Previous month">&lt;</button>
    <div>
        <button class="header-item" class:selected={!showMonthOverlay} onclick={toggleMonthOverlay}>
            {new Date(calendar.selectedYear ?? calendar.today.getFullYear(), calendar.selectedMonth ?? calendar.today.getMonth(), 1).toLocaleString('default', { month: 'long' })}
        </button>
        {@render YearInput()}
    </div>
    <button onclick={calendar.nextMonth} aria-label="Next month">&gt;</button>
</div>
{/snippet}

{#snippet YearInput()}
<input 
    type="number" 
    value={calendar.selectedYear ?? calendar.today.getFullYear()} 
    oninput={(e) => {
        calendar.selectedYear = +(e.target as HTMLInputElement).value;
        calendar.days = calendar.calculateDays();
    }} 
    onfocus={handleYearInputFocus}
    class="year-input header-item"
/>
{/snippet}

{#snippet MonthSelection()}
<div class="grid month-grid month-selection">
    {#each Array.from({ length: 12 }, (_, i) => i) as month}
        <button 
            class="border-highlight"
            class:selected={month === (calendar.selectedMonth ?? calendar.today.getMonth())} 
            onclick={() => {
                calendar.selectedMonth = month;
                calendar.days = calendar.calculateDays();
            }}
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

    <div class="grid day-grid full-width" style="--direction: row; --justify: space-between; --align: center;">
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
        max-width: fit-content;
    }


    .header-item {
        padding: var(--small-padding);
        border-radius: 0.35em;
        transition: background-color 0.3s ease;
    }

    .header-item:hover {
        background-color: var(--gray-1);
        color: black;
    }

    .year-input {
        width: 5em;
    }

    .year-input:hover {
        background-color: var(--gray-1);

    }

    .year-input:focus {
        background-color: var(--gray-1);
        color: black;

    }

    .calendar-header {
        padding: 0.5em;
        border-bottom: 1px solid var(--gray-2);
    }

    .days-of-week {

        grid-template-columns: repeat(7, 1fr);
        text-align: center;
        opacity: 0.8;
    }

    .day-grid {
        gap: 0.5em;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
    }



    .month {
        padding: 1em;
    }

    .inactive {
        opacity: 0.5;
    }

    .month-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5em;
    }

    .month-selection button {
        padding: var(--default-padding);
        border-radius: 0.5em;

    }

    .month-selection button:hover {
        background-color: var(--gray-1);
       
    }

    .overlay-content {
        background-color: white;
        padding: 1em;
        border-radius: 1em;
        z-index: 101;
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
</style>