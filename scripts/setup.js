#!/usr/bin/env node

import { input, select, confirm, checkbox } from '@inquirer/prompts';
import { existsSync, mkdirSync, writeFileSync, readFileSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';
import validatePackageName from 'validate-npm-package-name';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templatePath = join(__dirname, '..');
const projectName = process.argv[2];
const targetPath = process.argv[3];

if (!projectName || !targetPath) {
  console.log('Usage: node setup.js <project-name> <target-path>');
  process.exit(1);
}

console.log(chalk.cyan(`
┌─────────────────────────────────────┐
│        CrispyGoat Template Setup    │
│                                     │
│     Let's set up your project!     │
│      (This will take ~2 minutes)   │
└─────────────────────────────────────┘
`));

async function validateProjectName(name) {
  const validation = validatePackageName(name);
  if (!validation.validForNewPackages) {
    return validation.errors?.[0] || validation.warnings?.[0] || 'Invalid package name';
  }
  return true;
}

async function validateColorHex(color) {
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hexPattern.test(color)) {
    return 'Please enter a valid hex color (e.g., #3B82F6)';
  }
  return true;
}

async function collectProjectInfo() {
  console.log(chalk.yellow('\n📋 1. PROJECT BASICS'));
  
  const projectInfo = {
    name: await input({
      message: 'Project name:',
      default: projectName,
      validate: validateProjectName
    }),
    
    description: await input({
      message: 'Project description:',
      default: 'A modern web application built with CrispyGoat template'
    }),
    
    author: await input({
      message: 'Author name:',
      default: 'Your Name'
    })
  };

  console.log(chalk.gray(`
   ✓ Project name: ${projectInfo.name}
   ✓ Description: ${projectInfo.description}
   ✓ Author: ${projectInfo.author}
  `));

  const confirmBasics = await confirm({
    message: 'Does this look correct?',
    default: true
  });

  if (!confirmBasics) {
    console.log(chalk.yellow('Let\'s try again...\n'));
    return await collectProjectInfo();
  }

  return projectInfo;
}

async function collectTechStack() {
  console.log(chalk.yellow('\n⚙️  2. TECH STACK'));
  
  const framework = await select({
    message: 'Choose your framework:',
    choices: [
      { name: 'Astro (recommended for performance)', value: 'astro' },
      { name: 'Next.js (for complex apps)', value: 'nextjs' },
      { name: 'Nuxt.js (Vue-based)', value: 'nuxt' }
    ],
    default: 'astro'
  });

  const database = await select({
    message: 'Choose your database:',
    choices: [
      { name: 'PostgreSQL + Drizzle ORM (recommended)', value: 'postgresql' },
      { name: 'SQLite + Drizzle ORM (for simple apps)', value: 'sqlite' },
      { name: 'MongoDB + Mongoose', value: 'mongodb' }
    ],
    default: 'postgresql'
  });

  const cms = await select({
    message: 'Choose your CMS:',
    choices: [
      { name: 'Strapi (WordPress-like interface)', value: 'strapi' },
      { name: 'Payload (developer-focused)', value: 'payload' },
      { name: 'Sanity (real-time collaboration)', value: 'sanity' },
      { name: 'No CMS', value: 'none' }
    ],
    default: 'strapi'
  });

  const techStack = { framework, database, cms };

  console.log(chalk.gray(`
   ✓ Framework: ${framework}
   ✓ Database: ${database}
   ✓ CMS: ${cms}
  `));

  const confirmTech = await confirm({
    message: 'Does this look correct?',
    default: true
  });

  if (!confirmTech) {
    console.log(chalk.yellow('Let\'s try again...\n'));
    return await collectTechStack();
  }

  return techStack;
}

async function collectTheme() {
  console.log(chalk.yellow('\n🎨 3. DESIGN THEME'));
  console.log(chalk.gray('Visit https://coolors.co to generate a 5-color palette'));
  
  const theme = {
    primary: await input({
      message: 'Primary color (hex):',
      default: '#3B82F6',
      validate: validateColorHex
    }),
    
    secondary: await input({
      message: 'Secondary color (hex):',
      default: '#10B981',
      validate: validateColorHex
    }),
    
    accent: await input({
      message: 'Accent color (hex):',
      default: '#F59E0B',
      validate: validateColorHex
    }),
    
    background: await input({
      message: 'Background color (hex):',
      default: '#F8FAFC',
      validate: validateColorHex
    }),
    
    text: await input({
      message: 'Text color (hex):',
      default: '#1F2937',
      validate: validateColorHex
    })
  };

  console.log(chalk.gray(`
   ✓ Primary: ${theme.primary}
   ✓ Secondary: ${theme.secondary}
   ✓ Accent: ${theme.accent}
   ✓ Background: ${theme.background}
   ✓ Text: ${theme.text}
  `));

  const confirmTheme = await confirm({
    message: 'Does this look correct?',
    default: true
  });

  if (!confirmTheme) {
    console.log(chalk.yellow('Let\'s try again...\n'));
    return await collectTheme();
  }

  return theme;
}

async function collectFeatures() {
  console.log(chalk.yellow('\n🚀 4. FEATURES'));
  
  const features = await checkbox({
    message: 'Select features to include:',
    choices: [
      { name: 'Authentication (Auth.js)', value: 'auth', checked: true },
      { name: 'Auto-documentation (TypeDoc)', value: 'docs', checked: true },
      { name: 'Contact forms', value: 'contact', checked: true },
      { name: 'Blog/News section', value: 'blog', checked: true },
      { name: 'E-commerce (basic)', value: 'ecommerce', checked: false },
      { name: 'SEO optimization', value: 'seo', checked: true },
      { name: 'PWA support', value: 'pwa', checked: false }
    ]
  });

  console.log(chalk.gray(`
   ✓ Selected features: ${features.join(', ')}
  `));

  const confirmFeatures = await confirm({
    message: 'Does this look correct?',
    default: true
  });

  if (!confirmFeatures) {
    console.log(chalk.yellow('Let\'s try again...\n'));
    return await collectFeatures();
  }

  return features;
}

