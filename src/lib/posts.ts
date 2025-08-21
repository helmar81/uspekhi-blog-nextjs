import fs from 'fs/promises';
import path from 'path';

type PostMetadata = {
  title: string;
  date: string;
};

type PostData = PostMetadata & {
  slug: string;
  content: string;
};

const postsDirectory = path.join(process.cwd(), 'posts');

async function parseMarkdown(fileName: string): Promise<PostData | null> {
  try {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = await fs.readFile(fullPath, 'utf8');

    const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
    const match = frontmatterRegex.exec(fileContents);
    
    if (!match) {
      console.warn(`Frontmatter not found in ${fileName}`);
      return null;
    }

    const frontmatter = match[1];
    const content = fileContents.slice(match[0].length).trim();

    const metadata: Partial<PostMetadata> = {};
    frontmatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const trimmedKey = key.trim();
        if (trimmedKey === 'title' || trimmedKey === 'date') {
          metadata[trimmedKey as keyof PostMetadata] = valueParts.join(':').trim().replace(/['"]/g, '');
        }
      }
    });

    if (!metadata.title || !metadata.date) {
        console.warn(`Missing title or date in ${fileName}`);
        return null;
    }

    return {
      slug,
      content,
      title: metadata.title,
      date: metadata.date,
    };
  } catch (error) {
    console.error(`Error parsing markdown file ${fileName}:`, error);
    return null;
  }
}

export async function getSortedPostsData() {
    try {
        const fileNames = await fs.readdir(postsDirectory);
        const allPostsDataPromises = fileNames
            .filter(fileName => fileName.endsWith('.md'))
            .map(fileName => parseMarkdown(fileName));

        const allPostsData = (await Promise.all(allPostsDataPromises))
            .filter((post): post is PostData => post !== null);

        return allPostsData.sort((a, b) => {
            if (a.date < b.date) {
                return 1;
            } else {
                return -1;
            }
        });
    } catch (error) {
        console.error("Could not read posts directory:", error);
        return [];
    }
}

export async function getAllPostSlugs() {
  try {
    const fileNames = await fs.readdir(postsDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        return {
          slug: fileName.replace(/\.md$/, ''),
        };
      });
  } catch (error) {
    console.error("Could not read posts directory for slugs:", error);
    return [];
  }
}

export async function getPostData(slug: string): Promise<PostData | null> {
  const fileName = `${slug}.md`;
  return parseMarkdown(fileName);
}
