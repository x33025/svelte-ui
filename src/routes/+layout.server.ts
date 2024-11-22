import { readdirSync, statSync } from 'fs';
import { resolve } from 'path';

export const load = async () => {
  const componentsDir = resolve('src/lib/components'); // Resolve the path to your components folder

  try {
    // Read the components directory
    const entries = readdirSync(componentsDir);

    // Filter to only include folders
    const components = entries
      .map((entry) => {
        const entryPath = resolve(componentsDir, entry);
        const isDirectory = statSync(entryPath).isDirectory();

        if (isDirectory) {
          return {
            name: entry, // Folder name (component name)
            path: entryPath, // Full path to the folder
          };
        }
      })
      .filter(Boolean); // Remove undefined entries
   
    // Return the components list
    return { components };
  } catch (error) {
    console.error('Error fetching components:', error);
    return { error: error, components: [] };
  }
};
