import type { Plugin } from 'vite';

export default function dividerPlugin(): Plugin {
    return {
      name: 'vite-plugin-divider', // A unique name for the plugin
      transform(code: string, id: string) {
        // Only process Svelte files
        if (id.endsWith('.svelte')) {
          return {
            code: code.replace(/<divider([^>]*)\s*\/?>/gs, (_, attributes) => {
              // Parse attributes
              const isVertical = /\bvertical\b/.test(attributes);
              const isDashed = /\bdashed\b/.test(attributes);
              const isSolid = /\bsolid\b/.test(attributes);
  
              const colorMatch = attributes.match(/color=["']([^"']+)["']/);
              const thicknessMatch = attributes.match(/thickness=["']([^"']+)["']/);
  
              const color = colorMatch ? colorMatch[1] : 'black'; // Default color
              const thickness = thicknessMatch ? thicknessMatch[1] : '1px'; // Default thickness
  
              // Determine orientation and border style
              const direction = isVertical ? 'vertical' : 'horizontal';
              const borderStyle = isDashed ? 'dashed' : isSolid ? 'solid' : 'solid';
  
              // Clean up attributes
              const otherAttributes = attributes
                .replace(/\b(vertical|dashed|solid)\b/g, '') // Remove processed attributes
                .replace(/(color|thickness)=["'][^"']+["']/g, '') // Remove used attributes
                .trim();
  
              // Transform into a styled div or hr
              if (isVertical) {
                return `<div class="divider vertical" style="border-left: ${thickness} ${borderStyle} ${color};" ${otherAttributes}></div>`;
              } else {
                return `<hr class="divider horizontal" style="border-top: ${thickness} ${borderStyle} ${color};" ${otherAttributes} />`;
              }
            }),
            map: null,
          };
        }
      },
    };
  }
  