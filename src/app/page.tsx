'use client';

import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900">Sabha</h1>
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="text-gray-700">Welcome, {session.user.name}!</span>
                <Link 
                  href="/dashboard"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <Link 
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Sabha
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            A modern web application built with Next.js, Better Auth, and Drizzle ORM. 
            Experience seamless authentication and powerful features.
          </p>
          
          {!session && (
            <div className="max-w-md mx-auto">
              <GoogleSignInButton />
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Fast & Secure</h3>
            <p className="text-gray-700">Built with modern technologies for optimal performance and security.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Easy Authentication</h3>
            <p className="text-gray-700">Simple Google OAuth integration for seamless user experience.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Powerful Dashboard</h3>
            <p className="text-gray-700">Comprehensive dashboard with user management and analytics.</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-700">
          <p>&copy; 2025 Sabha. Built with Next.js, Better Auth, and Drizzle ORM.</p>
        </footer>
      </div>
    </div>
  );
}
