import { logger } from '@elizaos/core';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Recursively gets all files in a directory with the given extension
 *
 * @param {string} dir - Directory to search
 * @param {string[]} extensions - File extensions to look for
 * @returns {string[]} - Array of file paths
 */
export function getFilesRecursively(dir: string, extensions: string[]): string[] {
  try {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });

    const files = dirents
      .filter((dirent) => !dirent.isDirectory())
      .filter((dirent) => extensions.some((ext) => dirent.name.endsWith(ext)))
      .map((dirent) => path.join(dir, dirent.name));

    const folders = dirents
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => path.join(dir, dirent.name));

    const subFiles = folders.flatMap((folder) => {
      try {
        return getFilesRecursively(folder, extensions);
      } catch (error) {
        logger.warn(`Error accessing folder ${folder}:`, error);
        return [];
      }
    });

    return [...files, ...subFiles];
  } catch (error) {
    logger.warn(`Error reading directory ${dir}:`, error);
    return [];
  }
}

/**
 * Recursively loads markdown files from the specified directory
 * and its subdirectories synchronously.
 *
 * @param {string} directoryPath - The path to the directory containing markdown files
 * @param {string[]} extensions - File extensions to look for (defaults to .md, .mdx)
 * @param {string} docType - Type of documentation for prefixing
 * @returns {string[]} - Array of strings containing file contents with relative paths
 */
export function loadDocumentation(
  directoryPath: string,
  extensions: string[] = ['.md', '.mdx'],
  docType: string = 'Documentation'
): string[] {
  try {
    const basePath = path.resolve(directoryPath);
    if (!fs.existsSync(basePath)) {
      logger.warn(`${docType} directory not found:`, basePath);
      return [];
    }

    const files = getFilesRecursively(basePath, extensions);

    return files.map((filePath) => {
      try {
        const relativePath = path.relative(basePath, filePath);
        const content = fs.readFileSync(filePath, 'utf-8');

        // Extract metadata from the content
        let enhancedContent = content;
        let title = '';

        // Try to extract title from markdown
        const titleMatch = content.match(/^#\s+(.+?)\n/m);
        if (titleMatch && titleMatch[1]) {
          title = titleMatch[1].trim();
        } else {
          // If no title found, use the filename without extension
          title = path.basename(filePath, path.extname(filePath));
        }

        // Add structured metadata
        return `${docType} Path: ${relativePath}
Title: ${title}

${enhancedContent}`;
      } catch (error) {
        logger.warn(`Error reading ${docType.toLowerCase()} file ${filePath}:`, error);
        return `${docType} Path: ${path.relative(basePath, filePath)}

Error reading file: ${error}`;
      }
    });
  } catch (error) {
    logger.error(`Error loading ${docType.toLowerCase()}:`, error);
    return [];
  }
}

/**
 * Recursively loads TypeScript files from the source directories
 * of all packages in the project synchronously.
 *
 * @param {string} packagesDir - The path to the packages directory
 * @returns {string[]} - Array of strings containing file contents with relative paths
 */
export function loadSourceCode(packagesDir: string): string[] {
  try {
    const basePath = path.resolve(packagesDir);
    // Get all package directories
    const packages = fs
      .readdirSync(basePath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => path.join(basePath, dirent.name));

    // Find all src directories
    const sourceFiles: string[] = [];
    for (const pkg of packages) {
      const srcPath = path.join(pkg, 'src');
      if (fs.existsSync(srcPath)) {
        const files = getFilesRecursively(srcPath, ['.ts', '.tsx']);
        sourceFiles.push(...files);
      }
    }

    return sourceFiles.map((filePath) => {
      try {
        const relativePath = path.relative(basePath, filePath);
        const content = fs.readFileSync(filePath, 'utf-8');
        return `Source Code Path: ${relativePath}

${content}`;
      } catch (error) {
        logger.warn(`Error reading source file ${filePath}:`, error);
        return `Source Code Path: ${path.relative(basePath, filePath)}

Error reading file: ${error}`;
      }
    });
  } catch (error) {
    logger.error('Error loading source code:', error);
    return [];
  }
}

/**
 * Load API documentation from source files
 *
 * @param {string} apiDocsPath - Path to API documentation
 * @returns {string[]} - Array of API documentation strings
 */
export function loadApiDocumentation(apiDocsPath: string): string[] {
  const docs = loadDocumentation(apiDocsPath, ['.md', '.mdx', '.json'], 'API Documentation');

  // Process API docs to extract more structured information
  return docs.map((doc) => {
    // Check if this is a REST API doc
    if (doc.includes('.api.mdx') || doc.includes('/rest/')) {
      try {
        // Extract endpoint information if available
        const endpointMatch = doc.match(/\bPATH\b[\s\S]*?`([^`]+)`/i);
        const methodMatch = doc.match(/\bMETHOD\b[\s\S]*?`([^`]+)`/i);

        if (endpointMatch || methodMatch) {
          const endpoint = endpointMatch ? endpointMatch[1] : 'Unknown endpoint';
          const method = methodMatch ? methodMatch[1] : 'Unknown method';

          // Add structured API information
          return `${doc}\n\nAPI Endpoint: ${method} ${endpoint}`;
        }
      } catch (error) {
        logger.warn('Error processing API doc:', error);
      }
    }

    return doc;
  });
}

/**
 * Load CLI documentation from source files
 *
 * @param {string} cliDocsPath - Path to CLI documentation
 * @returns {string[]} - Array of CLI documentation strings
 */
export function loadCliDocumentation(cliDocsPath: string): string[] {
  const docs = loadDocumentation(
    path.join(cliDocsPath, 'docs'),
    ['.md', '.mdx'],
    'CLI Documentation'
  );

  // Process CLI docs to extract more structured information
  return docs.map((doc) => {
    try {
      // Extract command syntax if available
      const commandMatch = doc.match(/```(?:bash|sh)\s*\n([^\n]+)/i);

      if (commandMatch && commandMatch[1]) {
        const command = commandMatch[1].trim();

        // Add structured CLI information
        return `${doc}\n\nCLI Command: ${command}`;
      }

      // Try to extract command from headers
      const headerMatch = doc.match(/^##\s+`([^`]+)`/m);
      if (headerMatch && headerMatch[1]) {
        const command = headerMatch[1].trim();

        // Add structured CLI information
        return `${doc}\n\nCLI Command: ${command}`;
      }
    } catch (error) {
      logger.warn('Error processing CLI doc:', error);
    }

    return doc;
  });
}
