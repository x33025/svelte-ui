<script lang="ts">
  



  import LogTracker from '$lib/components/log-tracker/index.svelte';
  import { addLog } from '$lib/index.js';
  import TextEditor from '$lib/components/text-editor/index.svelte';
  import Calendar from '$lib/components/calendar/index.svelte';
  import Stack from '$lib/layout/stack.svelte';
  import GradientBlob from '$site/workshop/GradientBlob.svelte';



  let content = $state('<p>Hello</p> <b>World</b> ');

  $effect(() => {
 
    addLog(content);
  });

  </script>
  
  <Stack expand >
    <!-- <TextEditor bind:content /> -->
    <!-- <ComponentRenderer code={$page.data.code}/>
   -->

    <!-- <Calendar /> -->
    <GradientBlob />

  </Stack>
  <LogTracker />


  <style>

  </style>
  