"use client";
import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { BlogPost } from "@/lib/getBlogPosts";

interface BlogListProps {
  initialBlogs: BlogPost[];
}

export default function BlogList({ initialBlogs }: BlogListProps) {
  const [filteredBlogs, setFilteredBlogs] = useState(initialBlogs);
  const allTags = Array.from(
    new Set(initialBlogs.flatMap((blog) => blog.tags))
  ).sort();

  const handleSearch = (searchTerm: string, selectedTags: string[]) => {
    const filtered = initialBlogs.filter((blog) => {
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => blog.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
    setFilteredBlogs(filtered);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} availableTags={allTags} />
      <ul className="space-y-4">
        {filteredBlogs.map((blog) => (
          <li key={blog.slug} className="border-b pb-4">
            <Link
              href={`/blogs/${blog.slug}`}
              className="text-xl font-semibold text-blue-500 hover:underline block"
            >
              {blog.title}
            </Link>
            <span className="text-gray-500 text-sm">{blog.date}</span>
            {blog.tags.length > 0 && (
              <div className="mt-2 flex gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
