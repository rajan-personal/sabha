'use client';

interface VoteButtonProps {
  type: 'upvote' | 'downvote';
  count: number;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}

export function VoteButton({ type, count, onClick, disabled = false, active = false }: VoteButtonProps) {
  const isUpvote = type === 'upvote';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
        padding: 'var(--sabha-spacing-sm)',
        borderRadius: 'var(--sabha-radius-md)',
        border: '1px solid var(--sabha-border-primary)',
        backgroundColor: active 
          ? (isUpvote ? 'var(--sabha-success-100)' : 'var(--sabha-error-100)')
          : 'var(--sabha-bg-secondary)',
        color: active 
          ? (isUpvote ? 'var(--sabha-success-700)' : 'var(--sabha-error-700)')
          : 'var(--sabha-text-secondary)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'var(--sabha-transition-fast)',
        opacity: disabled ? 0.5 : 1,
        minWidth: '2.5rem'
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = isUpvote 
            ? 'var(--sabha-success-50)' 
            : 'var(--sabha-error-50)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = active 
            ? (isUpvote ? 'var(--sabha-success-100)' : 'var(--sabha-error-100)')
            : 'var(--sabha-bg-secondary)';
        }
      }}
    >
      <svg 
        style={{ 
          width: '1.25rem', 
          height: '1.25rem',
          transform: isUpvote ? 'none' : 'rotate(180deg)'
        }} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 15l7-7 7 7" 
        />
      </svg>
      <span style={{
        fontSize: '0.875rem',
        fontWeight: '600'
      }}>
        {count}
      </span>
    </button>
  );
}
