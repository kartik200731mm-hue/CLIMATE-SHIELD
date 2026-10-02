import React from 'react';

/**
 * Premium UserAvatar Component
 * Supports custom image URLs, initials generation with high-contrast gradient,
 * online status indicator, and size presets (sm: 36px, md: 48px, lg: 72px, xl: 96px).
 */
export default function UserAvatar({ 
  user, 
  size = 'md', 
  className = '', 
  showStatus = true,
  statusColor = '#10b981' 
}) {
  const rawName = typeof user?.name === 'string' ? user.name : (typeof user?.email === 'string' ? user.email : 'User');
  const name = (rawName && typeof rawName === 'string' ? rawName : 'User').trim();
  
  // Extract 1-2 initials
  const initials = (name || 'U')
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'U';

  const sizeDimensions = {
    sm: { size: 36, fontSize: '0.8rem', border: '1.5px', statusSize: 8 },
    md: { size: 48, fontSize: '1rem', border: '2px', statusSize: 10 },
    lg: { size: 72, fontSize: '1.5rem', border: '2.5px', statusSize: 13 },
    xl: { size: 96, fontSize: '2rem', border: '3px', statusSize: 16 }
  };

  const config = sizeDimensions[size] || sizeDimensions.md;

  const avatarStyle = {
    width: `${config.size}px`,
    height: `${config.size}px`,
    minWidth: `${config.size}px`,
    minHeight: `${config.size}px`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    fontWeight: 700,
    fontSize: config.fontSize,
    letterSpacing: '0.04em',
    color: '#ffffff',
    border: `${config.border} solid var(--border)`,
    boxShadow: '0 2px 8px rgba(32, 37, 34, 0.08)',
    background: 'linear-gradient(135deg, #607D68 0%, #4F8061 100%)',
    userSelect: 'none',
    overflow: 'visible'
  };

  return (
    <div className={`user-avatar-wrapper ${className}`} style={avatarStyle} title={name}>
      {user?.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            // Fallback to initials if image fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <span>{initials}</span>
      )}

      {showStatus && (
        <span
          className="avatar-status-dot"
          style={{
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: `${config.statusSize}px`,
            height: `${config.statusSize}px`,
            borderRadius: '50%',
            backgroundColor: statusColor || 'var(--success)',
            border: '2px solid #FFFFFF',
            boxShadow: '0 1px 3px rgba(32, 37, 34, 0.15)'
          }}
        />
      )}
    </div>
  );
}
