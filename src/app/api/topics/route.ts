import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';

// GET /api/topics - Fetch all topics (now fetching from post table)
export async function GET(request: NextRequest) {
  try {
    // Use raw SQL query to work with the new post table structure
    const query = sql`
        SELECT 
          p.id,
          p.title,
          p.content,
          p.author_id as "authorId",
          u.name as "authorName",
          u.image as "authorImage",
          p.post_type as "postType",
          p.priority_level as "priorityLevel",
          p.governance_level as "governanceLevel",
          p.status,
          p.location,
          p.deadline,
          p.official_response as "officialResponse",
          p.upvotes,
          p.downvotes,
          p.comment_count as "commentCount",
          p.view_count as "viewCount",
          p.created_at as "createdAt"
        FROM post p
        LEFT JOIN "user" u ON p.author_id = u.id
        ORDER BY p.created_at DESC
      `;

    const topics = await db.execute(query);

    return NextResponse.json(topics.rows);
  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 });
  }
}// POST /api/topics - Create a new topic (now creates a post)
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
      postType = 'suggestion',
      priorityLevel = 'medium',
      governanceLevel = 'national',
      location = null 
    } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Use the authenticated user's ID
    const userId = session.user.id;
    const postId = crypto.randomUUID();

    // Create the post using raw SQL for the political post table
    await db.execute(sql`
      INSERT INTO post (
        id, title, content, author_id, 
        post_type, priority_level, governance_level, status, location,
        deadline, official_response, upvotes, downvotes, comment_count, view_count, 
        created_at, updated_at
      ) VALUES (
        ${postId}, ${title}, ${content}, ${userId},
        ${postType}, ${priorityLevel}, ${governanceLevel}, 'open', ${location},
        NULL, NULL, 0, 0, 0, 0, 
        ${new Date().toISOString()}, ${new Date().toISOString()}
      )
    `);

    return NextResponse.json({ 
      id: postId,
      title,
      content,
      authorId: userId,
      postType,
      priorityLevel,
      governanceLevel,
      status: 'open',
      location,
      upvotes: 0,
      downvotes: 0,
      commentCount: 0,
      viewCount: 0,
      createdAt: new Date().toISOString()
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating topic:', error);
    return NextResponse.json({ error: 'Failed to create topic' }, { status: 500 });
  }
}
