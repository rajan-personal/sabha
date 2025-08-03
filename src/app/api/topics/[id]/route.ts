import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { post, user } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/topics/[id] - Fetch a single topic by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: topicId } = await params;

    // Fetch the topic with author information
    const topics = await db
      .select({
        id: post.id,
        title: post.title,
        content: post.content,
        authorId: post.authorId,
        authorName: user.name,
        authorImage: user.image,
        postType: post.postType,
        priorityLevel: post.priorityLevel,
        governanceLevel: post.governanceLevel,
        status: post.status,
        location: post.location,
        deadline: post.deadline,
        officialResponse: post.officialResponse,
        upvotes: post.upvotes,
        downvotes: post.downvotes,
        commentCount: post.commentCount,
        viewCount: post.viewCount,
        createdAt: post.createdAt,
      })
      .from(post)
      .leftJoin(user, eq(post.authorId, user.id))
      .where(eq(post.id, topicId));

    if (topics.length === 0) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    return NextResponse.json(topics[0]);
  } catch (error) {
    console.error('Error fetching topic:', error);
    return NextResponse.json({ error: 'Failed to fetch topic' }, { status: 500 });
  }
}
