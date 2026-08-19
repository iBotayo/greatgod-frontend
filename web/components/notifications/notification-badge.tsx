'use client';

import React from 'react';
import Link from 'next/link';
import { useDb } from '../provider/db-provider';
import { useAuth } from '../provider/auth-provider';

export function NotificationBadge() {
  const { db } = useDb();
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  const userNotifications = db.notifications.filter((n) => n.userId === currentUser.id);
  const unreadCount = userNotifications.filter((n) => !n.read).length;

  return (
    <Link 
      href="/notifications" 
      className="relative text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors p-2 rounded-full flex items-center justify-center"
      aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
    >
      <span aria-hidden="true" className="material-symbols-outlined" style={unreadCount > 0 ? { fontVariationSettings: "'FILL' 1" } : {}}>
        notifications
      </span>
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-container shadow-[0_0_0_2px_rgba(255,248,247,1)] dark:shadow-[0_0_0_2px_rgba(239,212,209,1)]"></span>
        </span>
      )}
    </Link>
  );
}
