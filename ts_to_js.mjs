// script.mjs
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const srcDir = './src';

// First, we create an isolated tsconfig to transpile the code
const tempTsConfig = {
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Node",
    "jsx": "preserve", // Emit .jsx files with preserved JSX
    "allowJs": true,
    "outDir": "./src-js",
    "rootDir": "./src",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "strict": false
  },
  "include": ["src/**/*"]
};

fs.writeFileSync('tsconfig.js.json', JSON.stringify(tempTsConfig, null, 2));

console.log('Running tsc to strip types...');
try {
  // Use tsc to compile src to src-js
  execSync('npx tsc -p tsconfig.js.json', { stdio: 'inherit' });
} catch (e) {
  console.log('Errors ignored during tsc');
}

// Now replace src with src-js
fs.rmSync(srcDir, { recursive: true, force: true });
fs.renameSync('./src-js', srcDir);

// Now update vite.config, package.json scripts
let viteConfig = fs.readFileSync('vite.config.ts', 'utf-8');
fs.writeFileSync('vite.config.js', viteConfig);
fs.rmSync('vite.config.ts');

// Also need to rename index.html references from src/main.tsx to src/main.jsx
let indexHtml = fs.readFileSync('index.html', 'utf-8');
indexHtml = indexHtml.replace('src/main.tsx', 'src/main.jsx');
fs.writeFileSync('index.html', indexHtml);

// Remove TS configs
if (fs.existsSync('tsconfig.json')) fs.rmSync('tsconfig.json');
if (fs.existsSync('tsconfig.node.json')) fs.rmSync('tsconfig.node.json');
if (fs.existsSync('tsconfig.app.json')) fs.rmSync('tsconfig.app.json');
if (fs.existsSync('tsconfig.js.json')) fs.rmSync('tsconfig.js.json');

console.log('Converted TypeScript to JavaScript');
