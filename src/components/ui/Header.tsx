'use client';

import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import { ProfileDropdown } from './ProfileDropdown';
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
          <ProfileDropdown />
        ) : (
          <GoogleSignInButton size="sm" variant="compact" />
        )}
      </div>
    </header>
  );
}
