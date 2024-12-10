import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from 'react';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  type: "mdx" | "latex";
  tags: string[];
}

export const getBlogPosts = cache((): BlogPost[] => {
  try {
    const blogDir = path.join(process.cwd(), "src/blogRead");
    
    // Get all files and filter for .mdx and .tex files
    const files = fs.readdirSync(blogDir)
      .filter(filename => {
        const isFile = fs.statSync(path.join(blogDir, filename)).isFile();
        const hasValidExtension = filename.endsWith('.mdx') || filename.endsWith('.tex');
        return isFile && hasValidExtension;
      });

    console.log('Found blog files:', files); // Debug log

    const blogs = files.map((filename) => {
      const filePath = path.join(blogDir, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      
      const type = filename.endsWith(".mdx") ? "mdx" as const : "latex" as const;
      
      if (!data.title || typeof data.title !== 'string') {
        console.warn(`Blog post ${filename} is missing a title or title is not a string`);
        data.title = 'Untitled Post'; // Provide a default title
      }
      
      if (!data.date || typeof data.date !== 'string') {
        console.warn(`Blog post ${filename} is missing a date or date is not a string`);
        data.date = new Date().toISOString().split('T')[0]; // Provide today's date as default
      }

      const tags = Array.isArray(data.tags) ? data.tags : [];
      return {
        slug: filename.replace(".mdx", "").replace(".tex", ""),
        title: data.title,
        date: data.date,
        type,
        tags: tags.map(tag => String(tag)), // Ensure all tags are strings
      } satisfies BlogPost;
    });

    console.log('Processed blogs:', blogs); // Debug log

    return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
});

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const blogs = getBlogPosts();
    return blogs.find(post => post.slug === slug) ?? null;
  } catch (error) {
    console.error('Error getting blog post:', error);
    return null;
  }
}

export function getAllTags(): string[] {
  const blogs = getBlogPosts();
  const tags = new Set(blogs.flatMap(post => post.tags));
  return Array.from(tags).sort();
}