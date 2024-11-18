import { octokit } from '$site/server/octokit.js';

export const load = async ({ params }) => {
  const owner = 'x33025'; // Your GitHub username
  const repo = 'svelte-ui'; // The repository name
  const name = params.name; // Capture the component name from the route parameters
  const path = `src/lib/components/${name}`; // Use the component name to construct the path

  try {
    // Fetch the contents of the specified path
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    // Check if the response is a single file or a directory
    if (Array.isArray(response.data)) {
      // If it's a directory, process each item
      const componentModule = response.data.map((item: any) => ({
        sha: item.sha, // Capture the SHA from the response
        name: item.name,
        type: item.type,
        path: item.path,
      }));

      console.log('Fetched component module:', componentModule);
      return { componentModule };
    } else {
      // If it's a single file, process it directly
      const componentModule = {
        sha: response.data.sha, // Capture the SHA from the response
        name: response.data.name,
        type: response.data.type,
        path: response.data.path,
      };

      console.log('Fetched component module:', componentModule);
      return { componentModule: [componentModule] };
    }
  } catch (error) {
    console.error('Error fetching component content:', (error as Error).message);
    // Return a serializable error message
    return { error: (error as Error).message, componentModule: [] };
  }

  return { componentModule: [] };
};
