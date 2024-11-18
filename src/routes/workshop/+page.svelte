<script lang="ts">
  



  import LogTracker from '$lib/components/log-tracker/index.svelte';
  import { addLog } from '$lib/index.js';
  import ComponentRenderer from '$site/workshop/DynamicRenderer.svelte';
  import { page } from '$app/stores';
  import TextEditor from '$lib/components/text-editor/index.svelte';


  let content = $state('<p>Hello</p> <b>World</b> ');

  $effect(() => {
 
    addLog(content);
  });

  </script>
  
  <div class="stack expand" style="padding: 1.5em;">
    <TextEditor bind:content />
    <!-- <ComponentRenderer code={$page.data.code}/>
   -->

  </div>
  <LogTracker />
  <style>

  </style>
  