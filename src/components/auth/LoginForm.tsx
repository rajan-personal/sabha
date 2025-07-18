'use client';

import { useSession } from '@/lib/auth-client';
import { GoogleSignInButton } from './GoogleSignInButton';

export function LoginForm() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="text-center">
        <p className="text-gray-700 mb-4">You are already signed in.</p>
        <a 
          href="/dashboard"
          className="text-blue-600 hover:text-blue-800 underline font-medium"
        >
          Go to Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Sign In</h2>
      <GoogleSignInButton />
    </div>
  );
}
