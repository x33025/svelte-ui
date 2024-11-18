<!-- <script lang="ts">
    import TradingViewAdvanced from './TradingViewAdvanced.svelte';
    import { addLog } from '$lib/index.js';
    import LogTracker from '$lib/log-tracker/index.svelte';
    import { marked } from 'marked';
    
    let chartData = $state("");
    let analysis = $state(""); // This will be in Markdown format
    let isLoading = $state(false);
    let historicalData = $state("");
    
    const today = new Date().toISOString().split('T')[0];
    
    let parsedAnalysis = $state("");
  
    $effect(() => {
      Promise.resolve(marked(analysis)).then(result => {
        parsedAnalysis = result;
      });
    });
    
    async function getChartData() {
        const ticker = 'AAPL';
        const start = '2024-11-03';
        const end = '2024-11-05';
        isLoading = true;
    
        try {
            const response = await fetch(`/api/playground/get-chart?ticker=${ticker}&start=${start}&end=${end}`);
            const data = await response.json();
    
            if (!response.ok) {
                addLog(`Error fetching chart data: ${data.error}`);
            } else {
                addLog(`Chart Data: ${JSON.stringify(data)}`);
                chartData = JSON.stringify(data);
                analyseChart();
            }
        } catch (error) {
            addLog(`Failed to fetch chart data: ${error}`);
        }
    }
    
    async function analyseChart() {
        try {
            const response = await fetch('/api/playground/analyse-chart', {
                method: 'POST',
                body: JSON.stringify({ data: chartData, date: today })
            });
    
            const responseData = await response.json();
    
            if (!response.ok) {
                addLog(`Error analysing chart: ${responseData.error}`);
            } else {
                addLog(`Analysis: ${JSON.stringify(responseData)}`);
                analysis = responseData.message; // Use raw message as markdown text
                historicalData = "This is the historical data retrieved from a vector database.";
                isLoading = false;
            }
        } catch (error) {
            addLog(`Failed to analyse chart: ${error}`);
        }
    }
    
  
    </script>
    
    <div class="stack expand scrollable" style="--direction: row; --justify: center;">
        <div class="spacer"></div>
        <div class="stack" style="--direction: column; --align: flex-start; --justify: flex-start; width: 64%; height: 100%;">
            <div class="stack full-width" style="--direction: row;">
                <h1>Apple ($AAPL) Stock Chart</h1>
                <div class="spacer"></div>
                <button class="analyse-button headline" onclick={getChartData}>{isLoading ? "Loading..." : "Analyse Chart"}</button>
            </div>
    
            <TradingViewAdvanced />
            {#if analysis}
                <div class="stack full-width">
                    <h2>Analysis</h2>
                    <div class="markdown-content" bind:innerHTML={parsedAnalysis} contenteditable></div>
                    <h2>Historical Data</h2>
                    <p>{historicalData}</p>
                </div>
            {/if}
        </div>
        <div class="spacer"></div>
    </div>
    
    <style>
    .analyse-button {
        background: linear-gradient(35deg, var(--cyan), var(--indigo));
        color: white;
        border-radius: 0.5em;
        padding: var(--default-padding);
    }
    
    /* Markdown Styling */
    .markdown-content h2 {
        color: var(--indigo);
        margin-top: 1em;
    }
    
    .markdown-content p {
        margin: 0.5em 0;
        line-height: 1.6;
    }
    
    .markdown-content ul {
        list-style-type: disc;
        padding-left: 1.5em;
    }
    
    .markdown-content li {
        margin: 0.5em 0;
    }
    
    .markdown-content strong {
        color: var(--cyan);
    }
    </style>
     -->