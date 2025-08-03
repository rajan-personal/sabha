import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { postTag, officialTag } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

// GET /api/tags - Get tags for a specific post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    // Get tags for the post with official information
    const tags = await db
      .select({
        id: postTag.id,
        postId: postTag.postId,
        officialTagId: postTag.officialTagId,
        customTag: postTag.customTag,
        createdAt: postTag.createdAt,
        // Official information
        officialName: officialTag.name,
        officialTitle: officialTag.title,
        officialOrganization: officialTag.organization,
        officialGovernanceLevel: officialTag.governanceLevel,
        officialLocation: officialTag.location,
        officialTwitterHandle: officialTag.twitterHandle,
        officialIsVerified: officialTag.isVerified,
      })
      .from(postTag)
      .leftJoin(officialTag, eq(postTag.officialTagId, officialTag.id))
      .where(eq(postTag.postId, postId));

    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
  }
}

// POST /api/tags - Add a tag to a post
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { postId, officialTagId, customTag } = body;

    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    if (!officialTagId && !customTag) {
      return NextResponse.json({ 
        error: 'Either official tag ID or custom tag is required' 
      }, { status: 400 });
    }

    // Check if this tag combination already exists for the post
    const existingTag = await db
      .select()
      .from(postTag)
      .where(and(
        eq(postTag.postId, postId),
        officialTagId ? eq(postTag.officialTagId, officialTagId) : eq(postTag.customTag, customTag)
      ))
      .limit(1);

    if (existingTag.length > 0) {
      return NextResponse.json({ error: 'Tag already exists for this post' }, { status: 400 });
    }

    // Create the tag
    const newTag = await db.insert(postTag).values({
      id: crypto.randomUUID(),
      postId,
      officialTagId: officialTagId || null,
      customTag: customTag || null,
      createdAt: new Date(),
    }).returning();

    // Fetch the created tag with official information
    const createdTag = await db
      .select({
        id: postTag.id,
        postId: postTag.postId,
        officialTagId: postTag.officialTagId,
        customTag: postTag.customTag,
        createdAt: postTag.createdAt,
        // Official information
        officialName: officialTag.name,
        officialTitle: officialTag.title,
        officialOrganization: officialTag.organization,
        officialGovernanceLevel: officialTag.governanceLevel,
        officialLocation: officialTag.location,
        officialTwitterHandle: officialTag.twitterHandle,
        officialIsVerified: officialTag.isVerified,
      })
      .from(postTag)
      .leftJoin(officialTag, eq(postTag.officialTagId, officialTag.id))
      .where(eq(postTag.id, newTag[0].id))
      .limit(1);

    return NextResponse.json(createdTag[0], { status: 201 });
  } catch (error) {
    console.error('Error creating tag:', error);
    return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 });
  }
}

// DELETE /api/tags/[id] - Remove a tag from a post
export async function DELETE(
  request: NextRequest
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const tagId = searchParams.get('id');

    if (!tagId) {
      return NextResponse.json({ error: 'Tag ID is required' }, { status: 400 });
    }

    // Remove the tag
    await db.delete(postTag).where(eq(postTag.id, tagId));

    return NextResponse.json({ message: 'Tag removed successfully' });
  } catch (error) {
    console.error('Error removing tag:', error);
    return NextResponse.json({ error: 'Failed to remove tag' }, { status: 500 });
  }
}
