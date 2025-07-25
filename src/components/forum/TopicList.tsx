'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { TopicCard } from './TopicCard';

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

interface TopicListProps {
  searchQuery: string;
  selectedCategory: string | null;
}

export function TopicList({ searchQuery, selectedCategory }: TopicListProps) {
  const { data: session } = useSession();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch topics from API
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        
        // Build query parameters
        const params = new URLSearchParams();
        if (selectedCategory) {
          params.append('category', selectedCategory);
        }
        
        const response = await fetch(`/api/topics?${params}`);
        const data = await response.json();
        
        let filteredTopics = data;
        
        // Apply search filter on frontend
        if (searchQuery) {
          filteredTopics = filteredTopics.filter((topic: Topic) => 
            topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            topic.content.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        setTopics(filteredTopics);
      } catch (error) {
        console.error('Error fetching topics:', error);
        setTopics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [searchQuery, selectedCategory]);

  const handleVote = (topicId: string, voteType: 'upvote' | 'downvote') => {
    if (!session) {
      alert('Please log in to vote');
      return;
    }

    setTopics(prev => prev.map(topic => {
      if (topic.id === topicId) {
        if (voteType === 'upvote') {
          return { ...topic, upvotes: topic.upvotes + 1 };
        } else {
          return { ...topic, downvotes: topic.downvotes + 1 };
        }
      }
      return topic;
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Topics Count */}
      <div className="flex justify-end items-center mb-6">
        <p style={{ color: 'var(--sabha-text-secondary)', fontSize: '0.875rem' }}>
          {topics.length} topics found
        </p>
      </div>

      {/* Topics List */}
      {topics.length === 0 ? (
        <div className="text-center py-12">
          <p style={{ color: 'var(--sabha-text-secondary)', fontSize: '1.125rem' }}>
            No topics found. Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {topics.map(topic => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onVote={handleVote}
              userCanVote={!!session}
            />
          ))}
        </div>
      )}
    </div>
  );
}
