<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { EditorView, lineNumbers, keymap } from '@codemirror/view';
    import { EditorState } from '@codemirror/state';
    import { svelte } from '@replit/codemirror-lang-svelte';
    import { foldGutter, foldKeymap } from '@codemirror/language';
    import { oneDark } from '@codemirror/theme-one-dark';

    let editor: EditorView;
    let editorContainer: HTMLDivElement;

    let { code } = $props();

    onMount(() => {
        const startState = EditorState.create({
            doc: code,
            extensions: [
                svelte(),
                lineNumbers(),
                foldGutter(),
                keymap.of([
                    ...foldKeymap,
                    {
                        key: "Tab",
                        run: (view) => {
                            view.dispatch({
                                changes: { from: view.state.selection.main.from, insert: "\t" }
                            });
                            return true;
                        }
                    }
                ]),
                oneDark,
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        code = update.state.doc.toString();
                    }
                })
            ]
        });

        editor = new EditorView({
            state: startState,
            parent: editorContainer
        });
    });

    onDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });

    // Function to update the editor's content when `code` changes
    $effect(() => {
        if (editor && code !== editor.state.doc.toString()) {
            editor.dispatch({
                changes: { from: 0, to: editor.state.doc.length, insert: code }
            });
        }
    });
</script>

<div bind:this={editorContainer}></div>
  

<style>
    :global(.cm-editor) {
        background-color: var(--gray-1) !important;
        border: 1px solid var(--gray-2) !important;
        border-radius: 0.5em !important;
        outline: none !important;
        max-height: 700px;
        width: 100%;
        overflow-y: auto;
        overflow-x: auto;
        box-sizing: border-box;
    }

    :global(.cm-gutters) {
        background-color: var(--gray-1) !important;
        color: var(--gray-4) !important;
    }

    :global(.cm-content) {
        color: var(--gray-5) !important;
    }
</style>