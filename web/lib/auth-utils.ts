import { User, Role } from '../types';

/**
 * Explicit role hierarchy (highest to lowest).
 */
export const ROLE_HIERARCHY: Role[] = ['ADMIN', 'EDITOR', 'MODERATOR', 'AUTHOR', 'READER'];

/**
 * Determines the user's highest applicable role based on the explicit hierarchy.
 */
export function getHighestRole(user: User | null): Role | 'GUEST' {
  if (!user || !user.roles || user.roles.length === 0) return 'GUEST';
  
  for (const role of ROLE_HIERARCHY) {
    if (user.roles.includes(role)) {
      return role;
    }
  }
  
  return 'GUEST';
}

/**
 * Centralized redirect logic. Returns the appropriate primary dashboard URL
 * based on the user's highest role.
 */
export function getPrimaryDashboardUrl(user: User | null): string {
  const highestRole = getHighestRole(user);
  
  switch (highestRole) {
    case 'ADMIN': return '/admin';
    case 'EDITOR': return '/editor';
    case 'MODERATOR': return '/moderator';
    case 'AUTHOR': return '/author';
    case 'READER': return '/reader';
    case 'GUEST':
    default:
      return '/';
  }
}
