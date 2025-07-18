'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { Header } from '@/components/ui/Header';
import { useSession } from '@/lib/auth-client';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { data: session } = useSession();

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--sabha-bg-secondary)' 
    }}>
      <div className="container mx-auto px-4 py-8">
        <Header />

        <div className="mb-8">
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            color: 'var(--sabha-text-primary)',
            marginBottom: 'var(--sabha-spacing-sm)'
          }}>
            Welcome back, {session?.user.name}!
          </h1>
          <p style={{ color: 'var(--sabha-text-secondary)' }}>
            Here's your dashboard overview
          </p>
        </div>

        {/* User Info Card */}
        <div style={{
          backgroundColor: 'var(--sabha-bg-primary)',
          borderRadius: 'var(--sabha-radius-lg)',
          boxShadow: 'var(--sabha-shadow-sm)',
          border: '1px solid var(--sabha-border-primary)',
          padding: 'var(--sabha-spacing-xl)',
          marginBottom: 'var(--sabha-spacing-xl)'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: 'var(--sabha-spacing-md)',
            color: 'var(--sabha-text-primary)'
          }}>
            Profile Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4">
              <UserAvatar user={session?.user || {}} size="xl" />
              <div>
                <h3 style={{
                  fontWeight: '500',
                  color: 'var(--sabha-text-primary)'
                }}>
                  {session?.user.name}
                </h3>
                <p style={{
                  color: 'var(--sabha-text-secondary)'
                }}>
                  {session?.user.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--sabha-radius-2xl)',
                fontSize: '0.75rem',
                fontWeight: '500',
                backgroundColor: 'var(--sabha-success-100)',
                color: 'var(--sabha-success-700)'
              }}>
                ✓ Verified
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div style={{
            backgroundColor: 'var(--sabha-bg-primary)',
            padding: 'var(--sabha-spacing-xl)',
            borderRadius: 'var(--sabha-radius-lg)',
            boxShadow: 'var(--sabha-shadow-sm)',
            border: '1px solid var(--sabha-border-primary)'
          }}>
            <div className="flex items-center">
              <div style={{
                width: '2rem',
                height: '2rem',
                backgroundColor: 'var(--sabha-primary-100)',
                borderRadius: 'var(--sabha-radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--sabha-primary-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div style={{ marginLeft: 'var(--sabha-spacing-md)' }}>
                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--sabha-text-secondary)'
                }}>
                  Active Sessions
                </p>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--sabha-text-primary)'
                }}>
                  1
                </p>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--sabha-bg-primary)',
            padding: 'var(--sabha-spacing-xl)',
            borderRadius: 'var(--sabha-radius-lg)',
            boxShadow: 'var(--sabha-shadow-sm)',
            border: '1px solid var(--sabha-border-primary)'
          }}>
            <div className="flex items-center">
              <div style={{
                width: '2rem',
                height: '2rem',
                backgroundColor: 'var(--sabha-success-100)',
                borderRadius: 'var(--sabha-radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--sabha-success-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div style={{ marginLeft: 'var(--sabha-spacing-md)' }}>
                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--sabha-text-secondary)'
                }}>
                  Account Status
                </p>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--sabha-text-primary)'
                }}>
                  Active
                </p>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--sabha-bg-primary)',
            padding: 'var(--sabha-spacing-xl)',
            borderRadius: 'var(--sabha-radius-lg)',
            boxShadow: 'var(--sabha-shadow-sm)',
            border: '1px solid var(--sabha-border-primary)'
          }}>
            <div className="flex items-center">
              <div style={{
                width: '2rem',
                height: '2rem',
                backgroundColor: 'var(--sabha-accent-100)',
                borderRadius: 'var(--sabha-radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--sabha-accent-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div style={{ marginLeft: 'var(--sabha-spacing-md)' }}>
                <p style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--sabha-text-secondary)'
                }}>
                  Last Login
                </p>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--sabha-text-primary)'
                }}>
                  Today
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{
          backgroundColor: 'var(--sabha-bg-primary)',
          borderRadius: 'var(--sabha-radius-lg)',
          boxShadow: 'var(--sabha-shadow-sm)',
          border: '1px solid var(--sabha-border-primary)',
          padding: 'var(--sabha-spacing-xl)'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            marginBottom: 'var(--sabha-spacing-md)',
            color: 'var(--sabha-text-primary)'
          }}>
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--sabha-spacing-md)',
              padding: 'var(--sabha-spacing-md)',
              backgroundColor: 'var(--sabha-bg-tertiary)',
              borderRadius: 'var(--sabha-radius-lg)'
            }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: 'var(--sabha-primary-100)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--sabha-primary-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <div>
                <p style={{
                  fontWeight: '500',
                  color: 'var(--sabha-text-primary)'
                }}>
                  Signed in via Google
                </p>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--sabha-text-secondary)'
                }}>
                  Just now
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--sabha-spacing-md)',
              padding: 'var(--sabha-spacing-md)',
              backgroundColor: 'var(--sabha-bg-tertiary)',
              borderRadius: 'var(--sabha-radius-lg)'
            }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: 'var(--sabha-success-100)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--sabha-success-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p style={{
                  fontWeight: '500',
                  color: 'var(--sabha-text-primary)'
                }}>
                  Account created
                </p>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--sabha-text-secondary)'
                }}>
                  Welcome to Sabha!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
