'use client';

import { useSession } from '@/lib/auth-client';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { Header } from '@/components/ui/Header';
import { TopicList } from '@/components/forum/TopicList';
import { CategoryFilter } from '@/components/forum/CategoryFilter';
import { CreateTopicButton } from '@/components/forum/CreateTopicButton';
import { useState } from 'react';

export default function Home() {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--sabha-bg-secondary)' 
    }}>
      <div className="container mx-auto px-4 py-8">
        <Header />

        <HomeContent 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </div>
  );
}

function HomeContent({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery
}: {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  const { data: session } = useSession();

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
              {session 
                ? "Discover and discuss various topics with the community"
                : "Explore topics and join the discussion by signing in"
              }
            </p>
          </div>
          
          {session ? (
            <CreateTopicButton />
          ) : (
            <div style={{ maxWidth: '200px' }}>
              <GoogleSignInButton size="sm" variant="compact" />
            </div>
          )}
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
                padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)',
                border: '1px solid var(--sabha-border-primary)',
                borderRadius: 'var(--sabha-radius-lg)',
                fontSize: '0.875rem',
                backgroundColor: 'var(--sabha-bg-primary)',
                color: 'var(--sabha-text-primary)',
              }}
            />
          </div>
          <div className="md:w-64">
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>

        {/* Sign-in prompt for non-authenticated users */}
        {!session && (
          <div style={{
            backgroundColor: 'var(--sabha-bg-primary)',
            border: '1px solid var(--sabha-border-primary)',
            borderRadius: 'var(--sabha-radius-lg)',
            padding: 'var(--sabha-spacing-lg)',
            marginBottom: 'var(--sabha-spacing-lg)',
            textAlign: 'center'
          }}>
            <p style={{ 
              color: 'var(--sabha-text-secondary)',
              marginBottom: 'var(--sabha-spacing-md)'
            }}>
              💡 Sign in to create topics, comment, and vote on discussions
            </p>
            <GoogleSignInButton size="md" />
          </div>
        )}
      </div>

      {/* Topics List */}
      <TopicList 
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />
    </>
  );
}
