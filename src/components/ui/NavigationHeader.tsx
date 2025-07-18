'use client';

import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';

interface NavigationHeaderProps {
  showDashboardLink?: boolean;
  showLogout?: boolean;
}

export function NavigationHeader({ showDashboardLink = true, showLogout = false }: NavigationHeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center mb-16">
      <h1 style={{ 
        fontSize: '1.875rem', 
        fontWeight: 'bold', 
        color: 'var(--sabha-text-primary)' 
      }}>
        <Link 
          href="/"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            transition: 'var(--sabha-transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--sabha-primary-600)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--sabha-text-primary)';
          }}
        >
          Sabha
        </Link>
      </h1>
      
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <div className="flex items-center gap-3">
              <UserAvatar user={session.user} size="sm" />
              <span style={{ color: 'var(--sabha-text-secondary)' }}>
                {session.user.name}
              </span>
            </div>
            
            {showDashboardLink && (
              <Link 
                href="/dashboard"
                style={{
                  backgroundColor: 'var(--sabha-primary-600)',
                  color: 'var(--sabha-text-inverse)',
                  padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-lg)',
                  borderRadius: 'var(--sabha-radius-lg)',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'var(--sabha-transition-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--sabha-primary-700)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--sabha-primary-600)';
                }}
              >
                Dashboard
              </Link>
            )}
            
            {showLogout && <LogoutButton />}
          </>
        ) : (
          <GoogleSignInButton size="sm" variant="compact" />
        )}
      </div>
    </header>
  );
}
