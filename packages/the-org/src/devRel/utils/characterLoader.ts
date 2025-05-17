import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadDocumentation, loadSourceCode } from './fileUtils';
import { loadApiDocumentation, loadCliDocumentation } from './fileUtils';
import { logger } from '@elizaos/core';
import { OFFICIAL_DOCS } from '../config/documentationConfig';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Recursively gets all files in a directory with the given extension
 *
 * @param {string} dir - Directory to search
 * @param {string[]} extensions - File extensions to look for
 * @returns {string[]} - Array of file paths
 */
function getFilesRecursively(dir: string, extensions: string[]): string[] {
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
 * Loads documentation from markdown files
 *
 * @param {string} directoryPath - The path to the directory containing markdown files
 * @returns {string[]} - Array of strings containing file contents with relative paths
 */
function loadMarkdownDocs(directoryPath: string): string[] {
  try {
    console.log(`Loading markdown docs from: ${directoryPath}`);
    const basePath = path.resolve(directoryPath);
    const files = getFilesRecursively(basePath, ['.md']);
    console.log(`Found ${files.length} markdown files in ${directoryPath}`);

    return files.map((filePath) => {
      try {
        const relativePath = path.relative(basePath, filePath);
        const content = fs.readFileSync(filePath, 'utf-8');
        return `Path: ${relativePath}\n\n${content}`;
      } catch (error) {
        logger.warn(`Error reading file ${filePath}:`, error);
        return `Path: ${path.relative(basePath, filePath)}\n\nError reading file: ${error}`;
      }
    });
  } catch (error) {
    console.error('Error loading documentation:', error);
    return [];
  }
}

/**
 * Loads the avatar image in base64 format
 *
 * @returns Base64 encoded avatar string
 */
export function loadAvatar(): string {
  const imagePath = path.resolve(path.join(__dirname, '../assets/portrait.jpg'));

  // Read and convert to Base64
  return fs.existsSync(imagePath)
    ? `data:image/jpeg;base64,${fs.readFileSync(imagePath).toString('base64')}`
    : '';
}

/**
 * Loads knowledge base data from configured sources
 *
 * @returns Array of knowledge base content
 */
export function loadKnowledgeBase(): string[] {
  const knowledge: string[] = [];

  // Add documentation URLs to knowledge base as high-priority items
  knowledge.push(
    `Official Documentation: The ElizaOS documentation is available at ${OFFICIAL_DOCS.main}`
  );
  knowledge.push(
    `API Documentation: API reference documentation can be found at ${OFFICIAL_DOCS.api}`
  );
  knowledge.push(
    `CLI Documentation: Command-line interface documentation is at ${OFFICIAL_DOCS.cli}`
  );
  knowledge.push(`Source Code: ElizaOS source code is available at ${OFFICIAL_DOCS.github}`);

  // Set environment variable
  process.env.DEVREL_IMPORT_KNOWLEDGE = 'true';
  process.env.ENABLE_SOURCE_CODE_KNOWLEDGE = 'true';

  // Try multiple potential doc locations
  const possibleDocPaths = [
    path.resolve(path.join(__dirname, '../../docs/docs')), // Look in the sibling 'docs' folder in devRel
    // path.resolve(path.join(__dirname, '../../../../docs')), // Project root docs
    // path.resolve(path.join(__dirname, '../../../..')), // Project root
    // path.resolve('./docs'), // Relative to CWD
    // path.resolve(process.cwd()), // Current working directory
  ];

  // Find first existing docs path
  let docsPath = null;
  for (const potentialPath of possibleDocPaths) {
    console.log(`Checking for docs in: ${potentialPath}`);
    if (fs.existsSync(potentialPath)) {
      docsPath = potentialPath;
      console.log(`Found docs directory at: ${docsPath}`);
      break;
    }
  }

  if (docsPath) {
    console.log('Loading documentation...');
    const docKnowledge = loadMarkdownDocs(docsPath);
    knowledge.push(...docKnowledge);
    console.log(`Loaded ${docKnowledge.length} documentation files into knowledge base`);
  } else {
    console.warn('Documentation directory not found in any expected location');
  }

  // // Find the packages directory for source code
  // let packagesPath = '';
  // const possiblePackagesPaths = [
  //   path.resolve(path.join(__dirname, '../../..')), // From utils dir, up three levels
  //   path.resolve(path.join(__dirname, '../../../..')), // From utils dir, up four levels
  //   path.resolve(process.cwd()), // Try current working directory
  // ];

  // for (const potentialPath of possiblePackagesPaths) {
  //   if (fs.existsSync(path.join(potentialPath, 'packages'))) {
  //     packagesPath = path.join(potentialPath, 'packages');
  //     console.log(`Found packages directory at: ${packagesPath}`);
  //     break;
  //   }
  // }

  // // If we didn't find a packages dir yet, try the alt method
  // if (!packagesPath) {
  //   for (const potentialPath of possiblePackagesPaths) {
  //     if (
  //       fs.existsSync(potentialPath) &&
  //       fs
  //         .readdirSync(potentialPath, { withFileTypes: true })
  //         .some(
  //           (dirent) =>
  //             dirent.isDirectory() && fs.existsSync(path.join(potentialPath, dirent.name, 'src'))
  //         )
  //     ) {
  //       packagesPath = potentialPath; // This is already a packages directory
  //       console.log(`Found packages directory (with src subdirs) at: ${packagesPath}`);
  //       break;
  //     }
  //   }
  // }

  // if (packagesPath) {
  //   console.log('Loading source code...');
  //   try {
  //     // Get all package directories
  //     const packages = fs
  //       .readdirSync(packagesPath, { withFileTypes: true })
  //       .filter((dirent) => dirent.isDirectory())
  //       .map((dirent) => path.join(packagesPath, dirent.name));

  //     console.log(`Found ${packages.length} packages:`, packages);

  //     // Find all source files in src directories
  //     const sourceFiles: string[] = [];
  //     for (const pkg of packages) {
  //       const srcPath = path.join(pkg, 'src');
  //       if (fs.existsSync(srcPath)) {
  //         console.log(`Processing source files in: ${srcPath}`);
  //         const files = getFilesRecursively(srcPath, ['.ts', '.tsx']);
  //         console.log(`Found ${files.length} files in ${srcPath}`);
  //         sourceFiles.push(...files);
  //       }
  //     }

  //     // Format the source files with path and content
  //     const sourceKnowledge = sourceFiles.map((filePath) => {
  //       try {
  //         const relativePath = path.relative(packagesPath, filePath);
  //         const content = fs.readFileSync(filePath, 'utf-8');
  //         return `Path: ${relativePath}\n\n${content}`;
  //       } catch (error) {
  //         logger.warn(`Error reading file ${filePath}:`, error);
  //         return `Path: ${path.relative(packagesPath, filePath)}\n\nError reading file: ${error}`;
  //       }
  //     });

  //     knowledge.push(...sourceKnowledge);
  //     console.log(`Loaded ${sourceKnowledge.length} source files into knowledge base`);
  //   } catch (error) {
  //     console.error('Error loading source code:', error);
  //   }
  // } else {
  //   console.warn('Packages directory not found in any expected location');
  // }

  return knowledge;
}
