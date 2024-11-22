<script lang="ts">
  // Destructure unnamed props (positional arguments)
  let {
    horizontal = false,
    leading = false,
    trailing = false,
    center = false,
    top = false,
    bottom = false,
    expand = false,
    fullWidth = false,
    fullHeight = false,
    children,
    class: externalClass = '', // Accept external class
    style: externalStyle = '', // Accept additional styles
    gap = 1, // Interpret the second positional argument as the gap
    ...restProps // Accept additional props
  } = $props();

  // Ensure gap is always a number
  if (typeof gap !== 'number') {
    throw new Error("The gap value must be a number.");
  }

  // Determine CSS variable values
  const direction = horizontal ? 'row' : 'column';
  const justify = (() => {
    if (top) return 'flex-start';
    if (bottom) return 'flex-end';
    if (center) return 'center';
    return 'flex-start'; // Default to flex-start
  })();
  const align = (() => {
    if (leading) return 'flex-start';
    if (trailing) return 'flex-end';
    if (center) return 'center';
    return 'stretch'; // Default to stretch
  })();

  // Combine classes for the component
  let classes = [
    'stack',
    expand ? 'expand' : '',
    fullWidth ? 'full-width' : '',
    fullHeight ? 'full-height' : '',
    externalClass,
  ]
    .filter(Boolean)
    .join(' ');

  // Combine internal and external styles
  let styles = `
    --direction: ${direction};
    --justify: ${justify};
    --align: ${align};
    --gap: ${gap}em; 
    ${externalStyle}
  `;
</script>

<div class={classes} style={styles} {...restProps}>
  {@render children()}
</div>
