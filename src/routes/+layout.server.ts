import components from '$lib/metadata/components.json'; // Import the pre-generated JSON file
import colors from '$lib/metadata/colors.json'; // Import the pre-generated JSON file

export const load = async () => {
  try {
    // Fetch the package information from the npm registry
    const response = await fetch('https://registry.npmjs.org/@x33025/svelte-ui');
    const packageData = await response.json();

    // Get the latest version
    const latestVersion = packageData['dist-tags'].latest;

    // Return the components list and the package version
    return { components, colors, latestVersion };
  } catch (error) {
    console.error('Error loading components metadata or package version:', error);
    return { error: error, components: [], latestVersion: null };
  }
};
