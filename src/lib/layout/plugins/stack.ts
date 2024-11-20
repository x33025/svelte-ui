import type { Plugin } from 'vite';

export default function stackPlugin(): Plugin {
  return {
    name: 'vite-plugin-stack',
    transform(code: string, id: string) {
      if (id.endsWith('.svelte')) {
        return {
          code: code.replace(/<stack(.*?)>(.*?)<\/stack>/gs, (_, attrs, content) => {
            // Determine layout direction (default is 'column')
            const isHorizontal = /\bhorizontal\b/.test(attrs);
            const isVertical = /\bvertical\b/.test(attrs);
            const direction = isHorizontal ? 'row' : 'column';

            // Identify additional attributes like `full-width`, `full-height`, `expand`
            const isFullWidth = /\bfull-width\b/.test(attrs);
            const isFullHeight = /\bfull-height\b/.test(attrs);
            const isExpand = /\bexpand\b/.test(attrs);

            // Generate CSS class string
            const additionalClasses = [
              'stack',
              isFullWidth ? 'full-width' : '',
              isFullHeight ? 'full-height' : '',
              isExpand ? 'expand' : '',
            ]
              .filter(Boolean)
              .join(' ');

            // Clean up processed attributes
            const cleanedAttrs = attrs
              .replace(/\bhorizontal\b/g, '')
              .replace(/\bvertical\b/g, '')
              .replace(/\bfull-width\b/g, '')
              .replace(/\bfull-height\b/g, '')
              .replace(/\bexpand\b/g, '')
              .trim();

            // Preserve other attributes and directives
            const preservedAttrs = cleanedAttrs
              .split(/\s+/)
              .filter((attr: string) => !/^(horizontal|vertical|full-width|full-height|expand)$/.test(attr))
              .join(' ');

            // Build the transformed `<div>` element
            return `<div class="${additionalClasses}" style="--direction: ${direction};" ${preservedAttrs}>${content}</div>`;
          }),
          map: null,
        };
      }
    },
  };
}
