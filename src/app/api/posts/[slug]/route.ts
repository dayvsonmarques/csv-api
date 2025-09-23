import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = await params;
    
    const post = await prisma.blogPost.findUnique({
      where: {
        slug: slug,
        published: true
      }
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Parse tags JSON string back to array
    const postWithParsedTags = {
      ...post,
      tags: post.tags ? JSON.parse(post.tags) : [],
      date: post.createdAt.toISOString().split('T')[0]
    };

    return NextResponse.json(postWithParsedTags);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}