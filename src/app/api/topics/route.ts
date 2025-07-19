import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { topic, user, category } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '@/lib/auth';

// GET /api/topics - Fetch all topics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category');
    
    // Build the base query
    const baseQuery = db
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
      .orderBy(desc(topic.createdAt));

    // Add category filter if provided
    const topics = categoryId
      ? await baseQuery.where(eq(topic.categoryId, categoryId))
      : await baseQuery;

    return NextResponse.json(topics);
  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 });
  }
}

// POST /api/topics - Create a new topic
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
    const { title, content, categoryId } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    // Use the authenticated user's ID
    const userId = session.user.id;

    // Create the topic
    const newTopic = await db.insert(topic).values({
      id: crypto.randomUUID(),
      title,
      content,
      authorId: userId,
      categoryId: categoryId || null,
      upvotes: 0,
      downvotes: 0,
      commentCount: 0,
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    return NextResponse.json(newTopic[0], { status: 201 });
  } catch (error) {
    console.error('Error creating topic:', error);
    return NextResponse.json({ error: 'Failed to create topic' }, { status: 500 });
  }
}
