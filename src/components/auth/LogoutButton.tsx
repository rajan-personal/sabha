'use client';

import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push('/');
                    },
                },
            });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (!session) {
        return null;
    }

    return (
        <button
            onClick={handleLogout}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--sabha-spacing-sm)',
                padding: 'var(--sabha-spacing-sm) 0',
                color: 'var(--sabha-text-primary)',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'var(--sabha-transition-fast)',
                borderRadius: 'var(--sabha-radius-md)',
                width: '100%',
                textAlign: 'left'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--sabha-bg-tertiary)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
            }}
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
        </button>
    );
}
