import type { Plugin } from 'vite';

export default function stackPlugin(): Plugin {
  return {
    name: 'vite-plugin-stack', // A unique name for the plugin
    transform(code: string, id: string) {
      // Only process Svelte files
      if (id.endsWith('.svelte')) {
        return {
          code: code.replace(/<stack(.*?)>(.*?)<\/stack>/gs, (_, attrs, content) => {
            // Determine if the `horizontal` or `vertical` attribute is present
            const isHorizontal = /\bhorizontal\b/.test(attrs);
            const isVertical = /\bvertical\b/.test(attrs);

            // Decide direction based on the attributes
            let direction = 'column'; // Default
            if (isHorizontal) direction = 'row';
            else if (isVertical) direction = 'column';

            // Extract class and style attributes
            const classMatch = attrs.match(/\bclass="([^"]*)"/);
            const styleMatch = attrs.match(/\bstyle="([^"]*)"/);
            const additionalClasses = classMatch ? classMatch[1] : '';
            const additionalStyles = styleMatch ? styleMatch[1] : '';

            // Clean up the attributes (remove horizontal/vertical)
            const cleanedAttrs = attrs
              .replace(/\bhorizontal\b/g, '')
              .replace(/\bvertical\b/g, '')
              .replace(/\bclass="[^"]*"/g, '')
              .replace(/\bstyle="[^"]*"/g, '')
              .trim();

            // Extract and preserve Svelte directives and other attributes
            const preservedAttrs = cleanedAttrs
              .split(/\s+/)
              .filter((attr: string) => !/^(horizontal|vertical)$/.test(attr))
              .join(' ');

            // Add data attributes and inline styles
            const dataAttribute = isHorizontal
              ? 'data-horizontal="true"'
              : isVertical
              ? 'data-vertical="true"'
              : '';
            const style = `style="--direction: ${direction}; ${additionalStyles}"`;

            return `<div class="stack ${additionalClasses}" ${dataAttribute} ${style} ${preservedAttrs}>${content}</div>`;
          }),
          map: null, // Optional: Add a source map if needed
        };
      }
    },
  };
}
