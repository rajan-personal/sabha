import { NextRequest, NextResponse } from 'next/server';
import { GeminiService } from '@/lib/gemini';
import { db } from '@/db/drizzle';
import { comment, topic } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { action, ...data } = await request.json();

    switch (action) {
      case 'suggestions':
        return await handleCommentSuggestions(data);
      
      case 'enhance':
        return await handleCommentEnhancement(data);
      
      case 'reply-suggestions':
        return await handleReplySuggestions(data);
      
      case 'moderate':
        return await handleCommentModeration(data);
      
      case 'analyze':
        return await handleCommentAnalysis(data);
      
      case 'analyze-discussion':
        return await handleDiscussionAnalysis(data);
      
      default:
        return NextResponse.json(
          { error: 'Invalid action. Use "suggestions", "enhance", "reply-suggestions", "moderate", "analyze", or "analyze-discussion"' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in AI comment route:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}

async function handleCommentSuggestions(data: { topicId: string }) {
  const { topicId } = data;

  if (!topicId) {
    return NextResponse.json(
      { error: 'Topic ID is required' },
      { status: 400 }
    );
  }

  try {
    // Get topic details
    const topicData = await db
      .select({
        title: topic.title,
        content: topic.content,
      })
      .from(topic)
      .where(eq(topic.id, topicId))
      .limit(1);

    if (topicData.length === 0) {
      return NextResponse.json(
        { error: 'Topic not found' },
        { status: 404 }
      );
    }

    // Get existing comments
    const existingComments = await db
      .select({ content: comment.content })
      .from(comment)
      .where(eq(comment.topicId, topicId))
      .limit(5);

    const suggestions = await GeminiService.generateCommentSuggestions(
      topicData[0].title,
      topicData[0].content,
      existingComments.map(c => c.content)
    );

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Error generating comment suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}

async function handleCommentEnhancement(data: { comment: string; topicId: string }) {
  const { comment: commentText, topicId } = data;

  if (!commentText || !topicId) {
    return NextResponse.json(
      { error: 'Comment text and topic ID are required' },
      { status: 400 }
    );
  }

  try {
    // Get topic title for context
    const topicData = await db
      .select({ title: topic.title })
      .from(topic)
      .where(eq(topic.id, topicId))
      .limit(1);

    if (topicData.length === 0) {
      return NextResponse.json(
        { error: 'Topic not found' },
        { status: 404 }
      );
    }

    const enhancedComment = await GeminiService.enhanceComment(
      commentText,
      topicData[0].title
    );

    return NextResponse.json({ enhancedComment });
  } catch (error) {
    console.error('Error enhancing comment:', error);
    return NextResponse.json(
      { error: 'Failed to enhance comment' },
      { status: 500 }
    );
  }
}

async function handleReplySuggestions(data: { commentId: string; topicId: string }) {
  const { commentId, topicId } = data;

  if (!commentId || !topicId) {
    return NextResponse.json(
      { error: 'Comment ID and topic ID are required' },
      { status: 400 }
    );
  }

  try {
    // Get comment content
    const commentData = await db
      .select({ content: comment.content })
      .from(comment)
      .where(eq(comment.id, commentId))
      .limit(1);

    if (commentData.length === 0) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    // Get topic details
    const topicData = await db
      .select({
        title: topic.title,
        content: topic.content,
      })
      .from(topic)
      .where(eq(topic.id, topicId))
      .limit(1);

    if (topicData.length === 0) {
      return NextResponse.json(
        { error: 'Topic not found' },
        { status: 404 }
      );
    }

    const suggestions = await GeminiService.generateReplySuggestions(
      commentData[0].content,
      topicData[0].title,
      topicData[0].content
    );

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Error generating reply suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate reply suggestions' },
      { status: 500 }
    );
  }
}

async function handleCommentAnalysis(data: { comment: string; topicId: string }) {
  const { comment: commentText, topicId } = data;

  if (!commentText || !topicId) {
    return NextResponse.json(
      { error: 'Comment text and topic ID are required' },
      { status: 400 }
    );
  }

  try {
    // Get topic details for context
    const topicData = await db
      .select({
        title: topic.title,
        content: topic.content,
      })
      .from(topic)
      .where(eq(topic.id, topicId))
      .limit(1);

    if (topicData.length === 0) {
      return NextResponse.json(
        { error: 'Topic not found' },
        { status: 404 }
      );
    }

    const analysis = await GeminiService.analyzeComment(
      commentText,
      topicData[0].title,
      topicData[0].content
    );

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing comment:', error);
    return NextResponse.json(
      { error: 'Failed to analyze comment' },
      { status: 500 }
    );
  }
}

async function handleDiscussionAnalysis(data: { topicId: string }) {
  const { topicId } = data;

  if (!topicId) {
    return NextResponse.json(
      { error: 'Topic ID is required' },
      { status: 400 }
    );
  }

  try {
    // Get topic details
    const topicData = await db
      .select({
        title: topic.title,
        content: topic.content,
      })
      .from(topic)
      .where(eq(topic.id, topicId))
      .limit(1);

    if (topicData.length === 0) {
      return NextResponse.json(
        { error: 'Topic not found' },
        { status: 404 }
      );
    }

    // Get comments
    const commentsData = await db
      .select({
        content: comment.content,
        authorName: comment.authorId, // We'd need to join with user table for actual name
        createdAt: comment.createdAt,
      })
      .from(comment)
      .where(eq(comment.topicId, topicId))
      .limit(20);

    const analysis = await GeminiService.analyzeDiscussion(
      topicData[0].title,
      topicData[0].content,
      commentsData.map(c => ({
        content: c.content,
        authorName: c.authorName,
        createdAt: c.createdAt.toISOString()
      }))
    );

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing discussion:', error);
    return NextResponse.json(
      { error: 'Failed to analyze discussion' },
      { status: 500 }
    );
  }
}

async function handleCommentModeration(data: { comment: string }) {
  const { comment: commentText } = data;

  if (!commentText) {
    return NextResponse.json(
      { error: 'Comment text is required' },
      { status: 400 }
    );
  }

  try {
    const moderation = await GeminiService.moderateComment(commentText);
    return NextResponse.json(moderation);
  } catch (error) {
    console.error('Error moderating comment:', error);
    return NextResponse.json(
      { error: 'Failed to moderate comment' },
      { status: 500 }
    );
  }
}