async function collectDeployment() {
  console.log(chalk.yellow('\n☁️  5. DEPLOYMENT'));
  
  const hosting = await select({
    message: 'Choose hosting platform:',
    choices: [
      { name: 'Vercel (recommended)', value: 'vercel' },
      { name: 'Netlify', value: 'netlify' },
      { name: 'AWS', value: 'aws' },
      { name: 'Self-hosted', value: 'self' }
    ],
    default: 'vercel'
  });

  const dbHosting = await select({
    message: 'Choose database hosting:',
    choices: [
      { name: 'Supabase (PostgreSQL)', value: 'supabase' },
      { name: 'PlanetScale (MySQL)', value: 'planetscale' },
      { name: 'Railway', value: 'railway' },
      { name: 'Self-hosted', value: 'self' }
    ],
    default: 'supabase'
  });

  const deployment = { hosting, dbHosting };

  console.log(chalk.gray(`
   ✓ Hosting: ${hosting}
   ✓ Database: ${dbHosting}
  `));

  const confirmDeployment = await confirm({
    message: 'Does this look correct?',
    default: true
  });

  if (!confirmDeployment) {
    console.log(chalk.yellow('Let\'s try again...\n'));
    return await collectDeployment();
  }

  return deployment;
}

async function showSummary(config) {
  console.log(chalk.cyan(`
═══════════════════════════════════════
📋 SETUP SUMMARY
═══════════════════════════════════════`));
  
  console.log(chalk.white(`Project: ${config.project.name}`));
  console.log(chalk.white(`Stack: ${config.techStack.framework} + ${config.techStack.database} + ${config.techStack.cms}`));
  console.log(chalk.white(`Theme: ${config.theme.primary} primary, ${config.theme.secondary} secondary`));
  console.log(chalk.white(`Features: ${config.features.join(', ')}`));
  console.log(chalk.white(`Deployment: ${config.deployment.hosting} + ${config.deployment.dbHosting}`));

  const finalConfirm = await confirm({
    message: chalk.cyan('\n🔍 Final check - Is everything correct?'),
    default: true
  });

  if (!finalConfirm) {
    console.log(chalk.yellow('Let\'s start over...\n'));
    return false;
  }

  return true;
}

async function generateProject(config) {
  const spinner = ora('Customizing project configuration...').start();
  
  try {
    spinner.text = 'Updating package.json...';
    
    // Update package.json
    const packageJsonPath = join(targetPath, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = config.project.name;
    packageJson.description = config.project.description;
    packageJson.author = config.project.author;
    // Remove the bin field since this is now a project, not a template
    delete packageJson.bin;
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    
    spinner.text = 'Generating theme configuration...';
    
    // Generate theme configuration
    const themeConfig = `export const theme = ${JSON.stringify(config.theme, null, 2)};`;
    writeFileSync(join(targetPath, 'src', 'theme.ts'), themeConfig);
    
    // Generate project config
    const projectConfig = `export const config = ${JSON.stringify(config, null, 2)};`;
    writeFileSync(join(targetPath, 'src', 'config.ts'), projectConfig);
    
    spinner.text = 'Initializing git repository...';
    
    // Initialize new git repository
    const gitInit = spawn('git', ['init'], {
      cwd: targetPath,
      stdio: 'ignore'
    });
    
    await new Promise((resolve) => {
      gitInit.on('close', resolve);
    });
    
    // Create initial commit
    const gitAdd = spawn('git', ['add', '.'], {
      cwd: targetPath,
      stdio: 'ignore'
    });
    
    await new Promise((resolve) => {
      gitAdd.on('close', resolve);
    });
    
    const gitCommit = spawn('git', ['commit', '-m', 'Initial commit from CrispyGoat template'], {
      cwd: targetPath,
      stdio: 'ignore'
    });
    
    await new Promise((resolve) => {
      gitCommit.on('close', resolve);
    });
    
    spinner.succeed('Project created successfully!');
    
    console.log(chalk.green(`
✅ ${config.project.name} is ready!

📁 Project structure:
   ${targetPath}/
   ├── src/              (Astro frontend)
   ├── cms/              (Strapi CMS)
   ├── docs/             (Documentation)
   └── scripts/          (Setup tools)

🚀 Next steps:
   cd ${config.project.name}
   npm install
   npm run dev

📖 Documentation:
   npm run docs:serve
   
🎨 CMS Admin:
   npm run cms:dev
   
📋 Git repository initialized with initial commit
   
Need help? Check docs/claude-resources.md
`));
    
  } catch (error) {
    spinner.fail('Failed to create project');
    console.error(chalk.red(error.message));
    process.exit(1);
  }
}

async function main() {
  try {
    const projectInfo = await collectProjectInfo();
    const techStack = await collectTechStack();
    const theme = await collectTheme();
    const features = await collectFeatures();
    const deployment = await collectDeployment();
    
    const config = {
      project: projectInfo,
      techStack,
      theme,
      features,
      deployment
    };
    
    const confirmed = await showSummary(config);
    if (!confirmed) {
      return main();
    }
    
    await generateProject(config);
    
  } catch (error) {
    if (error.message === 'User force closed the prompt with 0 null') {
      console.log(chalk.yellow('\n👋 Setup cancelled by user'));
      process.exit(0);
    }
    console.error(chalk.red('Setup failed:'), error.message);
    process.exit(1);
  }
}

main();