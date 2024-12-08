import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import BlogLayout from "@/components/BlogLayout";
import LatexRenderer from "@/components/LatexRenderer";

type Params = {
  slug: string;
};

type Props = {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams(): Promise<Params[]> {
  const blogDir = path.join(process.cwd(), "blogs");
  const files = fs.readdirSync(blogDir);

  return files.map((filename) => ({
    slug: filename.replace(".mdx", "").replace(".tex", ""),
  }));
}

export default async function BlogPost( params: any ) {
  const blogDir = path.join(process.cwd(), "blogs");
  const mdxFilePath = path.join(blogDir, `${params.slug}.mdx`);
  const latexFilePath = path.join(blogDir, `${params.slug}.tex`);

  let content: string;
  let frontmatter: { [key: string]: any };
  let isMdx = true;

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
    return <div>Blog post not found</div>;
  }

  return (
    <BlogLayout>
      <article>
        <h1>{frontmatter.title}</h1>
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
}
