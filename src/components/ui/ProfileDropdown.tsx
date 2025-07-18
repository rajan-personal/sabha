'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import { UserAvatar } from './UserAvatar';
import { LogoutButton } from '@/components/auth/LogoutButton';

export function ProfileDropdown() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!session) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--sabha-spacing-xs)',
          padding: 'var(--sabha-spacing-xs)',
          backgroundColor: isOpen ? 'var(--sabha-bg-tertiary)' : 'transparent',
          border: '1px solid var(--sabha-border-primary)',
          borderRadius: 'var(--sabha-radius-lg)',
          cursor: 'pointer',
          transition: 'var(--sabha-transition-fast)',
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.backgroundColor = 'var(--sabha-bg-tertiary)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        <UserAvatar user={session.user} size="sm" />
        <svg 
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          style={{ color: 'var(--sabha-text-secondary)' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 z-50"
          style={{
            backgroundColor: 'var(--sabha-bg-primary)',
            border: '1px solid var(--sabha-border-primary)',
            borderRadius: 'var(--sabha-radius-lg)',
            boxShadow: 'var(--sabha-shadow-lg)',
          }}
        >
          <div className="py-1">
            {/* User Info Section */}
            <div 
              style={{
                padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)',
                borderBottom: '1px solid var(--sabha-border-primary)',
              }}
            >
              <div className="flex items-center gap-3">
                <UserAvatar user={session.user} size="sm" />
                <div className="flex flex-col">
                  <span style={{ 
                    color: 'var(--sabha-text-primary)',
                    fontWeight: '500',
                    fontSize: '0.875rem'
                  }}>
                    {session.user.name}
                  </span>
                  <span style={{ 
                    color: 'var(--sabha-text-tertiary)',
                    fontSize: '0.75rem'
                  }}>
                    {session.user.email}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Menu Items */}
            <Link
              href="/profile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--sabha-spacing-sm)',
                padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)',
                color: 'var(--sabha-text-primary)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'var(--sabha-transition-fast)',
                borderRadius: 'var(--sabha-radius-md)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--sabha-bg-tertiary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>
            <div 
              style={{
                borderTop: '1px solid var(--sabha-border-primary)',
                margin: 'var(--sabha-spacing-xs) 0',
              }}
            />
            <div style={{ padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)' }}>
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
