<script lang="ts">
  export let image_url: string | null = null;
  export let size: number = 10;  
  export let object_fit: string = 'cover';
  export let aspect_ratio: number | null = null; // Allow aspect_ratio to be null
  export let alt_text: string = 'Image';
  export let maskShape: 'circle' | 'square' = 'square'; 
  export let border_radius: number = 0.5;

  // Removed restProps destructuring
  let calculatedAspectRatio = 1;

  const getCommonStyles = () => `
    width: ${size}em;
    ${aspect_ratio ? `height: calc(${size}em / ${aspect_ratio});` : ''}
    border-radius: ${maskShape === 'circle' ? '50%' : `${border_radius}em`};
  `;
  
  function handleImageLoad(event: Event) {
    const img = event.target as HTMLImageElement;
    if (!aspect_ratio) {
      calculatedAspectRatio = img.naturalWidth / img.naturalHeight;
      img.style.height = `calc(${size}em / ${calculatedAspectRatio})`;
    }
  }
</script>

<div class="stack" style="--align: center; --justify: center;">
  {#if image_url}
    <img 
      src={image_url} 
      alt={alt_text} 
      style="object-fit: {object_fit}; {getCommonStyles()}" 
      on:load={handleImageLoad}
     
    />
  {:else}
    <div class="image-placeholder" style="{getCommonStyles()}">
      <p>No Image</p>
    </div>
  {/if}
</div>

<style>
  .image-placeholder {
    background-color: var(--gray-1); /* You can adjust this color */
  }

  img {
    display: block;
  }
</style>
