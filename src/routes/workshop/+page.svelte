<script lang="ts">
  



  import LogTracker from '$lib/components/log-tracker/index.svelte';
  import { addLog } from '$lib/index.js';
  import TextEditor from '$lib/components/text-editor/index.svelte';
  import Calendar from '$lib/components/calendar/index.svelte';
  import Stack from '$lib/layout/stack.svelte';

  let content = $state('<p>Hello</p> <b>World</b> ');

  $effect(() => {
 
    addLog(content);
  });

  </script>
  
  <Stack expand style="padding: 1.5em;">
    <!-- <TextEditor bind:content /> -->
    <!-- <ComponentRenderer code={$page.data.code}/>
   -->

    <Calendar />

  </Stack>
  <LogTracker />


  <style>

  </style>
  