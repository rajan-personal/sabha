'use client';

import { useSession } from '@/lib/auth-client';
import { Header } from '@/components/ui/Header';
import { TopicList } from '@/components/forum/TopicList';
import { CreateTopicButton } from '@/components/forum/CreateTopicButton';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--sabha-bg-secondary)' 
    }}>
      <div className="mx-auto px-6 lg:px-8 py-8 max-w-none">
        <Header />

        <HomeContent 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </div>
  );
}

function HomeContent({
  searchQuery,
  setSearchQuery
}: {
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
              Political Engagement Platform
            </h1>
            <p style={{ color: 'var(--sabha-text-secondary)' }}>
              {session 
                ? "Share issues, provide feedback, and suggest improvements for governance at all levels"
                : "Explore political discussions and civic engagement by signing in"
              }
            </p>
          </div>
          
          {session && <CreateTopicButton />}
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search issues, feedback, and suggestions..."
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
        </div>
      </div>

      {/* Topics List */}
      <TopicList 
        searchQuery={searchQuery}
      />
    </>
  );
}
