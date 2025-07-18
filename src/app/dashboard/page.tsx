'use client';

import { Header } from '@/components/ui/Header';
import { useSession } from '@/lib/auth-client';
import { TopicList } from '@/components/forum/TopicList';
import { CategoryFilter } from '@/components/forum/CategoryFilter';
import { CreateTopicButton } from '@/components/forum/CreateTopicButton';
import { useState } from 'react';

export default function DashboardPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--sabha-bg-secondary)' 
    }}>
      <div className="container mx-auto px-4 py-8">
        <Header />
        <DashboardContent />
      </div>
    </div>
  );
}

function DashboardContent() {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              color: 'var(--sabha-text-primary)',
              marginBottom: 'var(--sabha-spacing-sm)'
            }}>
              Community Forum
            </h1>
            <p style={{ color: 'var(--sabha-text-secondary)' }}>
              Discover and discuss various topics with the community
            </p>
          </div>
          
          {session && <CreateTopicButton />}
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--sabha-spacing-md)',
                borderRadius: 'var(--sabha-radius-lg)',
                border: '1px solid var(--sabha-border-primary)',
                backgroundColor: 'var(--sabha-bg-primary)',
                color: 'var(--sabha-text-primary)',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>

      {/* Forum Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div style={{
          backgroundColor: 'var(--sabha-bg-primary)',
          padding: 'var(--sabha-spacing-lg)',
          borderRadius: 'var(--sabha-radius-lg)',
          boxShadow: 'var(--sabha-shadow-sm)',
          border: '1px solid var(--sabha-border-primary)'
        }}>
          <div className="flex items-center">
            <div style={{
              width: '2rem',
              height: '2rem',
              backgroundColor: 'var(--sabha-primary-100)',
              borderRadius: 'var(--sabha-radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--sabha-primary-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <div style={{ marginLeft: 'var(--sabha-spacing-md)' }}>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--sabha-text-secondary)'
              }}>
                Total Topics
              </p>
              <p style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'var(--sabha-text-primary)'
              }}>
                0
              </p>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--sabha-bg-primary)',
          padding: 'var(--sabha-spacing-lg)',
          borderRadius: 'var(--sabha-radius-lg)',
          boxShadow: 'var(--sabha-shadow-sm)',
          border: '1px solid var(--sabha-border-primary)'
        }}>
          <div className="flex items-center">
            <div style={{
              width: '2rem',
              height: '2rem',
              backgroundColor: 'var(--sabha-success-100)',
              borderRadius: 'var(--sabha-radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--sabha-success-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1M15 10V6a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2h2v4l4-4h2a2 2 0 002-2z" />
              </svg>
            </div>
            <div style={{ marginLeft: 'var(--sabha-spacing-md)' }}>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--sabha-text-secondary)'
              }}>
                Comments
              </p>
              <p style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'var(--sabha-text-primary)'
              }}>
                0
              </p>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--sabha-bg-primary)',
          padding: 'var(--sabha-spacing-lg)',
          borderRadius: 'var(--sabha-radius-lg)',
          boxShadow: 'var(--sabha-shadow-sm)',
          border: '1px solid var(--sabha-border-primary)'
        }}>
          <div className="flex items-center">
            <div style={{
              width: '2rem',
              height: '2rem',
              backgroundColor: 'var(--sabha-accent-100)',
              borderRadius: 'var(--sabha-radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--sabha-accent-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div style={{ marginLeft: 'var(--sabha-spacing-md)' }}>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--sabha-text-secondary)'
              }}>
                Active Users
              </p>
              <p style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'var(--sabha-text-primary)'
              }}>
                0
              </p>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--sabha-bg-primary)',
          padding: 'var(--sabha-spacing-lg)',
          borderRadius: 'var(--sabha-radius-lg)',
          boxShadow: 'var(--sabha-shadow-sm)',
          border: '1px solid var(--sabha-border-primary)'
        }}>
          <div className="flex items-center">
            <div style={{
              width: '2rem',
              height: '2rem',
              backgroundColor: 'var(--sabha-primary-100)',
              borderRadius: 'var(--sabha-radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--sabha-primary-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div style={{ marginLeft: 'var(--sabha-spacing-md)' }}>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--sabha-text-secondary)'
              }}>
                Active Discussions
              </p>
              <p style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'var(--sabha-text-primary)'
              }}>
                0
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Topic List */}
      <TopicList 
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
    </>
  );
}
