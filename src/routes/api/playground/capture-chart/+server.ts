// src/routes/api/capture-chart.ts
import type { RequestHandler } from '@sveltejs/kit';
import puppeteer from 'puppeteer';

export const GET: RequestHandler = async () => {
    try {
        console.log("captureChart");

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Replace with the URL of the page that has your TradingView widget
        await page.goto('http://localhost:5173/playground', { waitUntil: 'networkidle2' });

        // Increase the timeout for waiting for the selector
        await page.waitForSelector('.tradingview-widget-container', { timeout: 60000 });

        // Capture a screenshot of the widget container
        const widgetContainer = await page.$('.tradingview-widget-container');
        const screenshot = await widgetContainer?.screenshot({ type: 'png' });

        await browser.close();

        // Return the screenshot as a response
        return new Response(screenshot, {
            headers: {
                'Content-Type': 'image/png',
                'Content-Disposition': 'attachment; filename="tradingview-chart.png"'
            }
        });
    } catch (error) {
        console.error('Error capturing screenshot:', error);
        return new Response('Error capturing screenshot', { status: 500 });
    }
};
