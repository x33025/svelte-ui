import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svelteui from './src/lib/layout/preprocessors/index.js';

export default defineConfig({
	plugins: [
		sveltekit(), 
		svelteui()
	]
});
