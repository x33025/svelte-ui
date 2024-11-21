<script lang="ts">

    import Stack from '$lib/layout/stack.svelte';

let colors = ['var(--red)', 'var(--pink)', 'var(--orange)', 'var(--yellow)', 'var(--green)', 'var(--mint)', 'var(--teal)', 'var(--cyan)', 'var(--blue)', 'var(--indigo)', 'var(--purple)']
let grays = ['var(--gray-1)', 'var(--gray-2)', 'var(--gray-3)', 'var(--gray-4)', 'var(--gray-5)', 'var(--gray-6)']
let fonts = ['Kode Mono', 'Noto Serif', 'Sono', 'Nunito', 'Inter']

</script>




<Stack style="padding: 1.5em;">

    <h2>Colors</h2>
    <div class="stack">
    {#each colors as color}
        {@render ColorCard(color)}
        {/each}
    </div>
    <h2>Grays</h2>
    <div class="stack">
        {#each grays as gray}
            {@render ColorCard(gray)}
        {/each}
    </div>
    <h2>Fonts</h2>
    <div class="stack full-width" style="--direction: row; --align: center; --justify: center;">
        {#each fonts.sort() as font}
            {@render FontCard(font)}
        {/each}
    </div>
    
    <p class="title">This is a Title</p>
    <p class="headline">This is a Headline</p>
    <p class="subheadline">This is a Subheadline</p>
    <p class="body">This is Body text</p>
    <p class="callout">This is a Callout</p>
    <p class="caption">This is a Caption</p>

    <pre class="code-block">
        <code>
{"function example() {\n  return \"Hello World\";\n}"}
        </code>
    </pre>
</Stack>


{#snippet ColorCard(color: string)}
<div class="stack" style="--direction: row; --align: center; --justify: center;">
    <div class="color-card " style="background-color: {color}; "></div>
    <p  style="color: {color}; font-weight: bold;">{color}</p>
</div>
{/snippet}



{#snippet FontCard(font: string)}
<div class="stack" style="--direction: column; --align: flex-start; --justify: center; --gap: 0.5em;">
    <div class="stack font-card" style="--direction: row; --align: center; --justify: center;">
        <p class="headline" style="font-family: {font}; font-weight: bold;">{font}</p>
    </div>
    <a class="caption google-link" href="https://fonts.google.com/specimen/{font.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('+')}" target="_blank">Google Fonts</a>
</div>
{/snippet}


<style>

    .google-link {
        color: var(--gray-6);
        padding: var(--small-padding);
        background-color: var(--gray-1);
        border-radius: 9999px;
    }

    .color-card {
        border: 1px solid var(--gray-1);
        width: 4em;
        height: 1em;
        border-radius: 0.5em;
    }

    .font-card {
        border: 1px solid var(--gray-2);
        width: 10em;
        height: 6em;
        border-radius: 0.5em;
    }
</style>
