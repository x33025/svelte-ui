<!-- <script lang="ts">
    import { onMount } from "svelte";
    import { addLog } from "$lib/index.js";

    let container: HTMLElement;


    onMount(() => {
        addLog("onMount: Initializing TradingView widget");

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
        {
            "autosize": false,
            "symbol": "NASDAQ:AAPL",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "light",
            "style": "1",
            "locale": "en",
            "allow_symbol_change": false,
            "calendar": false,
            "support_host": "https://www.tradingview.com"
        }`;

        addLog("onMount: Script element created");

        container.appendChild(script);
        addLog("onMount: Script appended to container");
    });
</script>

<div class="stack  tradingview-widget-container " style="--direction: column; " bind:this={container}>
  <div class="tradingview-widget-container__widget"></div>
  <div class="tradingview-widget-copyright">
    <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
      <span class="blue-text">Track all markets on TradingView</span>
    </a>
  </div>
</div>
 -->
