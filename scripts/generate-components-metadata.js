import { readdirSync, statSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { writeFileSync } from 'fs';

// Define the path to your components folder
const componentsDir = resolve('src/lib/components');

// Function to recursively fetch directory contents, excluding files in the top-level directory
const getDirectoryContents = (dir, isTopLevel = true) => {
  return readdirSync(dir).map((entry) => {
    const entryPath = resolve(dir, entry);
    const isDirectory = statSync(entryPath).isDirectory();

    if (isDirectory) {
      return {
        name: entry, // Name of the folder
        type: 'folder',
        contents: getDirectoryContents(entryPath, false) // Recursively fetch subdirectory contents
      };
    }

    // Skip files if in the top-level directory
    return isTopLevel ? null : { name: entry, type: 'file', fileContent: readFileSync(entryPath, 'utf-8') };
  }).filter(entry => entry !== null); // Filter out null entries
};

// Generate the metadata
const componentsMetadata = getDirectoryContents(componentsDir);

// Save the metadata as a JSON file
const outputPath = resolve('src/lib/metadata/components.json');
writeFileSync(outputPath, JSON.stringify(componentsMetadata, null, 2));

console.log(`Components metadata generated: ${outputPath}`);
