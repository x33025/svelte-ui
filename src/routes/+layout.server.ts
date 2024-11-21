import { octokit } from '$site/server/octokit.js';

export const load = async () => {
  const owner = 'x33025'; // Your GitHub username
  const repo = 'svelte-ui'; // The repository name
  const path = 'src/lib/components'; // The directory path inside the repo

  try {
    // Fetch the contents of the specified path
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    // Ensure response.data is an array before filtering
    if (Array.isArray(response.data)) {
      const components = response.data.filter((item: any) => item.type === 'dir');
   //   console.log('Fetched component folders:', components.map((component: any) => ({ name: component.name, sha: component.sha }))); // Log the folder names and SHA
      return { components };
    }
  } catch (error) {
    console.error('Error fetching component folders:', error);
    return { error: error, components: [] };
  }

  return { components: [] };
};
