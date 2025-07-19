'use client';

import { useState } from 'react';

interface CommentAnalysis {
  relevanceScore: number;
  classification: 'fact' | 'opinion' | 'mixed' | 'question';
  reasoning: string;
  suggestions?: string[];
}

interface CommentAnalyzerProps {
  comment: string;
  topicId: string;
  onAnalysisComplete?: (analysis: CommentAnalysis) => void;
}

export function CommentAnalyzer({ comment, topicId, onAnalysisComplete }: CommentAnalyzerProps) {
  const [analysis, setAnalysis] = useState<CommentAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const analyzeComment = async () => {
    if (!comment.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/ai/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze',
          comment: comment.trim(),
          topicId,
        }),
      });

      if (!response.ok) throw new Error('Failed to analyze comment');

      const analysisData = await response.json();
      setAnalysis(analysisData);
      setShowAnalysis(true);
      onAnalysisComplete?.(analysisData);
    } catch (error) {
      console.error('Error analyzing comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'fact': return '#10b981'; // green
      case 'opinion': return '#f59e0b'; // yellow
      case 'mixed': return '#8b5cf6'; // purple
      case 'question': return '#3b82f6'; // blue
      default: return '#6b7280'; // gray
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    if (score >= 40) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  if (!comment.trim()) return null;

  return (
    <div style={{
      marginTop: 'var(--sabha-spacing-sm)',
      padding: 'var(--sabha-spacing-sm)',
      borderRadius: 'var(--sabha-radius-md)',
      backgroundColor: 'var(--sabha-bg-secondary)',
      border: '1px solid var(--sabha-border-primary)'
    }}>
      {!showAnalysis && !loading && (
        <button
          onClick={analyzeComment}
          style={{
            padding: '0.375rem 0.75rem',
            borderRadius: 'var(--sabha-radius-sm)',
            border: '1px solid var(--sabha-border-primary)',
            backgroundColor: 'var(--sabha-bg-primary)',
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
            e.currentTarget.style.backgroundColor = 'var(--sabha-bg-primary)';
            e.currentTarget.style.color = 'var(--sabha-text-secondary)';
          }}
        >
          <svg style={{ width: '0.875rem', height: '0.875rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          AI Analyze
        </button>
      )}

      {loading && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          padding: '0.375rem',
          fontSize: '0.75rem',
          color: 'var(--sabha-text-secondary)'
        }}>
          <div className="animate-spin rounded-full h-3 w-3 border-b border-blue-600"></div>
          Analyzing comment...
        </div>
      )}

      {showAnalysis && analysis && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              color: 'var(--sabha-accent-600)'
            }}>
              AI Analysis
            </span>
            <button
              onClick={() => setShowAnalysis(false)}
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

          <div className="space-y-2">
            {/* Classification Badge */}
            <div className="flex items-center gap-2">
              <span style={{
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--sabha-radius-sm)',
                fontSize: '0.625rem',
                fontWeight: '600',
                backgroundColor: getClassificationColor(analysis.classification) + '20',
                color: getClassificationColor(analysis.classification),
                border: `1px solid ${getClassificationColor(analysis.classification)}40`,
                textTransform: 'uppercase'
              }}>
                {analysis.classification}
              </span>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.625rem',
                color: 'var(--sabha-text-secondary)'
              }}>
                <span>Relevance:</span>
                <span style={{
                  fontWeight: '600',
                  color: getRelevanceColor(analysis.relevanceScore)
                }}>
                  {analysis.relevanceScore}%
                </span>
              </div>
            </div>

            {/* Reasoning */}
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--sabha-text-primary)',
              lineHeight: '1.3',
              padding: '0.375rem',
              backgroundColor: 'var(--sabha-bg-tertiary)',
              borderRadius: 'var(--sabha-radius-sm)',
              border: '1px solid var(--sabha-border-primary)'
            }}>
              {analysis.reasoning}
            </div>

            {/* Suggestions */}
            {analysis.suggestions && analysis.suggestions.length > 0 && (
              <div>
                <div style={{
                  fontSize: '0.625rem',
                  fontWeight: '600',
                  color: 'var(--sabha-text-secondary)',
                  marginBottom: '0.25rem'
                }}>
                  Suggestions:
                </div>
                <div className="space-y-1">
                  {analysis.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      style={{
                        fontSize: '0.625rem',
                        color: 'var(--sabha-text-secondary)',
                        padding: '0.25rem 0.375rem',
                        backgroundColor: 'var(--sabha-bg-primary)',
                        borderRadius: 'var(--sabha-radius-sm)',
                        border: '1px solid var(--sabha-border-primary)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.25rem'
                      }}
                    >
                      <span style={{ color: 'var(--sabha-accent-500)' }}>•</span>
                      {suggestion}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
