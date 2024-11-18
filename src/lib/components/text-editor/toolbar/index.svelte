<script lang="ts">
    import DropdownMenu from "$lib/components/dropdown-menu/index.svelte";
    import { closeDropdown } from "$lib/index.js";

    function handleUlist() {
        console.log('ulist');
    }

    function handleOlist() {
        console.log('olist');
    }

    function handleBold() {
        console.log('bold');
    }

    function handleItalic() {
        console.log('italic');
    }

    function handleUnderline() {
        console.log('underline');
    }
</script>

<stack horizontal style="--gap: 0.5em;">
    {@render ToolbarButton('Bold', handleBold)}
    {@render ToolbarButton('Italic', handleItalic)}
    {@render ToolbarButton('Underline', handleUnderline)}
    {@render ToolbarButton('Ulist', handleUlist)}
    {@render ToolbarButton('Olist', handleOlist)}
    <DropdownMenu alignment="center">
        {#snippet button()}
            <p class="caption bold toolbar-button">Justify</p>
        {/snippet}

        {#snippet content()}


            <div class="stack" >
                <button class="caption bold dropdown-item" onclick={() => {console.log('left'); closeDropdown() }}>Left</button>
                <button class="caption bold dropdown-item" onclick={() => {console.log('center'); closeDropdown()}}>Center</button>
                <button class="caption bold dropdown-item" onclick={() => {console.log('right'); closeDropdown()}}>Right</button>
                <button class="caption bold dropdown-item" onclick={() => {console.log('full'); closeDropdown()}}>Full</button>
        </div>
  
        {/snippet}
    </DropdownMenu>
</stack>

{#snippet ToolbarButton(label: string, onclick: () => void)}
    <button class="caption bold toolbar-button" onclick={onclick}>{label}</button>
{/snippet}  


<style>

 

    .toolbar-button {
        border: 1px solid var(--gray-2);
        border-radius: 0.5em;
        padding: 0.5em;
    }
</style>