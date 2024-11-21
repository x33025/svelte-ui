<script lang="ts">
  



  import LogTracker from '$lib/components/log-tracker/index.svelte';
  import { addLog } from '$lib/index.js';
  import ComponentRenderer from '$site/workshop/DynamicRenderer.svelte';
  import { page } from '$app/stores';
  import TextEditor from '$lib/components/text-editor/index.svelte';
  import Stack from '$lib/layout/stack.svelte';

  let content = $state('<p>Hello</p> <b>World</b> ');

  $effect(() => {
 
    addLog(content);
  });

  </script>
  
  <Stack expand style="padding: 1.5em;">
    <TextEditor bind:content />
    <!-- <ComponentRenderer code={$page.data.code}/>
   -->

  </Stack>
  <LogTracker />


  <style>

  </style>
  