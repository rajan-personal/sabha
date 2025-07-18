'use client';

import { ReactNode } from 'react';

// Better Auth React doesn't require a provider wrapper
// The hooks and functions work directly
export function AuthProvider({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
