import components from '$lib/metadata/components.json'; // Import the pre-generated components metadata
import type { DirectoryContent } from '$site/components/component-file-explorer/types.ts';
export const load = async ({ params }) => {
  const { name } = params; // Capture the component name from the route parameters

  // Recursive function to find a specific component in the metadata
  const findComponent = (directory: DirectoryContent[], componentName: string): DirectoryContent | undefined => {
    for (const item of directory) {
      if (item.name === componentName && item.type === 'folder') {
        return item; // Found the component folder
      }
      if (item.contents) {
        const result = findComponent(item.contents, componentName); // Search in nested folders
        if (result) return result;
      }
    }
    return undefined; // Component not found
  };

  try {
    // Find the component in the pre-generated metadata
    const componentData = findComponent(components as DirectoryContent[], name);

    if (!componentData) {
      throw new Error(`Component "${name}" not found.`);
    }

    return { component: componentData };
  } catch (error) {
    console.error('Error loading component data:', error);
    return { error: error, component: null };
  }
};
