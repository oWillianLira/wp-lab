/**
 * WordPress Project Template Setup & Environment Generator Script
 *
 * Usage: node setup.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

const ROOT_DIR = process.cwd();

// Helper to generate random security salts
function generateSalt(length = 64) {
  return crypto
    .randomBytes(length)
    .toString('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, length);
}

// Helper to recursively find files with specific extensions
function getFilesRecursively(dirPath, extensions, fileList = []) {
  if (!fs.existsSync(dirPath)) return fileList;
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== 'vendor' && file !== '.git') {
        getFilesRecursively(filePath, extensions, fileList);
      }
    } else {
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext) || extensions.includes(file)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

// Helper to replace contents in a file
function replaceInFile(filePath, searchRegex, replacement) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = content.replace(searchRegex, replacement);
  fs.writeFileSync(filePath, updatedContent, 'utf8');
}

async function runSetup() {
  console.log('\n==================================================');
  console.log('      WordPress Project Template Setup Tool       ');
  console.log('==================================================\n');

  // Detect current theme directory
  const themesDir = path.join(ROOT_DIR, 'wordpress', 'wp-content', 'themes');
  let currentThemeFolder = 'owl-core-concept';

  if (fs.existsSync(themesDir)) {
    const folders = fs.readdirSync(themesDir).filter((f) => {
      return (
        fs.statSync(path.join(themesDir, f)).isDirectory() &&
        f !== 'twentytwentyfour' &&
        f !== 'twentytwentythree'
      );
    });
    if (folders.length > 0) {
      currentThemeFolder = folders[0];
    }
  }

  const projectName = await askQuestion(
    'Enter New Project Name (e.g., Amazing Store): ',
  );
  if (!projectName.trim()) {
    console.error('Project Name cannot be empty.');
    rl.close();
    return;
  }

  const defaultSlug =
    projectName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-') + '-owl';

  const themeSlug =
    (await askQuestion(`Theme Slug / Folder Name [default: ${defaultSlug}]: `)) ||
    defaultSlug;

  const defaultPrefix = 'owlcc';
  const codePrefix =
    (await askQuestion(
      `PHP/CSS Function & Class Prefix [default: ${defaultPrefix}]: `,
    )) || defaultPrefix;

  const dbName = `wp_${themeSlug.replace(/-/g, '_')}`;

  console.log('\n--- Configuration Summary ---');
  console.log(`Project Name  : ${projectName}`);
  console.log(`Current Theme : ${currentThemeFolder}`);
  console.log(`New Theme Slug: ${themeSlug}`);
  console.log(`Code Prefix   : ${codePrefix}`);
  console.log(`Database Name : ${dbName}`);

  const confirm = await askQuestion('\nProceed with setup? (y/N): ');
  if (confirm.toLowerCase() !== 'y') {
    console.log('Setup cancelled.');
    rl.close();
    return;
  }

  // 1. Setup .env file
  console.log('\n[1/6] Managing .env environment file...');
  const envPath = path.join(ROOT_DIR, '.env');
  const envExamplePath = path.join(ROOT_DIR, '.env.example');

  if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('Created .env file from .env.example template.');
  }

  if (fs.existsSync(envPath)) {
    replaceInFile(envPath, /WORDPRESS_DB_NAME=.*/g, `WORDPRESS_DB_NAME=${dbName}`);
    replaceInFile(
      envPath,
      /COMPOSE_PROJECT_NAME=.*/g,
      `COMPOSE_PROJECT_NAME=${themeSlug}`,
    );

    // Generate fresh WP security keys/salts inside .env
    const salts = [
      'WP_AUTH_KEY',
      'WP_SECURE_AUTH_KEY',
      'WP_LOGGED_IN_KEY',
      'WP_NONCE_KEY',
      'WP_AUTH_SALT',
      'WP_SECURE_AUTH_SALT',
      'WP_LOGGED_IN_SALT',
      'WP_NONCE_SALT',
    ];

    salts.forEach((salt) => {
      const saltRegex = new RegExp(`${salt}=.*`, 'g');
      const randomVal = generateSalt(64);
      if (fs.readFileSync(envPath, 'utf8').includes(`${salt}=`)) {
        replaceInFile(envPath, saltRegex, `${salt}='${randomVal}'`);
      } else {
        fs.appendFileSync(envPath, `\n${salt}='${randomVal}'`);
      }
    });
    console.log('Generated fresh WordPress security keys (salts) in .env.');
  }

  // 2. Rename theme directory
  console.log('\n[2/6] Renaming theme directory...');
  const oldThemePath = path.join(themesDir, currentThemeFolder);
  const newThemePath = path.join(themesDir, themeSlug);

  if (fs.existsSync(oldThemePath) && oldThemePath !== newThemePath) {
    fs.renameSync(oldThemePath, newThemePath);
    console.log(
      `Renamed theme folder from "${currentThemeFolder}" to "${themeSlug}".`,
    );
  }

  // 3. Update theme & template files
  console.log('\n[3/6] Updating text domain, prefixes, and titles in files...');
  const targetExtensions = [
    '.php',
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.json',
    '.scss',
    '.css',
    '.md',
  ];
  const themeFiles = getFilesRecursively(newThemePath, targetExtensions);
  const rootMarkdownFiles = getFilesRecursively(ROOT_DIR, ['.md']);

  const allFilesToProcess = Array.from(
    new Set([...themeFiles, ...rootMarkdownFiles]),
  );

  allFilesToProcess.forEach((file) => {
    // Replace theme folder / text-domain
    replaceInFile(file, new RegExp(currentThemeFolder, 'g'), themeSlug);
    // Replace static default project title
    replaceInFile(file, /Core Concept/g, projectName);
    // Replace default prefix (owlcc) with new prefix
    if (codePrefix !== 'owlcc') {
      replaceInFile(file, /owlcc/g, codePrefix);
      replaceInFile(file, /OWLCC/g, codePrefix.toUpperCase());
    }
  });

  // Update style.css headers
  const styleCssPath = path.join(newThemePath, 'style.css');
  if (fs.existsSync(styleCssPath)) {
    replaceInFile(styleCssPath, /Theme Name:\s*.*/i, `Theme Name: ${projectName}`);
    replaceInFile(styleCssPath, /Text Domain:\s*.*/i, `Text Domain: ${themeSlug}`);
  }

  // 4. Update docker-compose
  console.log('\n[4/6] Updating docker-compose configuration...');
  const dockerComposePath = path.join(ROOT_DIR, 'docker-compose.yml');
  if (fs.existsSync(dockerComposePath)) {
    replaceInFile(dockerComposePath, new RegExp(currentThemeFolder, 'g'), themeSlug);
  }

  // 5. Update package.json files
  console.log('\n[5/6] Updating package.json configuration files...');
  const rootPackagePath = path.join(ROOT_DIR, 'package.json');
  if (fs.existsSync(rootPackagePath)) {
    replaceInFile(rootPackagePath, /"name":\s*".*?"/, `"name": "${themeSlug}-root"`);
    // Update theme path in root npm scripts
    replaceInFile(rootPackagePath, new RegExp(currentThemeFolder, 'g'), themeSlug);
  }

  const themePackagePath = path.join(newThemePath, 'package.json');
  if (fs.existsSync(themePackagePath)) {
    replaceInFile(themePackagePath, /"name":\s*".*?"/, `"name": "${themeSlug}"`);
  }

  console.log('\n[6/6] Setup completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Start your Docker environment: docker compose up -d');
  console.log('2. Access WordPress in your browser to complete installation.');
  console.log('==================================================\n');

  rl.close();
}

runSetup().catch((err) => {
  console.error('Error during setup execution:', err);
  rl.close();
});
