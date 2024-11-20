import type { Plugin } from 'vite';

export default function spacerPlugin(): Plugin {
    return {
      name: 'vite-plugin-spacer', // A unique name for the plugin
      transform(code: string, id: string) {
        // Only process Svelte files
        if (id.endsWith('.svelte')) {
          return {
            code: code.replace(/<spacer([^>]*)\s*\/?>/gs, (_, attributes) => {
              // Parse attributes
              const verticalMatch = attributes.match(/vertical=["']([^"']+)["']/);
              const horizontalMatch = attributes.match(/horizontal=["']([^"']+)["']/);
  
              const vertical = verticalMatch ? verticalMatch[1] : '1em'; // Default height
              const horizontal = horizontalMatch ? horizontalMatch[1] : '100%'; // Default width
  
              // Clean up unused attributes
              const otherAttributes = attributes
                .replace(/vertical=["'][^"']+["']/, '') // Remove vertical attribute
                .replace(/horizontal=["'][^"']+["']/, '') // Remove horizontal attribute
                .trim();
  
              // Return transformed spacer div
              return `<div class="spacer" style="height: ${vertical}; width: ${horizontal};" ${otherAttributes}></div>`;
            }),
            map: null, // Optional: Add source map if needed
          };
        }
      },
    };
  }
  