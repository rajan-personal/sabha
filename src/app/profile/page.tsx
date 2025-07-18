'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { Header } from '@/components/ui/Header';
import { useSession } from '@/lib/auth-client';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div style={{ 
        minHeight: '100vh', 
        background: 'var(--sabha-bg-secondary)' 
      }}>
        <div className="container mx-auto px-4 py-8">
          <Header />
          <ProfileContent />
        </div>
      </div>
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { data: session } = useSession();

  return (
    <>
      <div className="mb-8">
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 'bold',
          color: 'var(--sabha-text-primary)',
          marginBottom: 'var(--sabha-spacing-sm)'
        }}>
          Your Profile
        </h1>
        <p style={{ color: 'var(--sabha-text-secondary)' }}>
          Manage your profile information and account settings
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
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <UserAvatar user={session?.user || {}} size="xl" />
            <div>
              <h3 style={{
                fontWeight: '500',
                color: 'var(--sabha-text-primary)',
                fontSize: '1.125rem'
              }}>
                {session?.user.name}
              </h3>
              <p style={{
                color: 'var(--sabha-text-secondary)',
                marginBottom: 'var(--sabha-spacing-sm)'
              }}>
                {session?.user.email}
              </p>
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
          
          <div className="space-y-4">
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--sabha-text-secondary)',
                marginBottom: 'var(--sabha-spacing-sm)'
              }}>
                Bio
              </label>
              <textarea
                placeholder="Tell us about yourself..."
                style={{
                  width: '100%',
                  padding: 'var(--sabha-spacing-md)',
                  borderRadius: 'var(--sabha-radius-lg)',
                  border: '1px solid var(--sabha-border-primary)',
                  backgroundColor: 'var(--sabha-bg-secondary)',
                  color: 'var(--sabha-text-primary)',
                  fontSize: '0.875rem',
                  minHeight: '80px',
                  resize: 'vertical',
                  outline: 'none'
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--sabha-text-secondary)',
                marginBottom: 'var(--sabha-spacing-sm)'
              }}>
                Location
              </label>
              <input
                type="text"
                placeholder="Your location"
                style={{
                  width: '100%',
                  padding: 'var(--sabha-spacing-md)',
                  borderRadius: 'var(--sabha-radius-lg)',
                  border: '1px solid var(--sabha-border-primary)',
                  backgroundColor: 'var(--sabha-bg-secondary)',
                  color: 'var(--sabha-text-primary)',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <div style={{ marginLeft: 'var(--sabha-spacing-md)' }}>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--sabha-text-secondary)'
              }}>
                Topics Created
              </p>
              <p style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'var(--sabha-text-primary)'
              }}>
                12
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1M15 10V6a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2h2v4l4-4h2a2 2 0 002-2z" />
              </svg>
            </div>
            <div style={{ marginLeft: 'var(--sabha-spacing-md)' }}>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--sabha-text-secondary)'
              }}>
                Comments
              </p>
              <p style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'var(--sabha-text-primary)'
              }}>
                47
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div style={{ marginLeft: 'var(--sabha-spacing-md)' }}>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--sabha-text-secondary)'
              }}>
                Upvotes Received
              </p>
              <p style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'var(--sabha-text-primary)'
              }}>
                234
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
              backgroundColor: 'var(--sabha-warning-100)',
              borderRadius: 'var(--sabha-radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--sabha-warning-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div style={{ marginLeft: 'var(--sabha-spacing-md)' }}>
              <p style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--sabha-text-secondary)'
              }}>
                Reputation
              </p>
              <p style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: 'var(--sabha-text-primary)'
              }}>
                1,247
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <div>
              <p style={{
                fontWeight: '500',
                color: 'var(--sabha-text-primary)'
              }}>
                Created topic: &quot;How to optimize React performance&quot;
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--sabha-text-secondary)'
              }}>
                2 hours ago
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1M15 10V6a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2h2v4l4-4h2a2 2 0 002-2z" />
              </svg>
            </div>
            <div>
              <p style={{
                fontWeight: '500',
                color: 'var(--sabha-text-primary)'
              }}>
                Commented on &quot;Best practices for Next.js&quot;
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--sabha-text-secondary)'
              }}>
                5 hours ago
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
              backgroundColor: 'var(--sabha-accent-100)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', color: 'var(--sabha-accent-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <p style={{
                fontWeight: '500',
                color: 'var(--sabha-text-primary)'
              }}>
                Received 15 upvotes on your comment
              </p>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--sabha-text-secondary)'
              }}>
                1 day ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
