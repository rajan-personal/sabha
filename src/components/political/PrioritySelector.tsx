'use client';

interface PrioritySelectorProps {
  value: 'low' | 'medium' | 'high';
  onChange: (value: 'low' | 'medium' | 'high') => void;
  disabled?: boolean;
}

export function PrioritySelector({ value, onChange, disabled = false }: PrioritySelectorProps) {
  const priorities = [
    {
      value: 'low' as const,
      label: 'Low Priority',
      description: 'Can be addressed over time',
      icon: '🟢',
      color: 'var(--sabha-success-bg)',
      borderColor: 'var(--sabha-success-border)',
    },
    {
      value: 'medium' as const,
      label: 'Medium Priority',
      description: 'Needs attention in reasonable time',
      icon: '🟡',
      color: 'var(--sabha-warning-bg)',
      borderColor: 'var(--sabha-warning-border)',
    },
    {
      value: 'high' as const,
      label: 'High Priority',
      description: 'Requires immediate attention',
      icon: '🔴',
      color: 'var(--sabha-danger-bg)',
      borderColor: 'var(--sabha-danger-border)',
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {priorities.map((priority) => (
          <button
            key={priority.value}
            type="button"
            onClick={() => !disabled && onChange(priority.value)}
            disabled={disabled}
            style={{
              padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)',
              borderRadius: 'var(--sabha-radius-md)',
              border: `2px solid ${value === priority.value ? priority.borderColor : 'var(--sabha-border-primary)'}`,
              backgroundColor: value === priority.value ? priority.color : 'var(--sabha-bg-primary)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'var(--sabha-transition-fast)',
              opacity: disabled ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--sabha-spacing-xs)',
            }}
            className="hover:scale-105 active:scale-95"
          >
            <span>{priority.icon}</span>
            <span style={{
              color: 'var(--sabha-text-primary)',
              fontSize: 'var(--sabha-text-sm)',
              fontWeight: value === priority.value ? 'var(--sabha-font-semibold)' : 'var(--sabha-font-medium)',
            }}>
              {priority.label}
            </span>
          </button>
        ))}
      </div>
      
      <div style={{
        color: 'var(--sabha-text-secondary)',
        fontSize: 'var(--sabha-text-xs)',
        marginTop: 'var(--sabha-spacing-xs)'
      }}>
        {priorities.find(p => p.value === value)?.description}
      </div>
    </div>
  );
}
