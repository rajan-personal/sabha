import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export class GeminiService {
  private static model = genAI.getGenerativeModel({ 
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash' 
  });

  /**
   * Generate an enhanced description for a topic based on title and initial content
   */
  static async generateTopicDescription(title: string, content: string, category: string): Promise<string> {
    try {
      let prompt;
      
      if (!content || content.trim().length === 0) {
        // Generate content from scratch when no content is provided
        prompt = `
You are an AI assistant for the "Sabha" forum. Generate a precise, engaging description for this topic based on the title and category.

Topic Details:
- Title: "${title}"
- Category: "${category}"

Requirements:
- Generate 2-3 sentences that explain what this topic is about
- Be direct and factual
- Focus on the core issue or question that would be discussed
- Use clear, simple language
- Make it discussion-friendly
- If the title suggests a question, frame it as a discussion starter
- If it's about a problem, explain what the problem is
- Keep it concise but informative

Return only the generated description, nothing else.
`;
      } else {
        // Enhance existing content
        prompt = `
You are an AI assistant for the "Sabha" forum. Create a precise, concise description for this topic.

Topic Details:
- Title: "${title}"
- Category: "${category}"
- Content: "${content}"

Requirements:
- Maximum 2-3 sentences
- Be direct and factual
- Focus on the core issue or question
- Remove unnecessary words and filler
- Use clear, simple language
- No marketing language or fluff
- Get straight to the point
- If it's a question, make it clear what's being asked
- If it's a discussion, state the main topic clearly

Return only the enhanced description, nothing else.
`;
      }

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const enhancedContent = response.text();

      return enhancedContent.trim();
    } catch (error) {
      console.error('Error generating content with Gemini:', error);
      // Return original content if AI generation fails, or a fallback message
      return content || 'Failed to generate content. Please try again.';
    }
  }

  /**
   * Generate suggestions for topic improvement
   */
  static async generateTopicSuggestions(title: string, content: string): Promise<string[]> {
    try {
      const prompt = `
Analyze this forum topic and provide 3-4 specific, actionable suggestions to improve it:

Title: "${title}"
Content: "${content}"

Focus on:
- Making the question/topic clearer
- Adding missing context
- Improving structure
- Making it more discussion-friendly

Return suggestions as a JSON array of strings. Each suggestion should be one short, specific sentence starting with an action word (e.g., "Add", "Clarify", "Include", "Specify").
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const suggestions = response.text();

      // Try to parse as JSON, fallback to simple array if it fails
      try {
        return JSON.parse(suggestions);
      } catch {
        // If JSON parsing fails, split by newlines and clean up
        return suggestions
          .split('\n')
          .filter(line => line.trim().length > 0)
          .map(line => line.replace(/^[-*•]\s*/, '').trim())
          .slice(0, 4);
      }
    } catch (error) {
      console.error('Error generating suggestions with Gemini:', error);
      return [];
    }
  }

  /**
   * Generate AI-powered comment suggestions based on topic content
   */
  static async generateCommentSuggestions(title: string, content: string, existingComments: string[] = []): Promise<string[]> {
    try {
      const prompt = `
Generate exactly 3 thoughtful discussion starters or comment suggestions for this forum topic.

Topic Title: "${title}"
Topic Content: "${content}"
${existingComments.length > 0 ? `Existing Comments: ${existingComments.slice(0, 3).join(' | ')}` : ''}

Requirements:
- Generate diverse perspectives or angles
- Ask follow-up questions that deepen the discussion
- Suggest practical examples or experiences
- Be respectful and constructive
- Each suggestion should be 1-2 sentences
- Avoid repeating points from existing comments

IMPORTANT: Return ONLY a valid JSON array with exactly 3 strings. No extra text, no code blocks, no explanations.

Example format: ["First suggestion here", "Second suggestion here", "Third suggestion here"]
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let suggestions = response.text().trim();

      // Clean up common AI response artifacts
      suggestions = suggestions.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
      suggestions = suggestions.replace(/^```\s*/, '').replace(/\s*```$/, '');
      suggestions = suggestions.replace(/^"?json"?\s*/, '');
      suggestions = suggestions.replace(/^\[\s*"/, '["').replace(/"\s*\]$/, '"]');

      try {
        const parsed = JSON.parse(suggestions);
        return Array.isArray(parsed) ? parsed.slice(0, 3) : [parsed].slice(0, 3);
      } catch {
        console.warn('Failed to parse AI suggestions as JSON:', suggestions);
        // Fallback: extract strings from the response
        return suggestions
          .split('\n')
          .filter(line => line.trim().length > 0)
          .map(line => line.replace(/^[-*•"\[\]]\s*/, '').replace(/["\[\],]*$/, '').trim())
          .filter(line => line.length > 0)
          .slice(0, 3);
      }
    } catch (error) {
      console.error('Error generating comment suggestions:', error);
      return [];
    }
  }

  /**
   * Enhance a comment for clarity and constructiveness
   */
  static async enhanceComment(comment: string, topicTitle: string): Promise<string> {
    try {
      const prompt = `
Enhance this forum comment to be more clear, constructive, and well-structured while maintaining the original meaning and tone:

Original Comment: "${comment}"
Topic: "${topicTitle}"

Requirements:
- Fix grammar and spelling
- Improve clarity and flow
- Make it more constructive if needed
- Keep the original sentiment and perspective
- Make it discussion-friendly
- Keep it concise but complete
- Don't change the core message

Return only the enhanced comment, nothing else.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Error enhancing comment:', error);
      return comment; // Return original if enhancement fails
    }
  }

  /**
   * Generate smart reply suggestions for a specific comment
   */
  static async generateReplySuggestions(originalComment: string, topicTitle: string, topicContent: string): Promise<string[]> {
    try {
      const prompt = `
Generate exactly 2-3 thoughtful reply suggestions to this comment in a forum discussion.

Topic: "${topicTitle}"
Topic Content: "${topicContent}"
Comment to Reply to: "${originalComment}"

Requirements:
- Be respectful and constructive
- Add value to the discussion
- Can agree, disagree politely, or ask follow-up questions
- Keep replies concise (1-2 sentences each)
- Make them natural and conversational
- Avoid generic responses

IMPORTANT: Return ONLY a valid JSON array with 2-3 strings. No extra text, no code blocks, no explanations.

Example format: ["First reply here", "Second reply here", "Third reply here"]
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let suggestions = response.text().trim();

      // Clean up common AI response artifacts
      suggestions = suggestions.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
      suggestions = suggestions.replace(/^```\s*/, '').replace(/\s*```$/, '');
      suggestions = suggestions.replace(/^"?json"?\s*/, '');
      suggestions = suggestions.replace(/^\[\s*"/, '["').replace(/"\s*\]$/, '"]');

      try {
        const parsed = JSON.parse(suggestions);
        return Array.isArray(parsed) ? parsed.slice(0, 3) : [parsed].slice(0, 3);
      } catch {
        console.warn('Failed to parse AI reply suggestions as JSON:', suggestions);
        // Fallback: extract strings from the response
        return suggestions
          .split('\n')
          .filter(line => line.trim().length > 0)
          .map(line => line.replace(/^[-*•"\[\]]\s*/, '').replace(/["\[\],]*$/, '').trim())
          .filter(line => line.length > 0)
          .slice(0, 3);
      }
    } catch (error) {
      console.error('Error generating reply suggestions:', error);
      return [];
    }
  }

  /**
   * Moderate a comment for appropriateness
   */
  static async moderateComment(comment: string): Promise<{ isAppropriate: boolean; reason?: string; suggestion?: string }> {
    try {
      const prompt = `
Analyze this forum comment for appropriateness and community guidelines:

Comment: "${comment}"

Check for:
- Respectful language
- No personal attacks or harassment
- No spam or off-topic content
- Constructive contribution to discussion
- No hate speech or discriminatory language

Return a JSON object with:
{
  "isAppropriate": boolean,
  "reason": "brief explanation if inappropriate",
  "suggestion": "suggested improvement if needed"
}
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const moderation = response.text();

      try {
        return JSON.parse(moderation);
      } catch {
        // Fallback: assume appropriate if parsing fails
        return { isAppropriate: true };
      }
    } catch (error) {
      console.error('Error moderating comment:', error);
      return { isAppropriate: true }; // Default to allowing comments if AI fails
    }
  }

  /**
   * Analyze comment for relevance and classification
   */
  static async analyzeComment(
    comment: string, 
    topicTitle: string, 
    topicContent: string
  ): Promise<{
    relevanceScore: number;
    classification: 'fact' | 'opinion' | 'mixed' | 'question';
    reasoning: string;
    suggestions?: string[];
  }> {
    try {
      const prompt = `
Analyze this forum comment in the context of the topic:

Topic Title: "${topicTitle}"
Topic Content: "${topicContent}"
Comment: "${comment}"

Provide analysis in the following JSON format:
{
  "relevanceScore": number (0-100, how relevant is the comment to the topic),
  "classification": "fact" | "opinion" | "mixed" | "question",
  "reasoning": "brief explanation of the classification and relevance",
  "suggestions": ["suggestion1", "suggestion2"] (optional - only if comment could be improved)
}

Classification guidelines:
- "fact": Contains verifiable information, data, or objective statements
- "opinion": Personal views, subjective statements, preferences
- "mixed": Contains both factual information and opinions
- "question": Primarily asking questions or seeking information

Relevance scoring:
- 90-100: Directly addresses the topic
- 70-89: Related to the topic with some connection
- 50-69: Tangentially related
- 30-49: Loosely connected
- 0-29: Off-topic or unrelated
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let analysisText = response.text().trim();

      // Clean up common JSON formatting issues
      analysisText = analysisText.replace(/```json\s*/, '').replace(/```\s*$/, '');
      analysisText = analysisText.replace(/^\s*[\[\{]*\s*"?json"?\s*[\]\}]*\s*/, '');

      try {
        const analysis = JSON.parse(analysisText);
        
        // Validate the response structure
        return {
          relevanceScore: Math.max(0, Math.min(100, analysis.relevanceScore || 0)),
          classification: ['fact', 'opinion', 'mixed', 'question'].includes(analysis.classification) 
            ? analysis.classification 
            : 'mixed',
          reasoning: analysis.reasoning || 'Unable to analyze',
          suggestions: Array.isArray(analysis.suggestions) ? analysis.suggestions : undefined
        };
      } catch (parseError) {
        console.error('Error parsing comment analysis:', parseError);
        // Fallback analysis
        return {
          relevanceScore: 50,
          classification: 'mixed',
          reasoning: 'Unable to analyze comment automatically',
        };
      }
    } catch (error) {
      console.error('Error analyzing comment:', error);
      return {
        relevanceScore: 50,
        classification: 'mixed',
        reasoning: 'Analysis failed',
      };
    }
  }

  /**
   * Batch analyze multiple comments for insights
   */
  static async analyzeDiscussion(
    topicTitle: string,
    topicContent: string,
    comments: Array<{ content: string; authorName: string; createdAt: string }>
  ): Promise<{
    overallSentiment: 'positive' | 'neutral' | 'negative';
    factOpinionRatio: { facts: number; opinions: number; mixed: number; questions: number };
    keyThemes: string[];
    engagementLevel: 'high' | 'medium' | 'low';
    suggestions: string[];
  }> {
    try {
      const commentsText = comments.map(c => c.content).join(' | ');
      
      const prompt = `
Analyze this forum discussion for overall insights:

Topic: "${topicTitle}"
Content: "${topicContent}"
Comments (${comments.length}): "${commentsText}"

Provide analysis in JSON format:
{
  "overallSentiment": "positive" | "neutral" | "negative",
  "factOpinionRatio": {
    "facts": number (percentage),
    "opinions": number (percentage), 
    "mixed": number (percentage),
    "questions": number (percentage)
  },
  "keyThemes": ["theme1", "theme2", "theme3"],
  "engagementLevel": "high" | "medium" | "low",
  "suggestions": ["suggestion1", "suggestion2"]
}

Guidelines:
- Sentiment: Overall tone of the discussion
- Fact/Opinion ratio: Percentage breakdown of comment types
- Key themes: Main topics being discussed
- Engagement: Based on comment quality and interaction
- Suggestions: How to improve the discussion
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let analysisText = response.text().trim();

      // Clean up JSON formatting
      analysisText = analysisText.replace(/```json\s*/, '').replace(/```\s*$/, '');
      analysisText = analysisText.replace(/^\s*[\[\{]*\s*"?json"?\s*[\]\}]*\s*/, '');

      try {
        const analysis = JSON.parse(analysisText);
        return {
          overallSentiment: ['positive', 'neutral', 'negative'].includes(analysis.overallSentiment) 
            ? analysis.overallSentiment 
            : 'neutral',
          factOpinionRatio: {
            facts: analysis.factOpinionRatio?.facts || 25,
            opinions: analysis.factOpinionRatio?.opinions || 50,
            mixed: analysis.factOpinionRatio?.mixed || 20,
            questions: analysis.factOpinionRatio?.questions || 5
          },
          keyThemes: Array.isArray(analysis.keyThemes) ? analysis.keyThemes.slice(0, 5) : [],
          engagementLevel: ['high', 'medium', 'low'].includes(analysis.engagementLevel) 
            ? analysis.engagementLevel 
            : 'medium',
          suggestions: Array.isArray(analysis.suggestions) ? analysis.suggestions.slice(0, 3) : []
        };
      } catch (parseError) {
        console.error('Error parsing discussion analysis:', parseError);
        return {
          overallSentiment: 'neutral',
          factOpinionRatio: { facts: 25, opinions: 50, mixed: 20, questions: 5 },
          keyThemes: [],
          engagementLevel: 'medium',
          suggestions: []
        };
      }
    } catch (error) {
      console.error('Error analyzing discussion:', error);
      return {
        overallSentiment: 'neutral',
        factOpinionRatio: { facts: 25, opinions: 50, mixed: 20, questions: 5 },
        keyThemes: [],
        engagementLevel: 'medium',
        suggestions: []
      };
    }
  }
}
