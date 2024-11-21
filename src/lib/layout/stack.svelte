<script lang="ts">
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
    style: externalStyle = '', // Accept external style
    ...restProps // Accept additional props
  } = $props();

  const getDirection = () => (horizontal ? 'row' : 'column');

  const getJustifyContent = () => {
    if (leading) return 'flex-start';
    if (trailing) return 'flex-end';
    if (center) return 'center';
    if (getDirection() === 'column') {
      if (top) return 'flex-start';
      if (bottom) return 'flex-end';
    }
    return 'flex-start';
  };

  const getAlignItems = () => {
    if (top) return 'flex-start';
    if (bottom) return 'flex-end';
    if (center) return 'center';
    if (getDirection() === 'row') {
      if (leading) return 'flex-start';
      if (trailing) return 'flex-end';
    }
    return 'stretch';
  };

  // Merge internal and external classes
  let classes = $derived(() =>
    [
      'stack',
      expand ? 'expand' : '',
      fullWidth ? 'full-width' : '',
      fullHeight ? 'full-height' : '',
      externalClass // Add external class
    ]
      .filter(Boolean)
      .join(' ')
  );

  // Merge internal and external styles
  let styles = $derived(() => `
    display: flex;
    flex-direction: ${getDirection()};
    justify-content: ${getJustifyContent()};
    align-items: ${getAlignItems()};
    ${externalStyle} // Add external style
  `);

  $effect(() => {
    console.log('Classes:', classes());
    console.log('Styles:', styles());
  });
</script>

<div class={classes()} style={styles()} {...restProps}>
  {@render children()}
</div>
