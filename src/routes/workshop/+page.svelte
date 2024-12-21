<script lang="ts">
  



  import LogTracker from '$lib/components/log-tracker/index.svelte';
  import { addLog } from '$lib/index.js';
  import Calendar from '$lib/components/calendar/index.svelte';
  import Stack from '$lib/layout/stack.svelte';



  let content = $state('<p>Hello</p> <b>World</b> ');

  $effect(() => {
 
    addLog(content);
  });

  </script>
  
  <Stack expand padding={1.5}>


    <Calendar />


  </Stack>
  <LogTracker />


