"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (term: string, selectedTags: string[]) => void;
  availableTags: string[];
}

const SearchBar = ({ onSearch, availableTags }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newSelectedTags);
    onSearch(searchTerm, newSelectedTags);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value, selectedTags);
  };

  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search Blogs..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded-lg"
      />
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTags.includes(tag)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
