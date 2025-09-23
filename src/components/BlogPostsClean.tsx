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

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'acelerando-o-portfolio-nextjs-com-ia',
    title: 'Acelerando o portfólio Next.js com IA',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    date: '2025-01-14',
    excerpt: 'Como o Copilot acelerou o desenvolvimento do portfólio Next.js com sugestões inteligentes e integração fluida.',
    content: 'Durante o desenvolvimento deste portfólio, o GitHub Copilot foi essencial para gerar componentes como Footer, Header e About. Ele sugeriu soluções para problemas de duplicidade, erros de JSX e até para estilização avançada com Tailwind CSS.',
    tags: ['Next.js', 'IA', 'Tailwind'],
    author: 'Dayvson Marques',
  },
  {
    id: 2,
    slug: 'refatoracao-inteligente-erros-comuns-e-solucoes',
    title: 'Refatoração inteligente: erros comuns e soluções',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    date: '2025-01-13',
    excerpt: 'Veja como o Copilot ajudou a identificar e corrigir duplicidades e erros de sintaxe em componentes React.',
    content: 'Ao longo do projeto, enfrentei problemas de duplicidade e erros de JSX, especialmente no Footer. O Copilot sugeriu patches para remover imports duplicados, corrigir tags e garantir um componente limpo.',
    tags: ['Refatoração', 'Erros', 'Copilot'],
    author: 'Dayvson Marques',
  },
  {
    id: 3,
    slug: 'tailwind-na-pratica-dicas-de-estilizacao-moderna',
    title: 'Tailwind na prática: dicas de estilização moderna',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    date: '2025-01-12',
    excerpt: 'Copilot sugeriu classes Tailwind para gradientes, responsividade e animações, tornando o visual moderno e fluido.',
    content: 'A estilização do Footer e outros componentes foi facilitada pelo Copilot, que sugeriu classes Tailwind para gradientes, espaçamentos e animações.',
    tags: ['Tailwind', 'CSS', 'Design'],
    author: 'Dayvson Marques',
  },
];

export default function BlogPosts() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Blog Posts
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
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
              {post.tags && (
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