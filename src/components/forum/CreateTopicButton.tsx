'use client';

import Link from 'next/link';

export function CreateTopicButton() {
  return (
    <Link
      href="/create-topic"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--sabha-spacing-sm)',
        padding: 'var(--sabha-spacing-md) var(--sabha-spacing-lg)',
        borderRadius: 'var(--sabha-radius-lg)',
        backgroundColor: 'var(--sabha-primary-600)',
        color: 'var(--sabha-text-inverse)',
        fontSize: '0.875rem',
        fontWeight: '600',
        textDecoration: 'none',
        transition: 'var(--sabha-transition-fast)',
        boxShadow: 'var(--sabha-shadow-sm)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--sabha-primary-700)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--sabha-primary-600)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      Create Post
    </Link>
  );
}
