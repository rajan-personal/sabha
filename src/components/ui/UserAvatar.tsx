'use client';

import { useState } from 'react';

interface UserAvatarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function UserAvatar({ user, size = 'md', className = '' }: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);

  // Get initials from name or email
  const getInitials = () => {
    if (user.name) {
      return user.name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Size mappings
  const sizeClasses = {
    sm: {
      container: '2rem',
      text: '0.75rem',
    },
    md: {
      container: '2.5rem',
      text: '1rem',
    },
    lg: {
      container: '3rem',
      text: '1.125rem',
    },
    xl: {
      container: '4rem',
      text: '1.5rem',
    },
  };

  const sizeStyle = sizeClasses[size];

  const containerStyle = {
    width: sizeStyle.container,
    height: sizeStyle.container,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative' as const,
  };

  // Show image if available and not errored
  if (user.image && !imageError) {
    return (
      <div style={containerStyle} className={className}>
        <img
          src={user.image}
          alt={user.name || user.email || 'User avatar'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // Show initials placeholder
  return (
    <div
      style={{
        ...containerStyle,
        backgroundColor: 'var(--sabha-primary-100)',
        color: 'var(--sabha-primary-700)',
        fontSize: sizeStyle.text,
        fontWeight: '600',
        border: '2px solid var(--sabha-primary-200)',
      }}
      className={className}
    >
      {getInitials()}
    </div>
  );
}
