import { readdirSync, statSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { writeFileSync } from 'fs';

// Define the path to your components folder
const componentsDir = resolve('src/lib/components');

// Function to recursively fetch directory contents
const getDirectoryContents = (dir) => {
  return readdirSync(dir).map((entry) => {
    const entryPath = resolve(dir, entry);
    const isDirectory = statSync(entryPath).isDirectory();

    return {
      name: entry, // Name of the file or folder
      type: isDirectory ? 'folder' : 'file',
      ...(isDirectory
        ? { contents: getDirectoryContents(entryPath) } // Recursively fetch subdirectory contents
        : { fileContent: readFileSync(entryPath, 'utf-8') }), // Read file content for files
    };
  });
};

// Generate the metadata
const componentsMetadata = getDirectoryContents(componentsDir);

// Save the metadata as a JSON file
const outputPath = resolve('src/lib/components.json');
writeFileSync(outputPath, JSON.stringify(componentsMetadata, null, 2));

console.log(`Components metadata generated: ${outputPath}`);
