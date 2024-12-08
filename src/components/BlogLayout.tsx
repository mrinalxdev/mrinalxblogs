import Link from 'next/link'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <Link href="/">I do Write ✍️</Link>
        </h1>
        <nav>
          <Link href="/blogs" className="text-blue-500 hover:underline">
            All Blogs
          </Link>
        </nav>
      </header>
      <main className="prose prose-lg prose-blue max-w-none">{children}</main>
    </div>
  )
}