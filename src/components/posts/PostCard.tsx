'use client';

import { VoteButton } from '@/components/forum/VoteButton';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { StatusBadge } from '@/components/political/StatusBadge';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  postType: 'issue' | 'feedback' | 'suggestion';
  priorityLevel: 'low' | 'medium' | 'high';
  governanceLevel: 'national' | 'state' | 'local';
  status: 'open' | 'in_review' | 'acknowledged' | 'resolved' | 'rejected';
  location?: string;
  deadline?: Date | string;
  officialResponse?: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  viewCount: number;
  createdAt: Date | string;
}

interface PostCardProps {
  post: Post;
  onVote: (postId: string, voteType: 'upvote' | 'downvote') => void;
  userCanVote: boolean;
}

export function PostCard({ post, onVote, userCanVote }: PostCardProps) {
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

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'issue': return '⚠️';
      case 'feedback': return '💬';
      case 'suggestion': return '💡';
      default: return '📝';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'var(--sabha-danger-border)';
      case 'medium': return 'var(--sabha-warning-border)';
      case 'low': return 'var(--sabha-success-border)';
      default: return 'var(--sabha-border-primary)';
    }
  };

  const getGovernanceIcon = (level: string) => {
    switch (level) {
      case 'national': return '🏛️';
      case 'state': return '🏢';
      case 'local': return '🏘️';
      default: return '📍';
    }
  };

  const isDeadlineApproaching = () => {
    if (!post.deadline) return false;
    const deadline = typeof post.deadline === 'string' ? new Date(post.deadline) : post.deadline;
    const now = new Date();
    const diffInDays = Math.floor((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays <= 7 && diffInDays >= 0;
  };

  return (
    <div style={{
      backgroundColor: 'var(--sabha-bg-primary)',
      borderRadius: 'var(--sabha-radius-lg)',
      boxShadow: 'var(--sabha-shadow-sm)',
      border: `1px solid ${getPriorityColor(post.priorityLevel)}`,
      borderLeftWidth: '4px',
      padding: 'var(--sabha-spacing-lg)',
      transition: 'var(--sabha-transition-fast)',
      position: 'relative' as const,
    }}
    className="hover:shadow-md hover:scale-[1.01]"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <UserAvatar
            user={{
              name: post.authorName,
              image: post.authorImage
            }}
            size="sm"
          />
          <div>
            <div style={{
              color: 'var(--sabha-text-primary)',
              fontSize: 'var(--sabha-text-sm)',
              fontWeight: 'var(--sabha-font-medium)',
            }}>
              {post.authorName}
            </div>
            <div style={{
              color: 'var(--sabha-text-secondary)',
              fontSize: 'var(--sabha-text-xs)',
            }}>
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <StatusBadge status={post.status} size="sm" />
          {isDeadlineApproaching() && (
            <span style={{
              backgroundColor: 'var(--sabha-warning-bg)',
              color: 'var(--sabha-warning-text)',
              padding: '2px 6px',
              borderRadius: 'var(--sabha-radius-sm)',
              fontSize: 'var(--sabha-text-xs)',
              fontWeight: 'var(--sabha-font-medium)',
            }}>
              ⏰ Urgent
            </span>
          )}
        </div>
      </div>

      {/* Post Type and Governance Level */}
      <div className="flex items-center space-x-4 mb-3">
        <div className="flex items-center space-x-1">
          <span>{getPostTypeIcon(post.postType)}</span>
          <span style={{
            color: 'var(--sabha-text-secondary)',
            fontSize: 'var(--sabha-text-sm)',
            fontWeight: 'var(--sabha-font-medium)',
            textTransform: 'capitalize' as const,
          }}>
            {post.postType}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <span>{getGovernanceIcon(post.governanceLevel)}</span>
          <span style={{
            color: 'var(--sabha-text-secondary)',
            fontSize: 'var(--sabha-text-sm)',
            textTransform: 'capitalize' as const,
          }}>
            {post.governanceLevel}
          </span>
          {post.location && (
            <span style={{
              color: 'var(--sabha-text-tertiary)',
              fontSize: 'var(--sabha-text-sm)',
            }}>
              • {post.location}
            </span>
          )}
        </div>
      </div>

      {/* Category */}
      {post.categoryName && (
        <div className="mb-3">
          <span style={{
            backgroundColor: post.categoryColor || 'var(--sabha-primary-bg)',
            color: 'var(--sabha-primary-text)',
            padding: '2px 8px',
            borderRadius: 'var(--sabha-radius-full)',
            fontSize: 'var(--sabha-text-xs)',
            fontWeight: 'var(--sabha-font-medium)',
          }}>
            {post.categoryName}
          </span>
        </div>
      )}

      {/* Title */}
      <Link href={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
        <h2 style={{
          color: 'var(--sabha-text-primary)',
          fontSize: 'var(--sabha-text-lg)',
          fontWeight: 'var(--sabha-font-semibold)',
          lineHeight: '1.5',
          marginBottom: 'var(--sabha-spacing-sm)',
          cursor: 'pointer',
        }}
        className="hover:text-blue-600 transition-colors"
        >
          {post.title}
        </h2>
      </Link>

      {/* Content Preview */}
      <div style={{
        color: 'var(--sabha-text-secondary)',
        fontSize: 'var(--sabha-text-base)',
        lineHeight: '1.6',
        marginBottom: 'var(--sabha-spacing-md)',
      }}>
        {post.content.length > 200 
          ? `${post.content.substring(0, 200)}...` 
          : post.content
        }
      </div>

      {/* Official Response */}
      {post.officialResponse && (
        <div style={{
          backgroundColor: 'var(--sabha-info-bg)',
          border: `1px solid var(--sabha-info-border)`,
          borderRadius: 'var(--sabha-radius-md)',
          padding: 'var(--sabha-spacing-md)',
          marginBottom: 'var(--sabha-spacing-md)',
        }}>
          <div style={{
            color: 'var(--sabha-info-text)',
            fontSize: 'var(--sabha-text-sm)',
            fontWeight: 'var(--sabha-font-semibold)',
            marginBottom: 'var(--sabha-spacing-xs)',
          }}>
            🏛️ Official Response
          </div>
          <div style={{
            color: 'var(--sabha-text-primary)',
            fontSize: 'var(--sabha-text-sm)',
            lineHeight: '1.5',
          }}>
            {post.officialResponse.length > 150 
              ? `${post.officialResponse.substring(0, 150)}...` 
              : post.officialResponse
            }
          </div>
        </div>
      )}

      {/* Deadline */}
      {post.deadline && (
        <div className="mb-4">
          <div style={{
            color: isDeadlineApproaching() ? 'var(--sabha-danger-text)' : 'var(--sabha-text-secondary)',
            fontSize: 'var(--sabha-text-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--sabha-spacing-xs)',
          }}>
            <span>⏰</span>
            <span>Deadline: {new Date(post.deadline).toLocaleDateString()}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <VoteButton
              type="upvote"
              count={post.upvotes}
              onClick={() => onVote(post.id, 'upvote')}
              disabled={!userCanVote}
            />
            <VoteButton
              type="downvote"
              count={post.downvotes}
              onClick={() => onVote(post.id, 'downvote')}
              disabled={!userCanVote}
            />
          </div>
          
          <Link href={`/post/${post.id}#comments`} style={{
            color: 'var(--sabha-text-secondary)',
            fontSize: 'var(--sabha-text-sm)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--sabha-spacing-xs)',
          }}
          className="hover:text-blue-600 transition-colors"
          >
            <span>💬</span>
            <span>{post.commentCount} comments</span>
          </Link>
        </div>
        
        <div style={{
          color: 'var(--sabha-text-tertiary)',
          fontSize: 'var(--sabha-text-xs)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--sabha-spacing-xs)',
        }}>
          <span>👁️</span>
          <span>{post.viewCount} views</span>
        </div>
      </div>
    </div>
  );
}
