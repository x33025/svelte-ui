<script lang="ts">
  import '$lib/styles/index.css';

  import Footer from '$site/components/footer/index.svelte';

  import NavigationBar from '$site/components/navigation-bar/index.svelte';
  import { ContextMenu } from '$lib/index.js';
  import Sidebar from '$lib/components/sidebar/index.svelte';
  import Modal from '$lib/components/modal/index.svelte';
  import ScrollToTop from '$lib/components/scroll-to-top/index.svelte';

  let { children } = $props()

</script>



<div class="page expand scrollable no-gap" >
  


    <NavigationBar />


      {@render children()}

 

    <Footer />



</div>



<ContextMenu />
<Sidebar />
<Modal />
<ScrollToTop />


<style>



</style>
