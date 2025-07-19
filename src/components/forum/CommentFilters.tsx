'use client';

import { useState } from 'react';

interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date | string;
  parentId?: string;
  replies?: Comment[];
}

interface CommentFiltersProps {
  comments: Comment[];
  onFilteredComments: (filtered: Comment[]) => void;
}

export function CommentFilters({ comments, onFilteredComments }: CommentFiltersProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular' | 'controversial'>('newest');
  const [showFilters, setShowFilters] = useState(false);

  const sortComments = (comments: Comment[], sortType: string) => {
    const sorted = [...comments];

    switch (sortType) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'popular':
        return sorted.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
      case 'controversial':
        return sorted.sort((a, b) => {
          const aTotal = a.upvotes + a.downvotes;
          const bTotal = b.upvotes + b.downvotes;
          const aRatio = aTotal > 0 ? Math.min(a.upvotes, a.downvotes) / aTotal : 0;
          const bRatio = bTotal > 0 ? Math.min(b.upvotes, b.downvotes) / bTotal : 0;
          return bRatio - aRatio;
        });
      default:
        return sorted;
    }
  };

  const handleSortChange = (newSort: 'newest' | 'oldest' | 'popular' | 'controversial') => {
    setSortBy(newSort);
    const filtered = sortComments(comments, newSort);
    onFilteredComments(filtered);
  };

  if (comments.length === 0) return null;

  return (
    <div style={{
      marginBottom: 'var(--sabha-spacing-lg)',
      padding: 'var(--sabha-spacing-md)',
      borderRadius: 'var(--sabha-radius-md)',
      backgroundColor: 'var(--sabha-bg-secondary)',
      border: '1px solid var(--sabha-border-primary)'
    }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span style={{
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'var(--sabha-text-primary)'
          }}>
            Sort by:
          </span>
          
          <div className="flex gap-2">
            {[
              { key: 'newest', label: 'Newest' },
              { key: 'popular', label: 'Popular' },
              { key: 'oldest', label: 'Oldest' },
              { key: 'controversial', label: 'Controversial' }
            ].map(option => (
              <button
                key={option.key}
                onClick={() => handleSortChange(option.key as any)}
                style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: 'var(--sabha-radius-sm)',
                  border: '1px solid var(--sabha-border-primary)',
                  backgroundColor: sortBy === option.key ? 'var(--sabha-primary-100)' : 'var(--sabha-bg-primary)',
                  color: sortBy === option.key ? 'var(--sabha-primary-700)' : 'var(--sabha-text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: sortBy === option.key ? '600' : '400',
                  cursor: 'pointer',
                  transition: 'var(--sabha-transition-fast)'
                }}
                onMouseEnter={(e) => {
                  if (sortBy !== option.key) {
                    e.currentTarget.style.backgroundColor = 'var(--sabha-bg-tertiary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (sortBy !== option.key) {
                    e.currentTarget.style.backgroundColor = 'var(--sabha-bg-primary)';
                  }
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--sabha-text-secondary)'
          }}>
            {comments.length} comment{comments.length !== 1 ? 's' : ''}
          </span>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              padding: '0.25rem',
              borderRadius: 'var(--sabha-radius-sm)',
              border: 'none',
              backgroundColor: 'transparent',
              color: 'var(--sabha-text-secondary)',
              cursor: 'pointer',
              transition: 'var(--sabha-transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--sabha-bg-tertiary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
          </button>
        </div>
      </div>

      {showFilters && (
        <div style={{
          marginTop: 'var(--sabha-spacing-md)',
          paddingTop: 'var(--sabha-spacing-md)',
          borderTop: '1px solid var(--sabha-border-primary)'
        }}>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--sabha-text-secondary)',
            lineHeight: '1.4'
          }}>
            <div><strong>Newest:</strong> Most recent comments first</div>
            <div><strong>Popular:</strong> Highest net score (upvotes - downvotes)</div>
            <div><strong>Oldest:</strong> Original comments first</div>
            <div><strong>Controversial:</strong> Comments with mixed reactions</div>
          </div>
        </div>
      )}
    </div>
  );
}
