'use client';

interface GovernanceLevelSelectorProps {
  value: 'national' | 'state' | 'local' | '';
  onChange: (value: 'national' | 'state' | 'local') => void;
  disabled?: boolean;
}

export function GovernanceLevelSelector({ value, onChange, disabled = false }: GovernanceLevelSelectorProps) {
  const levels = [
    {
      value: 'national' as const,
      label: 'National',
      description: 'Central government, national policies',
      icon: '🏛️',
      examples: 'Parliament, Prime Minister, Central Ministries'
    },
    {
      value: 'state' as const,
      label: 'State',
      description: 'State government, regional policies',
      icon: '🏢',
      examples: 'State Assembly, Chief Minister, State Departments'
    },
    {
      value: 'local' as const,
      label: 'Local',
      description: 'City/municipal, local governance',
      icon: '🏘️',
      examples: 'Municipal Corporation, Mayor, Local Authorities'
    },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {levels.map((level) => (
          <button
            key={level.value}
            type="button"
            onClick={() => !disabled && onChange(level.value)}
            disabled={disabled}
            style={{
              padding: 'var(--sabha-spacing-md)',
              borderRadius: 'var(--sabha-radius-lg)',
              border: `2px solid ${value === level.value ? 'var(--sabha-primary-border)' : 'var(--sabha-border-primary)'}`,
              backgroundColor: value === level.value ? 'var(--sabha-primary-bg)' : 'var(--sabha-bg-primary)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'var(--sabha-transition-fast)',
              opacity: disabled ? 0.6 : 1,
              textAlign: 'left' as const,
            }}
            className="hover:scale-105 active:scale-95"
          >
            <div className="flex items-start space-x-3">
              <span style={{ fontSize: '1.5rem' }}>{level.icon}</span>
              <div className="flex-1">
                <div style={{
                  color: 'var(--sabha-text-primary)',
                  fontSize: 'var(--sabha-text-base)',
                  fontWeight: 'var(--sabha-font-semibold)',
                  marginBottom: '0.25rem'
                }}>
                  {level.label}
                </div>
                <div style={{
                  color: 'var(--sabha-text-secondary)',
                  fontSize: 'var(--sabha-text-sm)',
                  marginBottom: '0.5rem',
                  lineHeight: '1.4'
                }}>
                  {level.description}
                </div>
                <div style={{
                  color: 'var(--sabha-text-tertiary)',
                  fontSize: 'var(--sabha-text-xs)',
                  fontStyle: 'italic',
                  lineHeight: '1.3'
                }}>
                  e.g., {level.examples}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
