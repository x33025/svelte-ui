
<stack style="padding: 1.5em;">
<div class="stack">
     <div class="stack" style="--direction: row;">
        <h1 class="typography">h1</h1><h1>Heading 1</h1>
    </div>
    <div class="stack" style="--direction: row;">
        <h2 class="typography">h2</h2><h2>Heading 2</h2>
    </div>
    <div class="stack" style="--direction: row;">
        <h3 class="typography">h3</h3><h3>Heading 3</h3>
    </div>
    <div class="stack" style="--direction: row;">
        <p class="typography">p</p><p>This is a paragraph</p>
    </div>
    <div class="stack" style="--direction: row;">
        <a class="typography" href="/core">a</a><a href="/">linked text</a>
    </div>
</div>

<div class="divider" ></div>

<div class="stack">
 

        <div class="stack "><h2 class="label"><span class="component-name">Text input</span> input[type="text"]</h2><input type="text" placeholder="Text input"></div>
        <div class="stack"><h2 class="label"><span class="component-name">Password input</span> input[type="password"]</h2><input type="password" placeholder="Password input"></div>
        <div class="stack"><h2 class="label"><span class="component-name">Email input</span> input[type="email"]</h2><input type="email" placeholder="Email input"></div>
        <div class="stack"><h2 class="label"><span class="component-name">Number input</span> input[type="number"]</h2><input type="number" placeholder="Number input"></div>
        <div class="stack"><h2 class="label"><span class="component-name">Textarea</span></h2><textarea placeholder="Textarea"></textarea></div>

  
</div>

<div class="stack">

</div>
<div class="divider" ></div>
<div class="stack">
    <h2>Padding Variables</h2>
    <div class="padding-display" style="padding: var(--small-padding);">
        Small Padding</div>
    <div class="padding-display" style="padding: var(--default-padding);">
        Default Padding</div>
    <div class="padding-display" style="padding: var(--large-padding);">
        Large Padding</div>
</div>
</stack>



<style>

    input, textarea {
        border: 1px solid var(--gray-3);
        border-radius: 0.5em;
        padding: var(--small-padding);
    }
    
    .typography {
        color: var(--blue);
    }

    .divider {
        margin: 1em 0;
    }

    .label {
        color: black;
    }

    .component-name {
        color: var(--blue);
    }

    .padding-display {
        background-color: var(--gray-1);
        border-radius: 0.5em;
        
    }
</style>
