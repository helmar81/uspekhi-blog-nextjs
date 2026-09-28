// src/lib/getKnowledgeContext.ts
import fs from 'fs';
import path from 'path';

export function getKnowledgeContext(): string {
  // Directories containing markdown files based on your structure
  const directoriesToRead = [
    path.join(process.cwd(), 'posts'),
    path.join(process.cwd(), 'src/app/about'),
    path.join(process.cwd(), 'src/app/portfolio'),
  ];

  let combinedContent = '';

  directoriesToRead.forEach((dir) => {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const filePath = path.join(dir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        combinedContent += `\n--- Document: ${file} ---\n${fileContent}\n`;
      }
    });
  });

  return combinedContent;
}