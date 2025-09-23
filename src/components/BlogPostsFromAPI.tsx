import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  image: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
  author?: string;
};

async function getPosts(limit?: number): Promise<BlogPost[]> {
  try {
    const url = limit 
      ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts?limit=${limit}`
      : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts`;
    
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

interface BlogPostsProps {
  limit?: number;
}

export default async function BlogPosts({ limit }: BlogPostsProps = {}) {
  const posts = await getPosts(limit);

  if (posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Blog Posts
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300">
            Nenhum post encontrado.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Blog Posts
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span>{post.date}</span>
                {post.author && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
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
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Ler mais
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}