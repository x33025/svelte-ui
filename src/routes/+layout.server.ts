import components from '$lib/components.json'; // Import the pre-generated JSON file

export const load = async () => {
  try {
    // Return the components list from the pre-generated metadata
    return { components };
  } catch (error) {
    console.error('Error loading components metadata:', error);
    return { error: error, components: [] };
  }
};
