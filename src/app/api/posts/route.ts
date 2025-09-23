import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    
    const posts = await prisma.blogPost.findMany({
      where: {
        published: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit ? parseInt(limit) : undefined,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        image: true,
        author: true,
        tags: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // Parse tags JSON strings back to arrays
    const postsWithParsedTags = posts.map(post => ({
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : [],
      date: post.createdAt.toISOString().split('T')[0] // Format date as YYYY-MM-DD
    }));

    return NextResponse.json(postsWithParsedTags);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, image, author, tags } = body;

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        image,
        author: author || 'Dayvson Marques',
        tags: tags ? JSON.stringify(tags) : null
      }
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}