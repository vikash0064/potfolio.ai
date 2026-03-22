import fs from 'fs';

function repl(file, search, replaceStr) {
  let c = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, c.replace(search, replaceStr));
}

repl('src/components/home/SkillsSection.tsx', /import\s+\{\s*Skill\s*\}\s+from\s+['"].*?['"];?/, "import type { Skill } from '@/data/skills';");
repl('src/components/projects/ProjectGrid.tsx', /import\s+\{\s*Project\s*\}\s+from\s+['"].*?['"];?/, "import type { Project } from '@/data/projects';");
repl('src/components/projects/ProjectCard.tsx', /import\s+\{\s*Project\s*\}\s+from\s+['"].*?['"];?/, "import type { Project } from '@/data/projects';");
repl('src/components/blogs/BlogCard.tsx', /import\s+\{\s*Blog\s*\}\s+from\s+['"].*?['"];?/, "import type { Blog } from '@/lib/mock-actions';");
repl('src/components/blogs/BlogsList.tsx', /import\s+\{\s*Blog\s*\}\s+from\s+['"].*?['"];?/, "import type { Blog } from '@/lib/mock-actions';");
