/**
 * Project Setup & Renaming Script for WordPress Starter Template
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
const BASE_THEME_SLUG = 'owl-core-concept';
const BASE_CODE_PREFIX = 'owlcc';

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

// Generate random 64-character secret salt
function generateSalt() {
  return crypto.randomBytes(32).toString('hex');
}

// Ensure .env exists (copy from .env.example if missing) and populate keys/salts
function setupEnvFile(dbName, composeName) {
  const envPath = path.join(ROOT_DIR, '.env');
  const envExamplePath = path.join(ROOT_DIR, '.env.example');

  if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('Created .env from .env.example template.');
  }

  if (fs.existsSync(envPath)) {
    replaceInFile(envPath, /WORDPRESS_DB_NAME=.*/g, `WORDPRESS_DB_NAME=${dbName}`);
    replaceInFile(envPath, /COMPOSE_PROJECT_NAME=.*/g, `COMPOSE_PROJECT_NAME=${composeName}`);

    // Replace default salt placeholders with secure random strings
    const saltKeys = [
      'WP_AUTH_KEY',
      'WP_SECURE_AUTH_KEY',
      'WP_LOGGED_IN_KEY',
      'WP_NONCE_KEY',
      'WP_AUTH_SALT',
      'WP_SECURE_AUTH_SALT',
      'WP_LOGGED_IN_SALT',
      'WP_NONCE_SALT',
    ];

    saltKeys.forEach((key) => {
      const regex = new RegExp(`${key}=.*`, 'g');
      replaceInFile(envPath, regex, `${key}='${generateSalt()}'`);
    });

    console.log('Generated secure random WordPress Auth Keys & Salts in .env.');
  }
}

async function runSetup() {
  console.log('\n==================================================');
  console.log('      WordPress Project Template Setup Tool       ');
  console.log('==================================================\n');

  // Verify that the base theme directory exists
  const themesDir = path.join(ROOT_DIR, 'wordpress', 'wp-content', 'themes');
  const targetThemePath = path.join(themesDir, BASE_THEME_SLUG);

  if (!fs.existsSync(targetThemePath)) {
    console.error(`\n[ERROR] Base theme "${BASE_THEME_SLUG}" was not found in "wordpress/wp-content/themes/".`);
    console.error(`This setup script is designed to run exclusively from the "${BASE_THEME_SLUG}" starter template.\n`);
    rl.close();
    process.exit(1);
  }

  const currentThemeFolder = BASE_THEME_SLUG;

  // Prompt for new project details
  const projectName = await askQuestion('Enter New Project Name (e.g., Acme Store): ');
  if (!projectName.trim()) {
    console.error('\n[ERROR] Project Name cannot be empty.\n');
    rl.close();
    process.exit(1);
  }

  const defaultSlug = projectName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') + '-owl';

  const themeSlugInput = await askQuestion(`Theme Slug / Folder Name [default: ${defaultSlug}]: `);
  const themeSlug = themeSlugInput.trim() || defaultSlug;

  const codePrefixInput = await askQuestion(`PHP/CSS Function & Class Prefix [default: ${BASE_CODE_PREFIX}]: `);
  const codePrefix = codePrefixInput.trim() || BASE_CODE_PREFIX;

  const dbNameInput = await askQuestion(`Database Name [default: wp_${themeSlug.replace(/-/g, '_')}]: `);
  const dbName = dbNameInput.trim() || `wp_${themeSlug.replace(/-/g, '_')}`;

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

  console.log('\n[1/5] Renaming theme directory...');
  const oldThemePath = path.join(themesDir, currentThemeFolder);
  const newThemePath = path.join(themesDir, themeSlug);

  if (fs.existsSync(oldThemePath) && oldThemePath !== newThemePath) {
    fs.renameSync(oldThemePath, newThemePath);
    console.log(`Renamed theme folder from "${currentThemeFolder}" to "${themeSlug}".`);
  }

  console.log('\n[2/5] Updating text-domain and code prefixes in theme files...');
  const targetExtensions = ['.php', '.js', '.jsx', '.ts', '.tsx', '.json', '.scss', '.css', '.md'];
  const themeFiles = getFilesRecursively(newThemePath, targetExtensions);

  // Replace old theme slug
  const themeSlugRegex = new RegExp(currentThemeFolder, 'g');
  // Replace old code prefix (both lowercase and uppercase)
  const codePrefixRegex = new RegExp(BASE_CODE_PREFIX, 'g');
  const codePrefixUpperRegex = new RegExp(BASE_CODE_PREFIX.toUpperCase(), 'g');

  themeFiles.forEach((file) => {
    replaceInFile(file, themeSlugRegex, themeSlug);
    replaceInFile(file, codePrefixRegex, codePrefix);
    replaceInFile(file, codePrefixUpperRegex, codePrefix.toUpperCase());
  });

  // Update style.css headers if present
  const styleCssPath = path.join(newThemePath, 'style.css');
  if (fs.existsSync(styleCssPath)) {
    replaceInFile(styleCssPath, /Theme Name:\s*.*/i, `Theme Name: ${projectName}`);
    replaceInFile(styleCssPath, /Text Domain:\s*.*/i, `Text Domain: ${themeSlug}`);
  }

  console.log('\n[3/5] Setting up environment variables & secrets (.env)...');
  setupEnvFile(dbName, themeSlug);

  console.log('\n[4/5] Updating configuration files (Vite / Docker / Package.json / Readme)...');
  
  // Update Root README.md if present
  const rootReadmePath = path.join(ROOT_DIR, 'README.md');
  if (fs.existsSync(rootReadmePath)) {
    replaceInFile(rootReadmePath, new RegExp(currentThemeFolder, 'g'), themeSlug);
    replaceInFile(rootReadmePath, new RegExp(BASE_CODE_PREFIX, 'g'), codePrefix);
  }

  // Update docker-compose.yml
  const dockerComposePath = path.join(ROOT_DIR, 'docker-compose.yml');
  if (fs.existsSync(dockerComposePath)) {
    replaceInFile(dockerComposePath, new RegExp(currentThemeFolder, 'g'), themeSlug);
  }

  // Update vite.config.js inside theme
  const viteConfigThemePath = path.join(newThemePath, 'vite.config.js');
  if (fs.existsSync(viteConfigThemePath)) {
    replaceInFile(viteConfigThemePath, new RegExp(currentThemeFolder, 'g'), themeSlug);
    replaceInFile(viteConfigThemePath, new RegExp(BASE_CODE_PREFIX, 'g'), codePrefix);
  }

  // Update Root package.json
  const rootPackagePath = path.join(ROOT_DIR, 'package.json');
  if (fs.existsSync(rootPackagePath)) {
    replaceInFile(rootPackagePath, new RegExp(currentThemeFolder, 'g'), themeSlug);
    replaceInFile(rootPackagePath, /"name":\s*".*?"/, `"name": "${themeSlug}-root"`);
  }

  // Update Theme package.json
  const themePackagePath = path.join(newThemePath, 'package.json');
  if (fs.existsSync(themePackagePath)) {
    replaceInFile(themePackagePath, new RegExp(currentThemeFolder, 'g'), themeSlug);
    replaceInFile(themePackagePath, /"name":\s*".*?"/, `"name": "${themeSlug}"`);
  }

  console.log('\n[5/5] Setup completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Start your Docker environment: docker compose up -d');
  console.log(`2. Develop theme assets: npm run dev`);
  console.log('==================================================\n');

  rl.close();
}

runSetup().catch((err) => {
  console.error('Error during setup execution:', err);
  rl.close();
});
