'use client';

import { useSession } from '@/lib/auth-client';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { Header } from '@/components/ui/Header';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--sabha-bg-gradient)' 
    }}>
      <div className="container mx-auto px-4 py-8">
        <Header />

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 style={{ 
            fontSize: '3rem', 
            fontWeight: 'bold', 
            color: 'var(--sabha-text-primary)', 
            marginBottom: 'var(--sabha-spacing-xl)' 
          }}>
            Welcome to Sabha
          </h2>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--sabha-text-secondary)', 
            marginBottom: 'var(--sabha-spacing-2xl)', 
            maxWidth: '42rem', 
            margin: '0 auto var(--sabha-spacing-2xl)' 
          }}>
            A modern web application built with Next.js, Better Auth, and Drizzle ORM. 
            Experience seamless authentication and powerful features.
          </p>
          
          {!session && (
            <div className="max-w-md mx-auto">
              <GoogleSignInButton size="lg" fullWidth />
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div style={{
            backgroundColor: 'var(--sabha-bg-primary)',
            padding: 'var(--sabha-spacing-xl)',
            borderRadius: 'var(--sabha-radius-lg)',
            boxShadow: 'var(--sabha-shadow-sm)',
            border: '1px solid var(--sabha-border-primary)',
          }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              backgroundColor: 'var(--sabha-primary-50)',
              borderRadius: 'var(--sabha-radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--sabha-spacing-lg)',
            }}>
              <svg style={{ width: '1.5rem', height: '1.5rem', color: 'var(--sabha-primary-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: 'var(--sabha-spacing-sm)',
              color: 'var(--sabha-text-primary)',
            }}>
              Fast & Secure
            </h3>
            <p style={{ color: 'var(--sabha-text-secondary)' }}>
              Built with modern technologies for optimal performance and security.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--sabha-bg-primary)',
            padding: 'var(--sabha-spacing-xl)',
            borderRadius: 'var(--sabha-radius-lg)',
            boxShadow: 'var(--sabha-shadow-sm)',
            border: '1px solid var(--sabha-border-primary)',
          }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              backgroundColor: 'var(--sabha-success-50)',
              borderRadius: 'var(--sabha-radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--sabha-spacing-lg)',
            }}>
              <svg style={{ width: '1.5rem', height: '1.5rem', color: 'var(--sabha-success-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: 'var(--sabha-spacing-sm)',
              color: 'var(--sabha-text-primary)',
            }}>
              Easy Authentication
            </h3>
            <p style={{ color: 'var(--sabha-text-secondary)' }}>
              Simple Google OAuth integration for seamless user experience.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--sabha-bg-primary)',
            padding: 'var(--sabha-spacing-xl)',
            borderRadius: 'var(--sabha-radius-lg)',
            boxShadow: 'var(--sabha-shadow-sm)',
            border: '1px solid var(--sabha-border-primary)',
          }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              backgroundColor: 'var(--sabha-accent-50)',
              borderRadius: 'var(--sabha-radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--sabha-spacing-lg)',
            }}>
              <svg style={{ width: '1.5rem', height: '1.5rem', color: 'var(--sabha-accent-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: 'var(--sabha-spacing-sm)',
              color: 'var(--sabha-text-primary)',
            }}>
              Powerful Dashboard
            </h3>
            <p style={{ color: 'var(--sabha-text-secondary)' }}>
              Comprehensive dashboard with user management and analytics.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center">
          <p style={{ color: 'var(--sabha-text-secondary)' }}>
            &copy; 2025 Sabha. Built with Next.js, Better Auth, and Drizzle ORM.
          </p>
        </footer>
      </div>
    </div>
  );
}
