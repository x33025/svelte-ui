import { readdirSync, statSync, readFileSync } from 'fs';
import { resolve } from 'path';

type DirectoryContent = {
  name: string;
  type: 'file' | 'folder';
  path: string;
  contents?: DirectoryContent[]; // For folders: nested directory contents
  fileContent?: string; // For files: actual file content
};

export const load = async ({ params }) => {
  const { name } = params; // Capture the component name from the route parameters
  const basePath = resolve('src/lib/components', name); // Construct the path for the component folder

  const fetchDirectoryContents = (directoryPath: string): DirectoryContent[] => {
    try {
      const entries = readdirSync(directoryPath);

      return entries.map((entry) => {
        const entryPath = resolve(directoryPath, entry);
        const isDirectory = statSync(entryPath).isDirectory();

        if (isDirectory) {
          return {
            name: entry,
            type: 'folder',
            path: entryPath,
            contents: fetchDirectoryContents(entryPath), // Recursively fetch subdirectory contents
          };
        } else {
          return {
            name: entry,
            type: 'file',
            path: entryPath,
            fileContent: readFileSync(entryPath, 'utf-8'), // Read file content
          };
        }
      });

   
    } catch (error) {
      console.error('Error reading directory:', error);
      return [];
    }
  };

  const fileContents = fetchDirectoryContents(basePath);
  return { fileContents };
};
