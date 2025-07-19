'use client';

import { useState } from 'react';

interface AIReplyAssistantProps {
  commentId: string;
  topicId: string;
  onReplySelect: (reply: string) => void;
}

export function AIReplyAssistant({ commentId, topicId, onReplySelect }: AIReplyAssistantProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const generateReplySuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reply-suggestions',
          commentId,
          topicId,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate reply suggestions');

      const data = await response.json();
      setSuggestions(data.suggestions || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error generating reply suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    onReplySelect(suggestion);
    setShowSuggestions(false);
  };

  if (!showSuggestions && !loading) {
    return (
      <button
        onClick={generateReplySuggestions}
        style={{
          padding: '0.375rem 0.5rem',
          borderRadius: 'var(--sabha-radius-sm)',
          border: '1px solid var(--sabha-border-primary)',
          backgroundColor: 'var(--sabha-bg-secondary)',
          color: 'var(--sabha-text-secondary)',
          fontSize: '0.75rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          transition: 'var(--sabha-transition-fast)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--sabha-accent-50)';
          e.currentTarget.style.color = 'var(--sabha-accent-600)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--sabha-bg-secondary)';
          e.currentTarget.style.color = 'var(--sabha-text-secondary)';
        }}
      >
        <svg style={{ width: '0.875rem', height: '0.875rem' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        AI Reply
      </button>
    );
  }

  if (loading) {
    return (
      <div style={{
        padding: '0.375rem 0.5rem',
        fontSize: '0.75rem',
        color: 'var(--sabha-text-secondary)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem'
      }}>
        <div className="animate-spin rounded-full h-3 w-3 border-b border-blue-600"></div>
        Generating replies...
      </div>
    );
  }

  return (
    <div style={{
      marginTop: 'var(--sabha-spacing-sm)',
      padding: 'var(--sabha-spacing-sm)',
      borderRadius: 'var(--sabha-radius-sm)',
      backgroundColor: 'var(--sabha-bg-secondary)',
      border: '1px solid var(--sabha-border-primary)'
    }}>
      <div className="flex items-center justify-between mb-2">
        <span style={{
          fontSize: '0.75rem',
          fontWeight: '600',
          color: 'var(--sabha-accent-600)'
        }}>
          AI Reply Suggestions
        </span>
        <button
          onClick={() => setShowSuggestions(false)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--sabha-text-secondary)',
            cursor: 'pointer',
            padding: '0.125rem'
          }}
        >
          <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-1">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionSelect(suggestion)}
            style={{
              width: '100%',
              padding: '0.375rem',
              borderRadius: 'var(--sabha-radius-sm)',
              border: '1px solid var(--sabha-border-primary)',
              backgroundColor: 'var(--sabha-bg-primary)',
              color: 'var(--sabha-text-primary)',
              fontSize: '0.75rem',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'var(--sabha-transition-fast)',
              lineHeight: '1.3'
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
  );
}
