import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { post, user } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';

// GET /api/posts/[id] - Fetch a specific post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const postId = resolvedParams.id;

    const postData = await db
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
        updatedAt: post.updatedAt,
      })
      .from(post)
      .leftJoin(user, eq(post.authorId, user.id))
      .where(eq(post.id, postId))
      .limit(1);

    if (postData.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Increment view count
    await db
      .update(post)
      .set({ 
        viewCount: postData[0].viewCount + 1,
        updatedAt: new Date()
      })
      .where(eq(post.id, postId));

    return NextResponse.json(postData[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT /api/posts/[id] - Update a post
export async function PUT(
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

    // Check if post exists and user owns it
    const existingPost = await db
      .select({ authorId: post.authorId })
      .from(post)
      .where(eq(post.id, postId))
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (existingPost[0].authorId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Update the post
    const updateData: Record<string, unknown> = {
      updatedAt: new Date()
    };

    // Allow updating specific fields
    if (body.title) updateData.title = body.title;
    if (body.content) updateData.content = body.content;
    if (body.priorityLevel) updateData.priorityLevel = body.priorityLevel;
    if (body.location !== undefined) updateData.location = body.location;
    if (body.deadline !== undefined) updateData.deadline = body.deadline ? new Date(body.deadline) : null;

    // Only allow status updates by authorized users (for now, post owner)
    if (body.status) updateData.status = body.status;
    if (body.officialResponse !== undefined) updateData.officialResponse = body.officialResponse;

    const updatedPost = await db
      .update(post)
      .set(updateData)
      .where(eq(post.id, postId))
      .returning();

    return NextResponse.json(updatedPost[0]);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE /api/posts/[id] - Delete a post
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

    // Check if post exists and user owns it
    const existingPost = await db
      .select({ authorId: post.authorId })
      .from(post)
      .where(eq(post.id, postId))
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (existingPost[0].authorId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Delete the post (this will cascade to comments, votes, etc.)
    await db.delete(post).where(eq(post.id, postId));

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
