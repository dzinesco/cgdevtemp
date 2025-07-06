#!/usr/bin/env node

import { existsSync } from 'fs';
import { join } from 'path';
import { spawn } from 'child_process';
import chalk from 'chalk';

const projectName = process.argv[2];

if (!projectName) {
  console.log(chalk.red('❌ Project name is required'));
  console.log(chalk.gray('Usage: npm create crispygoat-app <project-name>'));
  process.exit(1);
}

const targetPath = join(process.cwd(), projectName);

if (existsSync(targetPath)) {
  console.log(chalk.red(`❌ Directory ${projectName} already exists`));
  process.exit(1);
}

console.log(chalk.cyan(`🚀 Creating CrispyGoat app: ${projectName}`));
console.log(chalk.gray('Downloading template from GitHub...'));

// Clone the template repository
const gitClone = spawn('git', [
  'clone',
  'https://github.com/dzinesco/cgdevtemp.git',
  projectName,
  '--depth', '1'
], {
  stdio: 'inherit',
  cwd: process.cwd()
});

gitClone.on('close', (code) => {
  if (code !== 0) {
    console.log(chalk.red(`❌ Failed to download template`));
    process.exit(code);
  }
  
  // Remove .git directory
  const removeGit = spawn('rm', ['-rf', '.git'], {
    cwd: targetPath,
    stdio: 'inherit'
  });
  
  removeGit.on('close', () => {
    // Run the setup script
    const setupScript = join(targetPath, 'scripts', 'setup.js');
    const child = spawn('node', [setupScript, projectName, targetPath], {
      stdio: 'inherit',
      cwd: targetPath
    });

    child.on('close', (setupCode) => {
      if (setupCode !== 0) {
        console.log(chalk.red(`❌ Setup failed with code ${setupCode}`));
        process.exit(setupCode);
      }
      
      console.log(chalk.green(`\n✅ ${projectName} created successfully!`));
      console.log(chalk.cyan(`\nNext steps:`));
      console.log(chalk.white(`  cd ${projectName}`));
      console.log(chalk.white(`  npm install`));
      console.log(chalk.white(`  npm run dev`));
      console.log(chalk.gray(`\n📖 Visit http://localhost:4321 to see your app`));
    });
  });
});