// app/blogs/page.tsx
import BlogLayout from "@/components/BlogLayout";
import BlogList from "@/components/BlogList";
import { getBlogPosts } from "@/lib/getBlogPosts";

export const revalidate = 3600; // Revalidate every hour

export default function BlogsPage() {
  const blogs = getBlogPosts();

  return (
    <BlogLayout>
      <h2 className="text-2xl font-bold mb-4">All Blog Posts</h2>
      <BlogList initialBlogs={blogs} />
    </BlogLayout>
  );
}