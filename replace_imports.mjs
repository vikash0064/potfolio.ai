import fs from 'fs';
import path from 'path';

const srcDir = './src';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const newContent = content
    .replace(/from ['"]@\/app\/.*?['"]/g, "from '@/lib/mock-actions'")
    .replace(/import\(['"]@\/app\/.*?['"]\)/g, "import('@/lib/mock-actions')");
    
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

walkDir(srcDir);
console.log('Imports replaced');
