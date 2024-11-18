import type { Plugin } from 'vite';
import spacerPlugin from './spacer.js';
import dividerPlugin from './divider.js';
import stackPlugin from './stack.js';



export default function svelteui(): Plugin[] {  
    return [
        spacerPlugin(),
        dividerPlugin(),
        stackPlugin()
    ]
}