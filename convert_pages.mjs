import fs from 'fs';
import path from 'path';

const srcAppDir = '../Next-Portfolio/src/app';
const destPagesDir = './src/pages';

function toCamelCase(str) {
  return str.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
    .replace('-', '')
    .replace('_', ''));
}

function processFile(filePath, basePath) {
  const relativePath = path.relative(basePath, filePath);
  let pagePath = relativePath.replace(/\\/g, '/');
  
  // Remove (public), (dashboard) etc
  pagePath = pagePath.replace(/\([^/]+\)\//g, '');
  
  const destPath = path.join(destPagesDir, pagePath);
  const destDir = path.dirname(destPath);
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove next specific imports
  content = content.replace(/import \{.*?\} from 'next\/(server|navigation|headers|cache|image|link)';?\n?/g, (match, lib) => {
      // we already replaced next/link and next/image with @/components/...
      return '';
  });

  // Remove export metadata
  content = content.replace(/export const metadata.*?=(?:.|\n)*?};\n?/g, '');

  content = content.replace(/import \{ notFound \} from "next\/navigation";/g, 'const notFound = () => {};\n');
  content = content.replace(/import Link from ["']next\/link["'];?/g, "import Link from '@/components/ui/NextLink';");
  content = content.replace(/import Image from ["']next\/image["'];?/g, "import Image from '@/components/ui/NextImage';");

  const newFileName = path.basename(destPath).replace('.tsx', '.tsx'); // keep page.tsx name to easily find them 
  
  fs.writeFileSync(path.join(destDir, newFileName), content);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file === 'page.tsx') {
      processFile(fullPath, srcAppDir);
    }
  }
}

// Clean up
if (fs.existsSync(destPagesDir)) {
    fs.rmSync(destPagesDir, {recursive: true, force: true});
}
walkDir(srcAppDir);

console.log('Conversion script run');
