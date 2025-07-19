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
      <div className="mx-auto px-6 lg:px-8 py-8 max-w-none">
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

      {/* Topic List */}
      <TopicList 
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
    </>
  );
}
