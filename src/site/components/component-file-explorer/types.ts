

export type DirectoryContent = {
    name: string;
    type: 'file' | 'folder';
    contents?: DirectoryContent[]; // For folders: nested directory contents
    fileContent?: string; // For files: actual file content
  };