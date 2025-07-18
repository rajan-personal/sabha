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
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
            Sign Out
        </button>
    );
}
