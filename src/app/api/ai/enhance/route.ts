import { NextRequest, NextResponse } from 'next/server';
import { GeminiService } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { title, content, category, action } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    let result;
    
    switch (action) {
      case 'enhance':
        result = await GeminiService.generateTopicDescription(title, content || '', category || 'General');
        return NextResponse.json({ enhancedContent: result });
        
      case 'suggestions':
        if (!content) {
          return NextResponse.json(
            { error: 'Content is required for suggestions' },
            { status: 400 }
          );
        }
        result = await GeminiService.generateTopicSuggestions(title, content);
        return NextResponse.json({ suggestions: result });
        
      default:
        return NextResponse.json(
          { error: 'Invalid action. Use "enhance" or "suggestions"' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in Gemini AI route:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    );
  }
}
