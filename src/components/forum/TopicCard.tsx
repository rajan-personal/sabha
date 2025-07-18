'use client';

import { VoteButton } from './VoteButton';
import { UserAvatar } from '@/components/ui/UserAvatar';
import Link from 'next/link';

interface Topic {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  viewCount: number;
  createdAt: Date | string;
}

interface TopicCardProps {
  topic: Topic;
  onVote: (topicId: string, voteType: 'upvote' | 'downvote') => void;
  userCanVote: boolean;
}

export function TopicCard({ topic, onVote, userCanVote }: TopicCardProps) {
  const formatDate = (date: Date | string) => {
    const now = new Date();
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return dateObj.toLocaleDateString();
  };

  return (
    <div style={{
      backgroundColor: 'var(--sabha-bg-primary)',
      borderRadius: 'var(--sabha-radius-lg)',
      boxShadow: 'var(--sabha-shadow-sm)',
      border: '1px solid var(--sabha-border-primary)',
      padding: 'var(--sabha-spacing-lg)',
      transition: 'var(--sabha-transition-fast)',
      cursor: 'pointer'
    }}>
      <div className="flex gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center gap-2">
          <VoteButton
            type="upvote"
            count={topic.upvotes}
            onClick={() => onVote(topic.id, 'upvote')}
            disabled={!userCanVote}
          />
          <VoteButton
            type="downvote"
            count={topic.downvotes}
            onClick={() => onVote(topic.id, 'downvote')}
            disabled={!userCanVote}
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--sabha-radius-sm)',
              fontSize: '0.75rem',
              fontWeight: '500',
              backgroundColor: topic.categoryColor + '20',
              color: topic.categoryColor,
              border: `1px solid ${topic.categoryColor}40`
            }}>
              {topic.categoryName}
            </span>
          </div>

          <Link href={`/topic/${topic.id}`} style={{ textDecoration: 'none' }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'var(--sabha-text-primary)',
              marginBottom: 'var(--sabha-spacing-sm)',
              lineHeight: '1.5'
            }}>
              {topic.title}
            </h3>
          </Link>

          <p style={{
            color: 'var(--sabha-text-secondary)',
            fontSize: '0.875rem',
            marginBottom: 'var(--sabha-spacing-md)',
            lineHeight: '1.5'
          }}>
            {topic.content.substring(0, 200)}...
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <UserAvatar 
                  user={{ name: topic.authorName, image: topic.authorImage }} 
                  size="sm" 
                />
                <div>
                  <p style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'var(--sabha-text-primary)'
                  }}>
                    {topic.authorName}
                  </p>
                  <p style={{
                    fontSize: '0.75rem',
                    color: 'var(--sabha-text-secondary)'
                  }}>
                    {formatDate(topic.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <svg style={{ width: '1rem', height: '1rem', color: 'var(--sabha-text-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1M15 10V6a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2h2v4l4-4h2a2 2 0 002-2z" />
                </svg>
                <span style={{
                  fontSize: '0.875rem',
                  color: 'var(--sabha-text-secondary)'
                }}>
                  {topic.commentCount}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <svg style={{ width: '1rem', height: '1rem', color: 'var(--sabha-text-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span style={{
                  fontSize: '0.875rem',
                  color: 'var(--sabha-text-secondary)'
                }}>
                  {topic.viewCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
