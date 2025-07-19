'use client';

import { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  color: string;
  count: number;
}

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [categoriesResponse, topicsResponse] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/topics')
        ]);
        
        const categoriesData = await categoriesResponse.json();
        const topicsData = await topicsResponse.json();
        
        // Count topics per category
        const categoryCount = topicsData.reduce((acc: {[key: string]: number}, topic: {categoryId: string}) => {
          acc[topic.categoryId] = (acc[topic.categoryId] || 0) + 1;
          return acc;
        }, {});
        
        // Map categories with actual counts
        const categoriesWithCount = categoriesData.map((cat: {id: string, name: string, color: string}) => ({
          id: cat.id,
          name: cat.name,
          color: cat.color,
          count: categoryCount[cat.id] || 0,
        }));
        
        setCategories(categoriesWithCount);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const selectedCategoryName = categories.find(cat => cat.id === selectedCategory)?.name || 'All Categories';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--sabha-spacing-sm)',
          padding: 'var(--sabha-spacing-md)',
          borderRadius: 'var(--sabha-radius-lg)',
          border: '1px solid var(--sabha-border-primary)',
          backgroundColor: 'var(--sabha-bg-primary)',
          color: 'var(--sabha-text-primary)',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer',
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <span>{selectedCategoryName}</span>
        <svg 
          style={{ 
            width: '1rem', 
            height: '1rem',
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s'
          }} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '0.5rem',
          backgroundColor: 'var(--sabha-bg-primary)',
          borderRadius: 'var(--sabha-radius-lg)',
          boxShadow: 'var(--sabha-shadow-lg)',
          border: '1px solid var(--sabha-border-primary)',
          zIndex: 50,
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          <div style={{ padding: 'var(--sabha-spacing-sm)' }}>
            <button
              onClick={() => {
                onCategoryChange(null);
                setIsOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)',
                borderRadius: 'var(--sabha-radius-md)',
                border: 'none',
                backgroundColor: selectedCategory === null ? 'var(--sabha-primary-100)' : 'transparent',
                color: selectedCategory === null ? 'var(--sabha-primary-700)' : 'var(--sabha-text-primary)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'var(--sabha-transition-fast)'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== null) {
                  e.currentTarget.style.backgroundColor = 'var(--sabha-bg-tertiary)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== null) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ fontWeight: '500' }}>All Categories</span>
              <span style={{ 
                fontSize: '0.75rem', 
                color: 'var(--sabha-text-secondary)',
                fontWeight: '500'
              }}>
                {categories.reduce((sum, cat) => sum + cat.count, 0)}
              </span>
            </button>

            <div style={{ 
              height: '1px', 
              backgroundColor: 'var(--sabha-border-primary)', 
              margin: 'var(--sabha-spacing-sm) 0' 
            }} />

            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)',
                  borderRadius: 'var(--sabha-radius-md)',
                  border: 'none',
                  backgroundColor: selectedCategory === category.id ? 'var(--sabha-primary-100)' : 'transparent',
                  color: selectedCategory === category.id ? 'var(--sabha-primary-700)' : 'var(--sabha-text-primary)',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'var(--sabha-transition-fast)'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = 'var(--sabha-bg-tertiary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <div style={{
                    width: '0.75rem',
                    height: '0.75rem',
                    borderRadius: '50%',
                    backgroundColor: category.color
                  }} />
                  <span style={{ fontWeight: '500' }}>{category.name}</span>
                </div>
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--sabha-text-secondary)',
                  fontWeight: '500'
                }}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
