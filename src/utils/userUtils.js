/**
 * User Identity Utilities: Ensures consistent user display name and initials across Vistara.
 */

export function getInitials(name) {
  if (!name || typeof name !== 'string') return 'U';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getDisplayName(user) {
  if (!user) return 'Vistara Member';
  if (typeof user === 'string') return user.trim();
  return user.name?.trim() || 'Vistara Member';
}

export function getFirstName(user) {
  if (!user) return 'Seeker';
  const name = typeof user === 'string' ? user : user.name;
  if (!name || typeof name !== 'string') return 'Seeker';
  return name.trim().split(/\s+/)[0];
}
