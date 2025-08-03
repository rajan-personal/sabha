'use client';

interface StatusBadgeProps {
  status: 'open' | 'in_review' | 'acknowledged' | 'resolved' | 'rejected';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function StatusBadge({ status, size = 'md', showIcon = true }: StatusBadgeProps) {
  const statusConfig = {
    open: {
      label: 'Open',
      icon: '🔓',
      bgColor: 'var(--sabha-info-bg)',
      textColor: 'var(--sabha-info-text)',
      borderColor: 'var(--sabha-info-border)',
    },
    in_review: {
      label: 'In Review',
      icon: '👀',
      bgColor: 'var(--sabha-warning-bg)',
      textColor: 'var(--sabha-warning-text)',
      borderColor: 'var(--sabha-warning-border)',
    },
    acknowledged: {
      label: 'Acknowledged',
      icon: '✅',
      bgColor: 'var(--sabha-primary-bg)',
      textColor: 'var(--sabha-primary-text)',
      borderColor: 'var(--sabha-primary-border)',
    },
    resolved: {
      label: 'Resolved',
      icon: '✨',
      bgColor: 'var(--sabha-success-bg)',
      textColor: 'var(--sabha-success-text)',
      borderColor: 'var(--sabha-success-border)',
    },
    rejected: {
      label: 'Rejected',
      icon: '❌',
      bgColor: 'var(--sabha-danger-bg)',
      textColor: 'var(--sabha-danger-text)',
      borderColor: 'var(--sabha-danger-border)',
    },
  };

  const config = statusConfig[status];
  const sizeConfig = {
    sm: {
      padding: 'var(--sabha-spacing-xs) var(--sabha-spacing-sm)',
      fontSize: 'var(--sabha-text-xs)',
      borderRadius: 'var(--sabha-radius-sm)',
    },
    md: {
      padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)',
      fontSize: 'var(--sabha-text-sm)',
      borderRadius: 'var(--sabha-radius-md)',
    },
    lg: {
      padding: 'var(--sabha-spacing-md) var(--sabha-spacing-lg)',
      fontSize: 'var(--sabha-text-base)',
      borderRadius: 'var(--sabha-radius-lg)',
    },
  };

  const sizing = sizeConfig[size];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: showIcon ? 'var(--sabha-spacing-xs)' : '0',
        padding: sizing.padding,
        fontSize: sizing.fontSize,
        fontWeight: 'var(--sabha-font-medium)',
        borderRadius: sizing.borderRadius,
        backgroundColor: config.bgColor,
        color: config.textColor,
        border: `1px solid ${config.borderColor}`,
        whiteSpace: 'nowrap',
      }}
    >
      {showIcon && <span>{config.icon}</span>}
      <span>{config.label}</span>
    </span>
  );
}
