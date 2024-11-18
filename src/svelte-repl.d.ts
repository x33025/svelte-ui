declare module '@sveltejs/svelte-repl' {
  import { SvelteComponentTyped } from 'svelte';

  export class Repl extends SvelteComponentTyped<{
    files: Record<string, { name: string; type: string; source: string }>;
  }> {}
}
