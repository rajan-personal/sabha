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
}
