import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { topic, user, category } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/topics/[id] - Fetch a single topic by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: topicId } = await params;

    // Fetch the topic with author and category information
    const topics = await db
      .select({
        id: topic.id,
        title: topic.title,
        content: topic.content,
        authorId: topic.authorId,
        authorName: user.name,
        authorImage: user.image,
        categoryId: topic.categoryId,
        categoryName: category.name,
        categoryColor: category.color,
        upvotes: topic.upvotes,
        downvotes: topic.downvotes,
        commentCount: topic.commentCount,
        viewCount: topic.viewCount,
        createdAt: topic.createdAt,
      })
      .from(topic)
      .leftJoin(user, eq(topic.authorId, user.id))
      .leftJoin(category, eq(topic.categoryId, category.id))
      .where(eq(topic.id, topicId));

    if (topics.length === 0) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    return NextResponse.json(topics[0]);
  } catch (error) {
    console.error('Error fetching topic:', error);
    return NextResponse.json({ error: 'Failed to fetch topic' }, { status: 500 });
  }
}
