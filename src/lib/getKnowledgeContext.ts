import fs from 'fs';
import path from 'path';

export function getKnowledgeContext(): string {
  const contentDir = path.join(process.cwd(), 'src/content');
  let combinedContent = '';

  function readDirectoryRecursively(dir: string) {
    try {
      if (!fs.existsSync(dir)) return;

      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          readDirectoryRecursively(fullPath);
        } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
          const fileContent = fs.readFileSync(fullPath, 'utf-8');
          combinedContent += `\n--- Document: ${entry.name} ---\n${fileContent}\n`;
        }
      }
    } catch (e) {
      console.warn('Skipping knowledge dir:', dir, e);
    }
  }

  readDirectoryRecursively(contentDir);
  return combinedContent;
}