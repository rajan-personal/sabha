'use client';

import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import { UserAvatar } from './UserAvatar';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center mb-16">
      <Link href="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ 
          fontSize: '1.875rem', 
          fontWeight: 'bold', 
          color: 'var(--sabha-text-primary)',
          margin: 0,
          cursor: 'pointer'
        }}>
          Sabha
        </h1>
      </Link>
      
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <div className="flex items-center gap-3">
              <UserAvatar 
                user={session.user} 
                size="sm"
              />
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
            
            <div className="flex items-center gap-3">
              {/* Main Navigation */}
              <div className="flex items-center gap-2">
                <Link 
                  href="/dashboard"
                  style={{
                    backgroundColor: 'var(--sabha-primary-600)',
                    color: 'var(--sabha-text-inverse)',
                    padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)',
                    borderRadius: 'var(--sabha-radius-lg)',
                    fontWeight: '500',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'var(--sabha-transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--sabha-primary-700)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--sabha-primary-600)';
                  }}
                >
                  📋 Topics
                </Link>
                <Link 
                  href="/profile"
                  style={{
                    backgroundColor: 'var(--sabha-accent-600)',
                    color: 'var(--sabha-text-inverse)',
                    padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)',
                    borderRadius: 'var(--sabha-radius-lg)',
                    fontWeight: '500',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'var(--sabha-transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--sabha-accent-700)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--sabha-accent-600)';
                  }}
                >
                  👤 Profile
                </Link>
              </div>
              
              {/* Logout Button */}
              <LogoutButton />
            </div>
          </>
        ) : (
          <GoogleSignInButton size="sm" variant="compact" />
        )}
      </div>
    </header>
  );
}
