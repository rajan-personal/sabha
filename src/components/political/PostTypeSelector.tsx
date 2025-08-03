'use client';

interface PostTypeSelectorProps {
  value: 'issue' | 'feedback' | 'suggestion' | '';
  onChange: (value: 'issue' | 'feedback' | 'suggestion') => void;
  disabled?: boolean;
}

export function PostTypeSelector({ value, onChange, disabled = false }: PostTypeSelectorProps) {
  const postTypes = [
    {
      value: 'issue' as const,
      label: 'Issue',
      description: 'Report a problem that needs government attention',
      icon: '⚠️',
      color: 'var(--sabha-danger-bg)',
      borderColor: 'var(--sabha-danger-border)',
    },
    {
      value: 'feedback' as const,
      label: 'Feedback',
      description: 'Share your thoughts on policies or government actions',
      icon: '💬',
      color: 'var(--sabha-primary-bg)',
      borderColor: 'var(--sabha-primary-border)',
    },
    {
      value: 'suggestion' as const,
      label: 'Suggestion',
      description: 'Propose improvements or new initiatives',
      icon: '💡',
      color: 'var(--sabha-success-bg)',
      borderColor: 'var(--sabha-success-border)',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {postTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => !disabled && onChange(type.value)}
            disabled={disabled}
            style={{
              padding: 'var(--sabha-spacing-md)',
              borderRadius: 'var(--sabha-radius-lg)',
              border: `2px solid ${value === type.value ? type.borderColor : 'var(--sabha-border-primary)'}`,
              backgroundColor: value === type.value ? type.color : 'var(--sabha-bg-primary)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'var(--sabha-transition-fast)',
              opacity: disabled ? 0.6 : 1,
              textAlign: 'left' as const,
            }}
            className="hover:scale-105 active:scale-95"
          >
            <div className="flex items-start space-x-3">
              <span style={{ fontSize: '1.5rem' }}>{type.icon}</span>
              <div className="flex-1">
                <div style={{
                  color: 'var(--sabha-text-primary)',
                  fontSize: 'var(--sabha-text-base)',
                  fontWeight: 'var(--sabha-font-semibold)',
                  marginBottom: '0.25rem'
                }}>
                  {type.label}
                </div>
                <div style={{
                  color: 'var(--sabha-text-secondary)',
                  fontSize: 'var(--sabha-text-sm)',
                  lineHeight: '1.4'
                }}>
                  {type.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
