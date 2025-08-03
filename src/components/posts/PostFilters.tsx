'use client';

import { useState } from 'react';

interface PostFiltersProps {
  filters: {
    postType: string;
    priorityLevel: string;
    governanceLevel: string;
    status: string;
    location: string;
  };
  onFiltersChange: (filters: {
    postType: string;
    priorityLevel: string;
    governanceLevel: string;
    status: string;
    location: string;
  }) => void;
}

export function PostFilters({ filters, onFiltersChange }: PostFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      postType: '',
      priorityLevel: '',
      governanceLevel: '',
      status: '',
      location: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div style={{
      backgroundColor: 'var(--sabha-bg-primary)',
      borderRadius: 'var(--sabha-radius-lg)',
      border: '1px solid var(--sabha-border-primary)',
      padding: 'var(--sabha-spacing-lg)',
      marginBottom: 'var(--sabha-spacing-lg)',
    }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 style={{
            color: 'var(--sabha-text-primary)',
            fontSize: 'var(--sabha-text-lg)',
            fontWeight: 'var(--sabha-font-semibold)',
            margin: 0,
          }}>
            🔍 Filters
          </h3>
          {hasActiveFilters && (
            <span style={{
              backgroundColor: 'var(--sabha-primary-bg)',
              color: 'var(--sabha-primary-text)',
              padding: '2px 8px',
              borderRadius: 'var(--sabha-radius-full)',
              fontSize: 'var(--sabha-text-xs)',
              fontWeight: 'var(--sabha-font-medium)',
            }}>
              Active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              style={{
                color: 'var(--sabha-text-secondary)',
                fontSize: 'var(--sabha-text-sm)',
                padding: 'var(--sabha-spacing-sm)',
                borderRadius: 'var(--sabha-radius-md)',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}
              className="hover:bg-gray-100 transition-colors"
            >
              Clear All
            </button>
          )}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              color: 'var(--sabha-text-secondary)',
              fontSize: 'var(--sabha-text-sm)',
              padding: 'var(--sabha-spacing-sm)',
              borderRadius: 'var(--sabha-radius-md)',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--sabha-spacing-xs)',
            }}
            className="hover:bg-gray-100 transition-colors"
          >
            <span>{isExpanded ? 'Hide' : 'Show'} Filters</span>
            <span style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
              ▼
            </span>
          </button>
        </div>
      </div>

      {/* Quick Filters - Always Visible */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {/* Post Type Quick Filter */}
        <select
          value={filters.postType}
          onChange={(e) => updateFilter('postType', e.target.value)}
          style={{
            padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)',
            borderRadius: 'var(--sabha-radius-md)',
            border: '1px solid var(--sabha-border-primary)',
            backgroundColor: 'var(--sabha-bg-secondary)',
            color: 'var(--sabha-text-primary)',
            fontSize: 'var(--sabha-text-sm)',
            cursor: 'pointer',
          }}
        >
          <option value="">All Types</option>
          <option value="issue">⚠️ Issues</option>
          <option value="feedback">💬 Feedback</option>
          <option value="suggestion">💡 Suggestions</option>
        </select>

        {/* Priority Quick Filter */}
        <select
          value={filters.priorityLevel}
          onChange={(e) => updateFilter('priorityLevel', e.target.value)}
          style={{
            padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)',
            borderRadius: 'var(--sabha-radius-md)',
            border: '1px solid var(--sabha-border-primary)',
            backgroundColor: 'var(--sabha-bg-secondary)',
            color: 'var(--sabha-text-primary)',
            fontSize: 'var(--sabha-text-sm)',
            cursor: 'pointer',
          }}
        >
          <option value="">All Priorities</option>
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>

        {/* Governance Level Quick Filter */}
        <select
          value={filters.governanceLevel}
          onChange={(e) => updateFilter('governanceLevel', e.target.value)}
          style={{
            padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)',
            borderRadius: 'var(--sabha-radius-md)',
            border: '1px solid var(--sabha-border-primary)',
            backgroundColor: 'var(--sabha-bg-secondary)',
            color: 'var(--sabha-text-primary)',
            fontSize: 'var(--sabha-text-sm)',
            cursor: 'pointer',
          }}
        >
          <option value="">All Levels</option>
          <option value="national">🏛️ National</option>
          <option value="state">🏢 State</option>
          <option value="local">🏘️ Local</option>
        </select>

        {/* Status Quick Filter */}
        <select
          value={filters.status}
          onChange={(e) => updateFilter('status', e.target.value)}
          style={{
            padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)',
            borderRadius: 'var(--sabha-radius-md)',
            border: '1px solid var(--sabha-border-primary)',
            backgroundColor: 'var(--sabha-bg-secondary)',
            color: 'var(--sabha-text-primary)',
            fontSize: 'var(--sabha-text-sm)',
            cursor: 'pointer',
          }}
        >
          <option value="">All Status</option>
          <option value="open">🔓 Open</option>
          <option value="in_review">👀 In Review</option>
          <option value="acknowledged">✅ Acknowledged</option>
          <option value="resolved">✨ Resolved</option>
          <option value="rejected">❌ Rejected</option>
        </select>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div style={{
          borderTop: '1px solid var(--sabha-border-primary)',
          paddingTop: 'var(--sabha-spacing-md)',
          marginTop: 'var(--sabha-spacing-md)',
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location Filter */}
            <div>
              <label style={{
                color: 'var(--sabha-text-primary)',
                fontSize: 'var(--sabha-text-sm)',
                fontWeight: 'var(--sabha-font-medium)',
                display: 'block',
                marginBottom: 'var(--sabha-spacing-xs)',
              }}>
                Location
              </label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => updateFilter('location', e.target.value)}
                placeholder="Enter city, state, or region"
                style={{
                  width: '100%',
                  padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)',
                  borderRadius: 'var(--sabha-radius-md)',
                  border: '1px solid var(--sabha-border-primary)',
                  backgroundColor: 'var(--sabha-bg-secondary)',
                  color: 'var(--sabha-text-primary)',
                  fontSize: 'var(--sabha-text-sm)',
                }}
              />
            </div>

            {/* Additional filters can be added here */}
            <div>
              <label style={{
                color: 'var(--sabha-text-primary)',
                fontSize: 'var(--sabha-text-sm)',
                fontWeight: 'var(--sabha-font-medium)',
                display: 'block',
                marginBottom: 'var(--sabha-spacing-xs)',
              }}>
                Advanced Options
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateFilter('status', filters.status === 'open' ? '' : 'open')}
                  style={{
                    padding: 'var(--sabha-spacing-xs) var(--sabha-spacing-sm)',
                    borderRadius: 'var(--sabha-radius-md)',
                    border: `1px solid ${filters.status === 'open' ? 'var(--sabha-primary-border)' : 'var(--sabha-border-primary)'}`,
                    backgroundColor: filters.status === 'open' ? 'var(--sabha-primary-bg)' : 'var(--sabha-bg-secondary)',
                    color: filters.status === 'open' ? 'var(--sabha-primary-text)' : 'var(--sabha-text-secondary)',
                    fontSize: 'var(--sabha-text-xs)',
                    cursor: 'pointer',
                  }}
                  className="hover:scale-105 transition-transform"
                >
                  Open Only
                </button>
                
                <button
                  onClick={() => updateFilter('status', filters.status === 'resolved' ? '' : 'resolved')}
                  style={{
                    padding: 'var(--sabha-spacing-xs) var(--sabha-spacing-sm)',
                    borderRadius: 'var(--sabha-radius-md)',
                    border: `1px solid ${filters.status === 'resolved' ? 'var(--sabha-success-border)' : 'var(--sabha-border-primary)'}`,
                    backgroundColor: filters.status === 'resolved' ? 'var(--sabha-success-bg)' : 'var(--sabha-bg-secondary)',
                    color: filters.status === 'resolved' ? 'var(--sabha-success-text)' : 'var(--sabha-text-secondary)',
                    fontSize: 'var(--sabha-text-xs)',
                    cursor: 'pointer',
                  }}
                  className="hover:scale-105 transition-transform"
                >
                  Resolved Only
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
