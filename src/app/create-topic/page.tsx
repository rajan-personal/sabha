'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Header } from '@/components/ui/Header';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTopicPage() {
  return (
    <ProtectedRoute>
      <div style={{ 
        minHeight: '100vh', 
        background: 'var(--sabha-bg-secondary)' 
      }}>
        <div className="container mx-auto px-4 py-8">
          <Header />
          <CreateTopicForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}

function CreateTopicForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<{id: string, name: string, color: string}[]>([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data.map((cat: {id: string, name: string, color: string}) => ({ 
          id: cat.id, 
          name: cat.name, 
          color: cat.color 
        })));
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

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
          categoryId: formData.categoryId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create topic');
      }

      const newTopic = await response.json();
      console.log('Topic created:', newTopic);
      
      // Redirect to dashboard after successful creation
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating topic:', error);
      alert('Failed to create topic. Please try again.');
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

  return (
    <>
      <div className="mb-8">
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 'bold',
          color: 'var(--sabha-text-primary)',
          marginBottom: 'var(--sabha-spacing-sm)'
        }}>
          Create New Topic
        </h1>
        <p style={{ color: 'var(--sabha-text-secondary)' }}>
          Share your ideas and start a discussion with the community
        </p>
      </div>

      <div style={{
        backgroundColor: 'var(--sabha-bg-primary)',
        borderRadius: 'var(--sabha-radius-lg)',
        boxShadow: 'var(--sabha-shadow-sm)',
        border: '1px solid var(--sabha-border-primary)',
        padding: 'var(--sabha-spacing-xl)',
        maxWidth: '800px'
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

          {/* Category */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--sabha-text-primary)',
              marginBottom: 'var(--sabha-spacing-sm)'
            }}>
              Category *
            </label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) => handleInputChange('categoryId', e.target.value)}
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
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'var(--sabha-text-primary)',
              marginBottom: 'var(--sabha-spacing-sm)'
            }}>
              Content *
            </label>
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

          {/* Community Guidelines */}
          <div style={{
            backgroundColor: 'var(--sabha-accent-50)',
            border: '1px solid var(--sabha-accent-200)',
            borderRadius: 'var(--sabha-radius-lg)',
            padding: 'var(--sabha-spacing-md)'
          }}>
            <div className="flex items-center gap-2 mb-2">
              <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--sabha-accent-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'var(--sabha-accent-700)'
              }}>
                Community Guidelines
              </h3>
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--sabha-accent-700)',
              lineHeight: '1.5'
            }}>
              Please ensure your topic contributes meaningfully to climate change discussions and follows our community guidelines.
            </p>
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
              {isSubmitting ? 'Creating...' : 'Create Topic'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
