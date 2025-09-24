import { notFound } from 'next/navigation';
import { getBlogPost } from '@/lib/blog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogImageParallax from '@/components/BlogImageParallax';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <BlogImageParallax src={post.image} alt={post.title} />
      <main className="max-w-4xl mx-auto px-6 py-12 mt-20">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white">{post.title}</li>
          </ol>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-roboto">
            {post.title}
          </h1>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            <span>{post.date}</span>
            {post.author && (
              <>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div className="text-lg leading-relaxed text-gray-900 dark:text-white font-roboto">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-5">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar ao Blog
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
