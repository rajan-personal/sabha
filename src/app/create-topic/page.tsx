'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Header } from '@/components/ui/Header';
import { PostTypeSelector } from '@/components/political/PostTypeSelector';
import { PrioritySelector } from '@/components/political/PrioritySelector';
import { GovernanceLevelSelector } from '@/components/political/GovernanceLevelSelector';
import { LocationSelector } from '@/components/political/LocationSelector';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTopicPage() {
  return (
    <ProtectedRoute>
      <div style={{ 
        minHeight: '100vh', 
        background: 'var(--sabha-bg-secondary)' 
      }}>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Header />
          <CreatePoliticalPostForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}

function CreatePoliticalPostForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    postType: 'suggestion' as 'issue' | 'feedback' | 'suggestion',
    priorityLevel: 'medium' as 'low' | 'medium' | 'high',
    governanceLevel: 'national' as 'national' | 'state' | 'local',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          postType: formData.postType,
          priorityLevel: formData.priorityLevel,
          governanceLevel: formData.governanceLevel,
          location: formData.location || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const newPost = await response.json();
      console.log('Political post created:', newPost);
      
      // Redirect to home page after successful creation
      router.push('/');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEnhanceContent = async () => {
    if (!formData.title) {
      alert('Please provide a title before using AI Refine');
      return;
    }

    setIsEnhancing(true);
    try {
      const response = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content || '', // Allow empty content
          category: 'Political',
          action: 'enhance'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to enhance content');
      }

      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        content: data.enhancedContent
      }));
    } catch (error) {
      console.error('Error enhancing content:', error);
      alert('Failed to enhance content. Please try again.');
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 'bold',
          color: 'var(--sabha-text-primary)',
          marginBottom: 'var(--sabha-spacing-sm)'
        }}>
          Create Political Post
        </h1>
        <p style={{ color: 'var(--sabha-text-secondary)' }}>
          Share issues, provide feedback, or suggest improvements for better governance
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div style={{
            backgroundColor: 'var(--sabha-bg-primary)',
            borderRadius: 'var(--sabha-radius-lg)',
            boxShadow: 'var(--sabha-shadow-sm)',
            border: '1px solid var(--sabha-border-primary)',
            padding: 'var(--sabha-spacing-xl)'
          }}>
            <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--sabha-text-primary)',
              marginBottom: 'var(--sabha-spacing-sm)'
            }}>
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter a descriptive title for your topic"
              style={{
                width: '100%',
                padding: 'var(--sabha-spacing-md)',
                borderRadius: 'var(--sabha-radius-lg)',
                border: '1px solid var(--sabha-border-primary)',
                backgroundColor: 'var(--sabha-bg-secondary)',
                color: 'var(--sabha-text-primary)',
                fontSize: '1rem',
                outline: 'none',
                transition: 'var(--sabha-transition-fast)'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--sabha-primary-500)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--sabha-border-primary)';
              }}
            />
          </div>

          {/* Political Metadata Section */}
          <div style={{
            backgroundColor: 'var(--sabha-bg-secondary)',
            borderRadius: 'var(--sabha-radius-lg)',
            padding: 'var(--sabha-spacing-lg)',
            border: '1px solid var(--sabha-border-secondary)'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'var(--sabha-text-primary)',
              marginBottom: 'var(--sabha-spacing-lg)',
              borderBottom: '2px solid var(--sabha-border-primary)',
              paddingBottom: 'var(--sabha-spacing-sm)'
            }}>
              Political Context
            </h3>
            <div className="space-y-6">
              {/* Post Type */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--sabha-text-primary)',
                  marginBottom: 'var(--sabha-spacing-sm)'
                }}>
                  Post Type *
                </label>
                <PostTypeSelector
                  value={formData.postType}
                  onChange={(value) => handleInputChange('postType', value)}
                />
              </div>

              {/* Priority Level */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--sabha-text-primary)',
                  marginBottom: 'var(--sabha-spacing-sm)'
                }}>
                  Priority Level *
                </label>
                <PrioritySelector
                  value={formData.priorityLevel}
                  onChange={(value) => handleInputChange('priorityLevel', value)}
                />
              </div>

              {/* Governance Level */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--sabha-text-primary)',
                  marginBottom: 'var(--sabha-spacing-sm)'
                }}>
                  Governance Level *
                </label>
                <GovernanceLevelSelector
                  value={formData.governanceLevel}
                  onChange={(value) => handleInputChange('governanceLevel', value)}
                />
              </div>

              {/* Location */}
              {(formData.governanceLevel === 'state' || formData.governanceLevel === 'local') && (
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: 'var(--sabha-text-primary)',
                    marginBottom: 'var(--sabha-spacing-sm)'
                  }}>
                    Location {formData.governanceLevel === 'local' ? '*' : ''}
                  </label>
                  <LocationSelector
                    value={formData.location}
                    onChange={(value) => handleInputChange('location', value)}
                    governanceLevel={formData.governanceLevel}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--sabha-text-primary)'
              }}>
                Content *
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleEnhanceContent}
                  disabled={isEnhancing || !formData.title}
                  style={{
                    padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)',
                    borderRadius: 'var(--sabha-radius-md)',
                    border: '1px solid var(--sabha-primary-500)',
                    backgroundColor: 'var(--sabha-bg-primary)',
                    color: 'var(--sabha-primary-600)',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    cursor: isEnhancing || !formData.title ? 'not-allowed' : 'pointer',
                    transition: 'var(--sabha-transition-fast)',
                    opacity: isEnhancing || !formData.title ? 0.5 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                  onMouseEnter={(e) => {
                    if (!isEnhancing && formData.title) {
                      e.currentTarget.style.backgroundColor = 'var(--sabha-primary-50)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--sabha-bg-primary)';
                  }}
                >
                  {isEnhancing ? (
                    <>
                      <svg style={{ width: '0.875rem', height: '0.875rem' }} className="animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Refining...
                    </>
                  ) : (
                    <>
                      <svg style={{ width: '0.875rem', height: '0.875rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      AI Refine
                    </>
                  )}
                </button>
              </div>
            </div>
            <textarea
              required
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Write your detailed content here..."
              rows={8}
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
                minHeight: '120px',
                transition: 'var(--sabha-transition-fast)'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--sabha-primary-500)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--sabha-border-primary)';
              }}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              style={{
                padding: 'var(--sabha-spacing-md) var(--sabha-spacing-lg)',
                borderRadius: 'var(--sabha-radius-lg)',
                border: '1px solid var(--sabha-border-primary)',
                backgroundColor: 'var(--sabha-bg-secondary)',
                color: 'var(--sabha-text-primary)',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'var(--sabha-transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--sabha-bg-tertiary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--sabha-bg-secondary)';
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
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
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = 'var(--sabha-primary-700)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = 'var(--sabha-primary-600)';
                }
              }}
            >
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>

    {/* Sidebar */}
    <div className="lg:col-span-1 mt-6 lg:mt-0">
      {/* Community Guidelines */}
      <div style={{
        backgroundColor: 'var(--sabha-bg-primary)',
        borderRadius: 'var(--sabha-radius-lg)',
        boxShadow: 'var(--sabha-shadow-sm)',
        border: '1px solid var(--sabha-border-primary)',
        padding: 'var(--sabha-spacing-xl)',
        marginBottom: 'var(--sabha-spacing-lg)'
      }}>
        <div className="flex items-center gap-2 mb-4">
          <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--sabha-accent-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'var(--sabha-text-primary)'
          }}>
            Community Guidelines
          </h3>
        </div>
        <ul style={{
          fontSize: '0.875rem',
          color: 'var(--sabha-text-secondary)',
          lineHeight: '1.6',
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          <li style={{ marginBottom: 'var(--sabha-spacing-sm)', display: 'flex', alignItems: 'flex-start', gap: 'var(--sabha-spacing-sm)' }}>
            <span style={{ color: 'var(--sabha-primary-500)', fontSize: '0.75rem', marginTop: '0.1rem' }}>•</span>
            Be respectful and constructive in your discussions
          </li>
          <li style={{ marginBottom: 'var(--sabha-spacing-sm)', display: 'flex', alignItems: 'flex-start', gap: 'var(--sabha-spacing-sm)' }}>
            <span style={{ color: 'var(--sabha-primary-500)', fontSize: '0.75rem', marginTop: '0.1rem' }}>•</span>
            Stay on-topic and contribute meaningfully
          </li>
          <li style={{ marginBottom: 'var(--sabha-spacing-sm)', display: 'flex', alignItems: 'flex-start', gap: 'var(--sabha-spacing-sm)' }}>
            <span style={{ color: 'var(--sabha-primary-500)', fontSize: '0.75rem', marginTop: '0.1rem' }}>•</span>
            Use clear, descriptive titles for your topics
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--sabha-spacing-sm)' }}>
            <span style={{ color: 'var(--sabha-primary-500)', fontSize: '0.75rem', marginTop: '0.1rem' }}>•</span>
            Provide sufficient context in your content
          </li>
        </ul>
      </div>

      {/* Tips */}
      <div style={{
        backgroundColor: 'var(--sabha-bg-primary)',
        borderRadius: 'var(--sabha-radius-lg)',
        boxShadow: 'var(--sabha-shadow-sm)',
        border: '1px solid var(--sabha-border-primary)',
        padding: 'var(--sabha-spacing-xl)'
      }}>
        <div className="flex items-center gap-2 mb-4">
          <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--sabha-secondary-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'var(--sabha-text-primary)'
          }}>
            Writing Tips
          </h3>
        </div>
        <ul style={{
          fontSize: '0.875rem',
          color: 'var(--sabha-text-secondary)',
          lineHeight: '1.6',
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          <li style={{ marginBottom: 'var(--sabha-spacing-sm)', display: 'flex', alignItems: 'flex-start', gap: 'var(--sabha-spacing-sm)' }}>
            <span style={{ color: 'var(--sabha-secondary-500)', fontSize: '0.75rem', marginTop: '0.1rem' }}>•</span>
            Choose a category that best fits your topic
          </li>
          <li style={{ marginBottom: 'var(--sabha-spacing-sm)', display: 'flex', alignItems: 'flex-start', gap: 'var(--sabha-spacing-sm)' }}>
            <span style={{ color: 'var(--sabha-secondary-500)', fontSize: '0.75rem', marginTop: '0.1rem' }}>•</span>
            Include relevant details and context
          </li>
          <li style={{ marginBottom: 'var(--sabha-spacing-sm)', display: 'flex', alignItems: 'flex-start', gap: 'var(--sabha-spacing-sm)' }}>
            <span style={{ color: 'var(--sabha-secondary-500)', fontSize: '0.75rem', marginTop: '0.1rem' }}>•</span>
            Format your content with proper paragraphs
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--sabha-spacing-sm)' }}>
            <span style={{ color: 'var(--sabha-secondary-500)', fontSize: '0.75rem', marginTop: '0.1rem' }}>•</span>
            Use &quot;AI Refine&quot; to generate or improve content from your title
          </li>
        </ul>
      </div>
    </div>
  </div>
</>
  );
}
