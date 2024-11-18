import { octokit } from '$site/server/octokit.js';

export const load = async ({ params }) => {
  const owner = 'x33025'; // Your GitHub username
  const repo = 'svelte-ui'; // The repository name
  const sha = params.sha; // Get the SHA from the route parameters
  const path = `src/lib/components/${sha}`; // Construct the dynamic path

  try {
    // Fetch the contents of the specified path using the SHA
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: sha, // Use the SHA to fetch the specific state
    });

    // Ensure response.data is an array before processing
    if (Array.isArray(response.data)) {
      const componentModule = response.data.map((item: any) => ({
        name: item.name,
        type: item.type,
        path: item.path,
      }));

      console.log('Fetched component module:', componentModule);
      return { componentModule };
    }
  } catch (error) {
    console.error('Error fetching component content:', (error as Error).message);
    // Return a serializable error message
    return { error: (error as Error).message, componentModule: [] };
  }

  return { componentModule: [] };
};
