import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { comment, topic, user } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { headers } from 'next/headers';

// GET /api/topics/[id]/comments - Fetch comments for a topic
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const topicId = resolvedParams.id;

    // Fetch comments with author information
    const comments = await db
      .select({
        id: comment.id,
        content: comment.content,
        authorId: comment.authorId,
        authorName: user.name,
        authorImage: user.image,
        upvotes: comment.upvotes,
        downvotes: comment.downvotes,
        createdAt: comment.createdAt,
        parentId: comment.parentId,
      })
      .from(comment)
      .leftJoin(user, eq(comment.authorId, user.id))
      .where(eq(comment.topicId, topicId))
      .orderBy(desc(comment.createdAt));

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// POST /api/topics/[id]/comments - Create a new comment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const topicId = resolvedParams.id;

    // Get the session from headers (simplified auth check)
    const headersList = await headers();
    const cookieHeader = headersList.get('cookie');
    
    if (!cookieHeader || !cookieHeader.includes('better-auth.session_token')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { content } = body;

    if (!content || !content.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // For now, use a placeholder user ID - in production, get this from the session
    const userId = 'FhFGmmmN8QkGsnDk7wSBhN3Fl0Q8YhqP'; // Using the existing user ID

    // Create the comment
    const newComment = await db.insert(comment).values({
      id: crypto.randomUUID(),
      content: content.trim(),
      authorId: userId,
      topicId: topicId,
      parentId: null, // For now, no nested comments
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    // Update the topic's comment count
    const currentCommentCount = await db.select({ count: sql<number>`count(*)` })
      .from(comment)
      .where(eq(comment.topicId, topicId));
    
    await db.update(topic)
      .set({ commentCount: currentCommentCount[0].count })
      .where(eq(topic.id, topicId));

    // Fetch the created comment with author information
    const createdComment = await db
      .select({
        id: comment.id,
        content: comment.content,
        authorId: comment.authorId,
        authorName: user.name,
        authorImage: user.image,
        upvotes: comment.upvotes,
        downvotes: comment.downvotes,
        createdAt: comment.createdAt,
        parentId: comment.parentId,
      })
      .from(comment)
      .leftJoin(user, eq(comment.authorId, user.id))
      .where(eq(comment.id, newComment[0].id))
      .limit(1);

    return NextResponse.json(createdComment[0], { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
