import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import BlogLayout from "@/components/BlogLayout";
import LatexRenderer from "@/components/LatexRenderer";

type Props = {
  params: {
    slug: any;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "src/blogRead");
  const files = fs.readdirSync(blogDir);

  return files.map((filename) => ({
    slug: filename.replace(".mdx", "").replace(".tex", ""),
  }));
}

export default async function BlogPost({ params }: any) {
  const { slug } = params;
  const blogDir = path.join(process.cwd(), "src/blogRead");
  const mdxFilePath = path.join(blogDir, `${slug}.mdx`);
  const latexFilePath = path.join(blogDir, `${slug}.tex`);

  let content: string;
  let frontmatter: { [key: string]: any };
  let isMdx = true;

  try {
    if (fs.existsSync(mdxFilePath)) {
      const fileContents = fs.readFileSync(mdxFilePath, "utf8");
      const { content: mdxContent, data } = matter(fileContents);
      content = mdxContent;
      frontmatter = data;
    } else if (fs.existsSync(latexFilePath)) {
      const fileContents = fs.readFileSync(latexFilePath, "utf8");
      const { content: latexContent, data } = matter(fileContents);
      content = latexContent;
      frontmatter = data;
      isMdx = false;
    } else {
      console.error(`No file found for slug: ${slug}`);
      console.error(`Tried paths: ${mdxFilePath} and ${latexFilePath}`);
      return <div>Blog post not found</div>;
    }

    return (
      <BlogLayout>
        <article>
          <h1 className="text-3xl font-bold mb-4">{frontmatter.title}</h1>
          <p className="text-gray-500 mb-4">{frontmatter.date}</p>
          {isMdx ? (
            <MDXRemote
              source={content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkMath],
                  rehypePlugins: [rehypeKatex],
                },
              }}
            />
          ) : (
            <div className="katex-typography">
              <LatexRenderer content={content} />
            </div>
          )}
        </article>
      </BlogLayout>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    return <div>Error loading blog post</div>;
  }
}
