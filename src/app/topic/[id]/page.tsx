'use client';

import { Header } from '@/components/ui/Header';
import { useSession } from '@/lib/auth-client';
import { VoteButton } from '@/components/forum/VoteButton';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { AICommentAssistant } from '@/components/ai/AICommentAssistant';
import { AIReplyAssistant } from '@/components/ai/AIReplyAssistant';
import { DiscussionInsights } from '@/components/ai/DiscussionInsights';
import { CommentFilters } from '@/components/forum/CommentFilters';
import { CommentAnalyzer } from '@/components/ai/CommentAnalyzer';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

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

export default function TopicPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setLoading(true);
        
        // Fetch the topic
        const response = await fetch(`/api/topics/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setTopic(null);
            return;
          }
          throw new Error('Failed to fetch topic');
        }
        
        const topicData = await response.json();
        setTopic(topicData);
        
        // Fetch comments
        const commentsResponse = await fetch(`/api/topics/${params.id}/comments`);
        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json();
          setComments(commentsData);
          setFilteredComments(commentsData);
        } else {
          setComments([]);
          setFilteredComments([]);
        }
      } catch (error) {
        console.error('Error fetching topic:', error);
        setTopic(null);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [params.id]);

  const handleVote = (type: 'upvote' | 'downvote') => {
    if (!session) {
      alert('Please log in to vote');
      return;
    }

    if (!topic) return;

    setTopic(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        upvotes: type === 'upvote' ? prev.upvotes + 1 : prev.upvotes,
        downvotes: type === 'downvote' ? prev.downvotes + 1 : prev.downvotes,
      };
    });
  };

  const handleCommentVote = (commentId: string, type: 'upvote' | 'downvote') => {
    if (!session) {
      alert('Please log in to vote');
      return;
    }

    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        if (type === 'upvote') {
          return { ...comment, upvotes: comment.upvotes + 1 };
        } else {
          return { ...comment, downvotes: comment.downvotes + 1 };
        }
      }
      return comment;
    }));
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert('Please log in to comment');
      return;
    }

    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/topics/${params.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          content: newComment.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create comment');
      }

      const newCommentData = await response.json();
      
      // Add comment to the list
      setComments(prev => [...prev, newCommentData]);
      setFilteredComments(prev => [...prev, newCommentData]);
      setNewComment('');
      
      // Update topic comment count
      setTopic(prev => prev ? { ...prev, commentCount: prev.commentCount + 1 } : null);
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplySubmit = async (parentCommentId: string) => {
    if (!session || !replyText.trim()) return;

    try {
      const response = await fetch(`/api/topics/${params.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          content: replyText.trim(),
          parentId: parentCommentId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create reply');
      }

      const newReply = await response.json();
      
      // Add reply to the comments list
      setComments(prev => [...prev, newReply]);
      setFilteredComments(prev => [...prev, newReply]);
      setReplyText('');
      setReplyingTo(null);
      
      // Update topic comment count
      setTopic(prev => prev ? { ...prev, commentCount: prev.commentCount + 1 } : null);
    } catch (error) {
      console.error('Error posting reply:', error);
      alert('Failed to post reply');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'var(--sabha-bg-secondary)' 
      }}>
        <div className="container mx-auto px-4 py-8">
          <Header />
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'var(--sabha-bg-secondary)' 
      }}>
        <div className="container mx-auto px-4 py-8">
          <Header />
          <div className="max-w-4xl mx-auto">
            <div style={{
              backgroundColor: 'var(--sabha-bg-primary)',
              borderRadius: 'var(--sabha-radius-lg)',
              boxShadow: 'var(--sabha-shadow-sm)',
              border: '1px solid var(--sabha-border-primary)',
              padding: 'var(--sabha-spacing-xl)',
              textAlign: 'center'
            }}>
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'var(--sabha-text-primary)',
                marginBottom: 'var(--sabha-spacing-md)'
              }}>
                Topic not found
              </h1>
              <p style={{
                color: 'var(--sabha-text-secondary)'
              }}>
                This topic doesn&apos;t exist or has been removed.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--sabha-bg-secondary)' 
    }}>
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="max-w-4xl mx-auto">
          {/* Topic */}
          <div style={{
            backgroundColor: 'var(--sabha-bg-primary)',
            borderRadius: 'var(--sabha-radius-lg)',
            boxShadow: 'var(--sabha-shadow-sm)',
            border: '1px solid var(--sabha-border-primary)',
            padding: 'var(--sabha-spacing-xl)',
            marginBottom: 'var(--sabha-spacing-xl)'
          }}>
            <div className="flex gap-4">
              {/* Vote Section */}
              <div className="flex flex-col items-center gap-2">
                <VoteButton
                  type="upvote"
                  count={topic.upvotes}
                  onClick={() => handleVote('upvote')}
                  disabled={!session}
                />
                <VoteButton
                  type="downvote"
                  count={topic.downvotes}
                  onClick={() => handleVote('downvote')}
                  disabled={!session}
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
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

                <h1 style={{
                  fontSize: '1.875rem',
                  fontWeight: '700',
                  color: 'var(--sabha-text-primary)',
                  marginBottom: 'var(--sabha-spacing-lg)',
                  lineHeight: '1.25'
                }}>
                  {topic.title}
                </h1>

                <div style={{
                  color: 'var(--sabha-text-secondary)',
                  fontSize: '1rem',
                  marginBottom: 'var(--sabha-spacing-lg)',
                  lineHeight: '1.75',
                  whiteSpace: 'pre-wrap'
                }}>
                  {topic.content}
                </div>

                {/* Meta Information */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <UserAvatar 
                      user={{ name: topic.authorName, image: topic.authorImage }} 
                      size="md" 
                    />
                    <div>
                      <p style={{
                        fontWeight: '500',
                        color: 'var(--sabha-text-primary)'
                      }}>
                        {topic.authorName}
                      </p>
                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--sabha-text-secondary)'
                      }}>
                        {new Date(topic.createdAt).toLocaleDateString()} at {new Date(topic.createdAt).toLocaleTimeString()}
                      </p>
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
                        {topic.commentCount} comments
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
                        {topic.viewCount} views
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comment Form */}
          {session ? (
            <div style={{
              backgroundColor: 'var(--sabha-bg-primary)',
              borderRadius: 'var(--sabha-radius-lg)',
              boxShadow: 'var(--sabha-shadow-sm)',
              border: '1px solid var(--sabha-border-primary)',
              padding: 'var(--sabha-spacing-xl)',
              marginBottom: 'var(--sabha-spacing-xl)'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: 'var(--sabha-text-primary)',
                marginBottom: 'var(--sabha-spacing-md)'
              }}>
                Add a comment
              </h3>
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: 'var(--sabha-spacing-md)',
                    borderRadius: 'var(--sabha-radius-lg)',
                    border: '1px solid var(--sabha-border-primary)',
                    backgroundColor: 'var(--sabha-bg-secondary)',
                    color: 'var(--sabha-text-primary)',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'vertical',
                    marginBottom: 'var(--sabha-spacing-md)'
                  }}
                />
                
                {/* AI Comment Assistant */}
                <AICommentAssistant
                  topicId={params.id as string}
                  currentComment={newComment}
                  onCommentSelect={(comment) => setNewComment(comment)}
                  onCommentEnhance={(enhanced) => setNewComment(enhanced)}
                />
                
                <div className="flex justify-end" style={{ marginTop: 'var(--sabha-spacing-md)' }}>
                  <button
                    type="submit"
                    disabled={isSubmitting || !newComment.trim()}
                    style={{
                      padding: 'var(--sabha-spacing-md) var(--sabha-spacing-lg)',
                      borderRadius: 'var(--sabha-radius-lg)',
                      border: 'none',
                      backgroundColor: isSubmitting ? 'var(--sabha-primary-400)' : 'var(--sabha-primary-600)',
                      color: 'var(--sabha-text-inverse)',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      transition: 'var(--sabha-transition-fast)',
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                  >
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div style={{
              backgroundColor: 'var(--sabha-bg-primary)',
              borderRadius: 'var(--sabha-radius-lg)',
              boxShadow: 'var(--sabha-shadow-sm)',
              border: '1px solid var(--sabha-border-primary)',
              padding: 'var(--sabha-spacing-xl)',
              marginBottom: 'var(--sabha-spacing-xl)',
              textAlign: 'center'
            }}>
              <p style={{ color: 'var(--sabha-text-secondary)', marginBottom: 'var(--sabha-spacing-md)' }}>
                Please log in to participate in the discussion
              </p>
            </div>
          )}

          {/* Discussion Insights */}
          {topic && (
            <DiscussionInsights
              topicTitle={topic.title}
              topicContent={topic.content}
              comments={comments}
            />
          )}

          {/* Comments */}
          <div style={{
            backgroundColor: 'var(--sabha-bg-primary)',
            borderRadius: 'var(--sabha-radius-lg)',
            boxShadow: 'var(--sabha-shadow-sm)',
            border: '1px solid var(--sabha-border-primary)',
            padding: 'var(--sabha-spacing-xl)'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'var(--sabha-text-primary)',
              marginBottom: 'var(--sabha-spacing-lg)'
            }}>
              Comments ({comments.length})
            </h3>

            {/* Comment Filters */}
            <CommentFilters
              comments={comments}
              onFilteredComments={setFilteredComments}
            />

            {filteredComments.length === 0 ? (
              <p style={{
                color: 'var(--sabha-text-secondary)',
                textAlign: 'center',
                padding: 'var(--sabha-spacing-xl)'
              }}>
                No comments yet. Be the first to comment!
              </p>
            ) : (
              <div className="space-y-6">
                {filteredComments.map(comment => (
                  <div key={comment.id} style={{
                    borderBottom: '1px solid var(--sabha-border-primary)',
                    paddingBottom: 'var(--sabha-spacing-lg)'
                  }}>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <VoteButton
                          type="upvote"
                          count={comment.upvotes}
                          onClick={() => handleCommentVote(comment.id, 'upvote')}
                          disabled={!session}
                        />
                        <VoteButton
                          type="downvote"
                          count={comment.downvotes}
                          onClick={() => handleCommentVote(comment.id, 'downvote')}
                          disabled={!session}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <UserAvatar 
                            user={{ name: comment.authorName, image: comment.authorImage }} 
                            size="sm" 
                          />
                          <div>
                            <p style={{
                              fontWeight: '500',
                              color: 'var(--sabha-text-primary)'
                            }}>
                              {comment.authorName}
                            </p>
                            <p style={{
                              fontSize: '0.875rem',
                              color: 'var(--sabha-text-secondary)'
                            }}>
                              {new Date(comment.createdAt).toLocaleDateString()} at {new Date(comment.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>

                        <div style={{
                          color: 'var(--sabha-text-primary)',
                          lineHeight: '1.6',
                          marginBottom: 'var(--sabha-spacing-md)'
                        }}>
                          {comment.content}
                        </div>

                        {/* AI Comment Analysis */}
                        <CommentAnalyzer
                          comment={comment.content}
                          topicId={params.id as string}
                        />

                        {/* Comment Actions */}
                        {session && (
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--sabha-text-secondary)',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                                transition: 'var(--sabha-transition-fast)'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'var(--sabha-primary-600)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'var(--sabha-text-secondary)';
                              }}
                            >
                              <svg style={{ width: '0.875rem', height: '0.875rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                              </svg>
                              Reply
                            </button>

                            <AIReplyAssistant
                              commentId={comment.id}
                              topicId={params.id as string}
                              onReplySelect={(reply) => {
                                setReplyText(reply);
                                setReplyingTo(comment.id);
                              }}
                            />
                          </div>
                        )}

                        {/* Reply Form */}
                        {replyingTo === comment.id && (
                          <div style={{
                            marginTop: 'var(--sabha-spacing-md)',
                            padding: 'var(--sabha-spacing-md)',
                            borderRadius: 'var(--sabha-radius-md)',
                            backgroundColor: 'var(--sabha-bg-secondary)',
                            border: '1px solid var(--sabha-border-primary)'
                          }}>
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Write your reply..."
                              rows={3}
                              style={{
                                width: '100%',
                                padding: 'var(--sabha-spacing-sm)',
                                borderRadius: 'var(--sabha-radius-sm)',
                                border: '1px solid var(--sabha-border-primary)',
                                backgroundColor: 'var(--sabha-bg-primary)',
                                color: 'var(--sabha-text-primary)',
                                fontSize: '0.875rem',
                                outline: 'none',
                                resize: 'vertical',
                                marginBottom: 'var(--sabha-spacing-sm)'
                              }}
                            />
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyText('');
                                }}
                                style={{
                                  padding: '0.375rem 0.75rem',
                                  borderRadius: 'var(--sabha-radius-sm)',
                                  border: '1px solid var(--sabha-border-primary)',
                                  backgroundColor: 'var(--sabha-bg-primary)',
                                  color: 'var(--sabha-text-secondary)',
                                  fontSize: '0.75rem',
                                  cursor: 'pointer'
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleReplySubmit(comment.id)}
                                disabled={!replyText.trim()}
                                style={{
                                  padding: '0.375rem 0.75rem',
                                  borderRadius: 'var(--sabha-radius-sm)',
                                  border: 'none',
                                  backgroundColor: replyText.trim() ? 'var(--sabha-primary-600)' : 'var(--sabha-primary-400)',
                                  color: 'var(--sabha-text-inverse)',
                                  fontSize: '0.75rem',
                                  cursor: replyText.trim() ? 'pointer' : 'not-allowed'
                                }}
                              >
                                Post Reply
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
