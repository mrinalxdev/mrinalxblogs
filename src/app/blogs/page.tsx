import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import BlogLayout from "@/components/BlogLayout";

export default function BlogsPage() {
  const blogDir = path.join(process.cwd(), "blogs");
  const files = fs.readdirSync(blogDir);

  const blogs = files.map((filename) => {
    const filePath = path.join(blogDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return {
      slug: filename.replace(".mdx", "").replace(".tex", ""),
      title: data.title,
      date: data.date,
      type: filename.endsWith(".mdx") ? "mdx" : "latex",
    };
  });

  blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <BlogLayout>
      <h2 className="text-2xl font-bold mb-4">All Blog Posts</h2>
      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li key={blog.slug}>
            <Link
              href={`/blogs/${blog.slug}`}
              className="text-blue-500 hover:underline"
            >
              {blog.title}
            </Link>
            <span className="text-gray-500 ml-2">({blog.date})</span>
            <span className="text-gray-500 ml-2">[{blog.type}]</span>
          </li>
        ))}
      </ul>
    </BlogLayout>
  );
}
