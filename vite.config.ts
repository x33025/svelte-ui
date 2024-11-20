import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svelteuiLayout from './src/lib/layout/plugins/index.js';

export default defineConfig({
	plugins: [
		sveltekit(), 
		svelteuiLayout()
	],
	resolve: {
		alias: {
			$site: '/src/site',
			$lib: '/src/lib'
		}
	}
});
