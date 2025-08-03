import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { post, user } from '@/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';

// GET /api/posts - Fetch all posts with political filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postType = searchParams.get('type');
    const priorityLevel = searchParams.get('priority');
    const governanceLevel = searchParams.get('governance');
    const status = searchParams.get('status');
    const location = searchParams.get('location');
    
    // Build the base query
    const baseQuery = db
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
      .orderBy(desc(post.createdAt));

    // Build where conditions
    const conditions = [];
    
    if (postType) {
      conditions.push(eq(post.postType, postType as 'issue' | 'feedback' | 'suggestion'));
    }
    
    if (priorityLevel) {
      conditions.push(eq(post.priorityLevel, priorityLevel as 'low' | 'medium' | 'high'));
    }
    
    if (governanceLevel) {
      conditions.push(eq(post.governanceLevel, governanceLevel as 'national' | 'state' | 'local'));
    }
    
    if (status) {
      conditions.push(eq(post.status, status as 'open' | 'in_review' | 'acknowledged' | 'resolved' | 'rejected'));
    }
    
    if (location) {
      conditions.push(eq(post.location, location));
    }

    // Apply filters if any
    const posts = conditions.length > 0
      ? await baseQuery.where(and(...conditions))
      : await baseQuery;

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST /api/posts - Create a new political post
export async function POST(request: NextRequest) {
  try {
    // Get the session using Better Auth
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      title, 
      content, 
      postType, 
      priorityLevel = 'medium', 
      governanceLevel, 
      location,
      deadline
    } = body;

    // Validation
    if (!title || !content || !postType || !governanceLevel) {
      return NextResponse.json({ 
        error: 'Title, content, post type, and governance level are required' 
      }, { status: 400 });
    }

    if (!['issue', 'feedback', 'suggestion'].includes(postType)) {
      return NextResponse.json({ error: 'Invalid post type' }, { status: 400 });
    }

    if (!['low', 'medium', 'high'].includes(priorityLevel)) {
      return NextResponse.json({ error: 'Invalid priority level' }, { status: 400 });
    }

    if (!['national', 'state', 'local'].includes(governanceLevel)) {
      return NextResponse.json({ error: 'Invalid governance level' }, { status: 400 });
    }

    // For local governance level, location is required
    if (governanceLevel === 'local' && !location) {
      return NextResponse.json({ 
        error: 'Location is required for local governance level posts' 
      }, { status: 400 });
    }

    // Use the authenticated user's ID
    const userId = session.user.id;

    // Create the post
    const newPost = await db.insert(post).values({
      id: crypto.randomUUID(),
      title,
      content,
      authorId: userId,
      postType: postType as 'issue' | 'feedback' | 'suggestion',
      priorityLevel: priorityLevel as 'low' | 'medium' | 'high',
      governanceLevel: governanceLevel as 'national' | 'state' | 'local',
      status: 'open',
      location,
      deadline: deadline ? new Date(deadline) : null,
      officialResponse: null,
      upvotes: 0,
      downvotes: 0,
      commentCount: 0,
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
