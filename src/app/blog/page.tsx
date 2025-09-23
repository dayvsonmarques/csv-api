import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPosts from '@/components/BlogPosts';

export const metadata = {
  title: 'Blog | Dayvson Marques',
  description: 'Artigos sobre desenvolvimento web, Next.js, React e tecnologias modernas.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main>
        <BlogPosts />
      </main>
      <Footer />
    </div>
  );
}
