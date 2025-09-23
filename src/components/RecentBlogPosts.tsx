import React from 'react';
import { type BlogPost } from './BlogPosts';
import { getBlogPosts } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';

export default async function RecentBlogPosts() {
  const posts = await getBlogPosts(3); // Busca apenas os 3 mais recentes
  
  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Blog</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Últimas postagens sobre desenvolvimento web, tecnologias modernas e experiências práticas.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map(post => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="block bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform">
              <div className="w-full h-40 relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover rounded-t-lg"
                  priority={true}
                  unoptimized
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Ver todas as postagens
            <svg 
              className="ml-2 w-4 h-4" 
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
      </div>
    </section>
  );
}
