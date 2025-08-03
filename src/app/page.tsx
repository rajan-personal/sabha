'use client';

import { useSession } from '@/lib/auth-client';
import { Header } from '@/components/ui/Header';
import { TopicList } from '@/components/forum/TopicList';
import { CreateTopicButton } from '@/components/forum/CreateTopicButton';
import { LocationSelector } from '@/components/political/LocationSelector';
import { useState, useEffect } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'national' | 'state' | 'local'>('national');
  const [selectedState, setSelectedState] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTab = localStorage.getItem('sabha-active-tab') as 'national' | 'state' | 'local';
      const savedState = localStorage.getItem('sabha-selected-state');
      const savedLocation = localStorage.getItem('sabha-selected-location');

      if (savedTab) setActiveTab(savedTab);
      if (savedState) setSelectedState(savedState);
      if (savedLocation) setSelectedLocation(savedLocation);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sabha-active-tab', activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sabha-selected-state', selectedState);
    }
  }, [selectedState]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sabha-selected-location', selectedLocation);
    }
  }, [selectedLocation]);

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
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </div>
    </div>
  );
}

function HomeContent({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  selectedState,
  setSelectedState,
  selectedLocation,
  setSelectedLocation
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: 'national' | 'state' | 'local';
  setActiveTab: (tab: 'national' | 'state' | 'local') => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}) {
  const { data: session } = useSession();

  const handleTabChange = (tab: 'national' | 'state' | 'local') => {
    setActiveTab(tab);
    // Reset location selections when changing tabs
    if (tab === 'national') {
      setSelectedState('');
      setSelectedLocation('');
    } else if (tab === 'state') {
      setSelectedLocation('');
    }
  };

  const handleLocationChange = (value: string) => {
    if (activeTab === 'state') {
      setSelectedState(value);
    } else if (activeTab === 'local') {
      setSelectedLocation(value);
    }
  };

  const getLocationValue = () => {
    if (activeTab === 'state') return selectedState;
    if (activeTab === 'local') return selectedLocation;
    return '';
  };

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

        {/* Governance Level Tabs */}
        <div className="mb-6">
          <div 
            className="flex space-x-1 rounded-lg p-1 border" 
            style={{
              backgroundColor: 'var(--sabha-bg-primary)',
              borderColor: 'var(--sabha-border-primary)'
            }}
          >
            {[
              { key: 'national', label: 'National', icon: '🏛️' },
              { key: 'state', label: 'State', icon: '🏢' },
              { key: 'local', label: 'Local', icon: '🏘️' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key as 'national' | 'state' | 'local')}
                style={{
                  flex: 1,
                  padding: 'var(--sabha-spacing-md)',
                  borderRadius: 'var(--sabha-radius-md)',
                  border: 'none',
                  fontSize: 'var(--sabha-text-base)',
                  fontWeight: activeTab === tab.key ? '600' : '400',
                  backgroundColor: activeTab === tab.key ? 'var(--sabha-primary-500)' : 'transparent',
                  color: activeTab === tab.key ? 'white' : 'var(--sabha-text-primary)',
                  cursor: 'pointer',
                  transition: 'var(--sabha-transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--sabha-spacing-sm)'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.key) {
                    e.currentTarget.style.backgroundColor = 'var(--sabha-primary-50)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.key) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {activeTab === tab.key && (
                  <span style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    width: '6px',
                    height: '6px'
                  }} />
                )}
              </button>
            ))}
          </div>

          {/* Location Selector for State and Local tabs */}
          {(activeTab === 'state' || activeTab === 'local') && (
            <div className="mt-4">
              <LocationSelector
                value={getLocationValue()}
                onChange={handleLocationChange}
                governanceLevel={activeTab}
                required={false}
              />
            </div>
          )}
        </div>
      </div>

      {/* Topics List */}
      <TopicList 
        searchQuery={searchQuery}
        governanceLevel={activeTab}
        location={activeTab === 'state' ? selectedState : activeTab === 'local' ? selectedLocation : undefined}
      />
    </>
  );
}
