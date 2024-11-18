<script lang="ts">
  import { editor } from './editor.svelte.js';
  import { onMount } from 'svelte';
  import Toolbar from './toolbar/index.svelte';
  // Props
  let { content = $bindable(''), placeholder = '', styles = '' } = $props<{
    content: string;
    placeholder?: string;
    styles?: string;
  }>();


  onMount(() => {
    console.log('TEXT EDITOR CONTENT', content);
    if (editableContent) {
      editableContent.innerHTML = content;
    }
  });


  let editableContent: HTMLElement;

  // Handle text input
  const handleInput = () => {
    content = editor.textSanitizer.sanitize(editableContent.innerHTML.trim());
  };

  // Handle keyboard shortcuts
  function handleKeydown(event: KeyboardEvent) {
    if (event.metaKey || event.ctrlKey) {
      switch (event.key.toLowerCase()) {
        case 'h':
          if (event.shiftKey) {
            event.preventDefault();
            if (editor.textFormatter.isList()) {
              editor.textFormatter.removeList();
            } else {
              editor.textFormatter.cycleHeading();
            }
          }
          break;
        case 'b':
          event.preventDefault();
          editor.textFormatter.toggleBold();
          break;
        case 'i':
          event.preventDefault();
          editor.textFormatter.toggleItalic();
          break;
        case 'u':
          event.preventDefault();
          editor.textFormatter.toggleUnderline();
          break;
        case 't':
          event.preventDefault();
          editor.mediaHandler.insertTable(3, 3); // Example: Insert a 3x3 table
          break;
        case 'o':
          event.preventDefault();
          editor.textFormatter.toggleOrderedList();
          break;
        case 'l':
          event.preventDefault();
          editor.textFormatter.toggleUnorderedList();
          break;
      }
    } else if (event.altKey) {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          editor.textFormatter.toggleAlignLeft();
          break;
        case 'ArrowDown':
          event.preventDefault();
          editor.textFormatter.toggleAlignCenter();
          break;
        case 'ArrowRight':
          event.preventDefault();
          editor.textFormatter.toggleAlignRight();
          break;
        case 'ArrowUp':
          event.preventDefault();
          editor.textFormatter.toggleAlignJustify();
          break;
      }
    }
  }


</script>

<div class="stack text-editor expand">
  <Toolbar />
  <div class="divider"></div>
  <div
    bind:this={editableContent}
    class="editable-content expand"
    style={styles}
    contenteditable="true"
    oninput={handleInput}
    onkeydown={handleKeydown}
    tabindex="0"
    data-placeholder={placeholder}
    role="textbox"
  >
  </div>
</div>

<style>
  .text-editor {
    background-color: white;
    border: 1px solid var(--gray-2);
    border-radius: 0.5em;
    padding: 1em;
  }


  

  .editable-content {
    outline: none;
    font-family: 'Noto Serif', serif;
    line-height: 1.6em;
    position: relative;
  }

  .editable-content:empty:before {
    content: attr(data-placeholder);
    color: var(--gray-3);
    position: absolute;
    top: 1em;
    left: 1em;
    pointer-events: none;
    opacity: 0.6;
  }





</style>
