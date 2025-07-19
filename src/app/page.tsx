'use client';

import { useSession } from '@/lib/auth-client';
import { Header } from '@/components/ui/Header';
import { TopicList } from '@/components/forum/TopicList';
import { CategoryFilter } from '@/components/forum/CategoryFilter';
import { CreateTopicButton } from '@/components/forum/CreateTopicButton';
import { useState } from 'react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--sabha-bg-secondary)' 
    }}>
      <div className="mx-auto px-6 lg:px-8 py-8 max-w-none">
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
                border: '1px solid var(--sabha-border-primary)',
                borderRadius: 'var(--sabha-radius-lg)',
                fontSize: '1rem',
                backgroundColor: 'var(--sabha-bg-primary)',
                color: 'var(--sabha-text-primary)',
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
          <div className="md:w-64">
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>
      </div>

      {/* Topics List */}
      <TopicList 
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />
    </>
  );
}
