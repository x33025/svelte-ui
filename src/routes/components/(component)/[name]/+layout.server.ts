import { octokit } from '$site/server/octokit.js';

type DirectoryContent = {
  sha?: string;
  name: string;
  type: string;
  path: string;
  contents?: DirectoryContent[];
};

export const load = async ({ params }) => {
  const owner = 'x33025'; // Your GitHub username
  const repo = 'svelte-ui'; // The repository name
  const name = params.name; // Capture the component name from the route parameters
  const path = `src/lib/components/${name}`; // Use the component name to construct the path

  const fetchDirectoryContents = async (path: string): Promise<DirectoryContent[]> => {
    try {
      const response = await octokit.repos.getContent({
        owner,
        repo,
        path,
      });

      if (Array.isArray(response.data)) {
        // If it's a directory, recursively fetch each item
        const directoryContents = await Promise.all(
          response.data.map(async (item: any) => {
            if (item.type === 'dir') {
              // Recursively fetch subdirectory contents
              return {
                name: item.name,
                type: item.type,
                path: item.path,
                contents: await fetchDirectoryContents(item.path),
              };
            } else {
              // Return file details
              return {
                sha: item.sha,
                name: item.name,
                type: item.type,
                path: item.path,
              };
            }
          })
        );
        return directoryContents;
      } else {
        // If it's a single file, return it directly
        return [{
          sha: response.data.sha,
          name: response.data.name,
          type: response.data.type,
          path: response.data.path,
        }];
      }
    } catch (error) {
      console.error('Error fetching component content:', (error as Error).message);
      return [];
    }
  };

  const componentFiles = await fetchDirectoryContents(path);
  return { componentFiles };
};
