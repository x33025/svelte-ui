<script lang="ts">
    // Define the start and end years
    const startYear = 1920;
    const endYear = 2020;

    // Generate decades with years dynamically
    let decades = [];
    for (let year = startYear; year <= endYear; year += 10) {
        const decadeYears = Array.from({ length: 10 }, (_, i) => year + i);
        decades.push({ title: `${year.toString().slice(2)}s`, years: decadeYears });
    }
</script>

<style>


    .years-column {

    }
    .decade-group {
        margin-bottom: 1em;
    }
    .decade-title {
        color: var(--gray-4);
        font-size: 0.9em;
        margin-bottom: 1em;
        text-align: center;
    }
    .year-grid {
        display: grid;
        gap: 0.35em;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, auto);
    }
    .year {
        text-align: center;
        padding: var(--small-padding);
        background-color: var(--gray-1);
        border-radius: 0.5em;
    }
</style>


    <div class="stack scrollable years-column" >
        {#each decades as { title, years }}
            <div class="stack decade-group" style="--align: flex-start;">
                <h2 class="decade-title">{title}</h2>
                <div class="year-grid">
                    {#each years as year}
                        <div class="year">{year}</div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>


