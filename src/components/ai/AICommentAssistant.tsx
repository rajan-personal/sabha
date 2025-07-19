'use client';

import { useState } from 'react';

interface AICommentAssistantProps {
  topicId: string;
  onCommentSelect?: (comment: string) => void;
  onCommentEnhance?: (enhanced: string) => void;
  currentComment?: string;
  mode?: 'suggestions' | 'enhance' | 'both';
}

export function AICommentAssistant({ 
  topicId, 
  onCommentSelect, 
  onCommentEnhance, 
  currentComment = '',
  mode = 'both'
}: AICommentAssistantProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const generateSuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'suggestions',
          topicId,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate suggestions');

      const data = await response.json();
      setSuggestions(data.suggestions || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const enhanceComment = async () => {
    if (!currentComment.trim()) return;

    setEnhancing(true);
    try {
      const response = await fetch('/api/ai/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'enhance',
          comment: currentComment,
          topicId,
        }),
      });

      if (!response.ok) throw new Error('Failed to enhance comment');

      const data = await response.json();
      onCommentEnhance?.(data.enhancedComment);
    } catch (error) {
      console.error('Error enhancing comment:', error);
    } finally {
      setEnhancing(false);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    onCommentSelect?.(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div style={{
      borderTop: '1px solid var(--sabha-border-primary)',
      paddingTop: 'var(--sabha-spacing-md)',
      marginTop: 'var(--sabha-spacing-md)'
    }}>
      <div className="flex items-center gap-2 mb-3">
        <svg style={{ width: '1rem', height: '1rem', color: 'var(--sabha-accent-600)' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: 'var(--sabha-accent-600)'
        }}>
          AI Assistant
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {(mode === 'suggestions' || mode === 'both') && (
          <button
            onClick={generateSuggestions}
            disabled={loading}
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--sabha-radius-md)',
              border: '1px solid var(--sabha-border-primary)',
              backgroundColor: 'var(--sabha-bg-secondary)',
              color: 'var(--sabha-text-primary)',
              fontSize: '0.875rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: loading ? 0.7 : 1,
              transition: 'var(--sabha-transition-fast)'
            }}
          >
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {loading ? 'Generating...' : 'Get Ideas'}
          </button>
        )}

        {(mode === 'enhance' || mode === 'both') && currentComment.trim() && (
          <button
            onClick={enhanceComment}
            disabled={enhancing}
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--sabha-radius-md)',
              border: '1px solid var(--sabha-border-primary)',
              backgroundColor: 'var(--sabha-bg-secondary)',
              color: 'var(--sabha-text-primary)',
              fontSize: '0.875rem',
              cursor: enhancing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: enhancing ? 0.7 : 1,
              transition: 'var(--sabha-transition-fast)'
            }}
          >
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            {enhancing ? 'Enhancing...' : 'Improve'}
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div style={{
          marginTop: 'var(--sabha-spacing-md)',
          padding: 'var(--sabha-spacing-md)',
          borderRadius: 'var(--sabha-radius-md)',
          backgroundColor: 'var(--sabha-bg-secondary)',
          border: '1px solid var(--sabha-border-primary)'
        }}>
          <div className="flex items-center justify-between mb-3">
            <h4 style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--sabha-text-primary)'
            }}>
              AI Suggestions
            </h4>
            <button
              onClick={() => setShowSuggestions(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--sabha-text-secondary)',
                cursor: 'pointer',
                padding: '0.25rem'
              }}
            >
              <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionSelect(suggestion)}
                style={{
                  width: '100%',
                  padding: 'var(--sabha-spacing-sm)',
                  borderRadius: 'var(--sabha-radius-sm)',
                  border: '1px solid var(--sabha-border-primary)',
                  backgroundColor: 'var(--sabha-bg-primary)',
                  color: 'var(--sabha-text-primary)',
                  fontSize: '0.875rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'var(--sabha-transition-fast)',
                  lineHeight: '1.4'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--sabha-accent-50)';
                  e.currentTarget.style.borderColor = 'var(--sabha-accent-200)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--sabha-bg-primary)';
                  e.currentTarget.style.borderColor = 'var(--sabha-border-primary)';
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
