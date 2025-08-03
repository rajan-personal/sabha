import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { reaction } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';

// GET /api/posts/[id]/reactions - Get reaction summary for a post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const postId = resolvedParams.id;

    // Get reaction counts by type
    const reactionCounts = await db
      .select({
        type: reaction.type,
        count: sql<number>`count(*)`,
      })
      .from(reaction)
      .where(eq(reaction.postId, postId))
      .groupBy(reaction.type);

    // Convert to object format
    const reactionSummary = reactionCounts.reduce((acc, { type, count }) => {
      acc[type] = count;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json(reactionSummary);
  } catch (error) {
    console.error('Error fetching reactions:', error);
    return NextResponse.json({ error: 'Failed to fetch reactions' }, { status: 500 });
  }
}

// POST /api/posts/[id]/reactions - Add or update a reaction
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const postId = resolvedParams.id;
    const body = await request.json();
    const { type } = body;

    if (!type) {
      return NextResponse.json({ error: 'Reaction type is required' }, { status: 400 });
    }

    const validReactionTypes = ['like', 'dislike', 'love', 'angry', 'sad', 'laugh', 'upvote', 'downvote'];
    if (!validReactionTypes.includes(type)) {
      return NextResponse.json({ error: 'Invalid reaction type' }, { status: 400 });
    }

    const userId = session.user.id;

    // Check if user already reacted to this post
    const existingReaction = await db
      .select()
      .from(reaction)
      .where(and(
        eq(reaction.postId, postId),
        eq(reaction.userId, userId)
      ))
      .limit(1);

    if (existingReaction.length > 0) {
      // Update existing reaction if different, or remove if same
      if (existingReaction[0].type === type) {
        // Remove reaction
        await db
          .delete(reaction)
          .where(and(
            eq(reaction.postId, postId),
            eq(reaction.userId, userId)
          ));
        
        return NextResponse.json({ message: 'Reaction removed' });
      } else {
        // Update reaction
        await db
          .update(reaction)
          .set({ 
            type: type as 'like' | 'dislike' | 'love' | 'angry' | 'sad' | 'laugh' | 'upvote' | 'downvote',
            updatedAt: new Date()
          })
          .where(and(
            eq(reaction.postId, postId),
            eq(reaction.userId, userId)
          ));
        
        return NextResponse.json({ message: 'Reaction updated', type });
      }
    } else {
      // Create new reaction
      await db.insert(reaction).values({
        id: crypto.randomUUID(),
        userId,
        postId,
        commentId: null,
        type: type as 'like' | 'dislike' | 'love' | 'angry' | 'sad' | 'laugh' | 'upvote' | 'downvote',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return NextResponse.json({ message: 'Reaction added', type }, { status: 201 });
    }
  } catch (error) {
    console.error('Error managing reaction:', error);
    return NextResponse.json({ error: 'Failed to manage reaction' }, { status: 500 });
  }
}

// DELETE /api/posts/[id]/reactions - Remove user's reaction
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const postId = resolvedParams.id;
    const userId = session.user.id;

    await db
      .delete(reaction)
      .where(and(
        eq(reaction.postId, postId),
        eq(reaction.userId, userId)
      ));

    return NextResponse.json({ message: 'Reaction removed' });
  } catch (error) {
    console.error('Error removing reaction:', error);
    return NextResponse.json({ error: 'Failed to remove reaction' }, { status: 500 });
  }
}
