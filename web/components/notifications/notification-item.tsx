'use client';

import React from 'react';
import { Notification } from '../../types';
import { useDb } from '../provider/db-provider';
import { useRouter } from 'next/navigation';

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const { db, setDb } = useDb();
  const router = useRouter();

  const handleNotificationClick = () => {
    // Mark as read if unread
    if (!notification.read) {
      setDb(prev => ({
        ...prev,
        notifications: prev.notifications.map(n => 
          n.id === notification.id ? { ...n, read: true } : n
        )
      }));
    }
    
    // Navigate if there's a link
    if (notification.link) {
      router.push(notification.link);
    }
  };

  // Helper for formatting time
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 172800) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Split message to title and body if it contains a colon
  const messageParts = notification.message.split(': ');
  const title = messageParts.length > 1 ? messageParts[0] : (notification.type === 'system' ? 'System Notice' : 'Notification');
  const body = messageParts.length > 1 ? messageParts.slice(1).join(': ') : notification.message;

  // Type specific icons and labels
  let iconName = 'notifications';
  let typeLabel = 'Notification';
  
  if (notification.type === 'devotional') {
    iconName = 'book';
    typeLabel = 'New Devotional';
  } else if (notification.type === 'reading_plan') {
    iconName = 'calendar_month';
    typeLabel = 'Reading Plan Reminder';
  } else if (notification.type === 'security') {
    iconName = 'security';
    typeLabel = 'Account Security';
  } else if (notification.type === 'donation') {
    iconName = 'volunteer_activism';
    typeLabel = 'Stewardship';
  } else if (notification.type === 'system') {
    iconName = 'info';
    typeLabel = 'System';
  }

  if (notification.read) {
    return (
      <div 
        onClick={handleNotificationClick}
        className="relative bg-surface border border-outline-variant p-4 rounded-DEFAULT hover:border-outline transition-colors cursor-pointer group flex gap-4 opacity-75"
      >
        <div className="flex-shrink-0 mt-1">
          <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined">{iconName}</span>
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{typeLabel}</span>
            <span className="font-label-sm text-label-sm text-outline text-[11px]">{formatTime(notification.createdAt)}</span>
          </div>
          <h3 className="font-body-lg text-body-lg text-on-surface-variant leading-tight mb-2">{title}</h3>
          <p className="font-body-md text-body-md text-outline text-sm line-clamp-2">{body}</p>
        </div>
      </div>
    );
  }

  // Unread notification styling
  return (
    <div 
      onClick={handleNotificationClick}
      className="relative bg-surface-linen border-l-[3px] border-l-primary border-y border-r border-outline-variant p-4 rounded-r-DEFAULT hover:border-r-outline hover:border-y-outline transition-colors cursor-pointer group flex gap-4"
    >
      <div className="absolute left-[-1.5px] top-4 w-2 h-2 rounded-full bg-primary-container shadow-[0_0_0_4px_rgba(245,243,238,1)] dark:shadow-[0_0_0_4px_rgba(38,24,23,1)]"></div>
      <div className="flex-shrink-0 mt-1">
        <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{iconName}</span>
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-1">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">{typeLabel}</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">{formatTime(notification.createdAt)}</span>
        </div>
        <h3 className="font-body-lg text-body-lg text-on-background font-semibold leading-tight mb-2">{title}</h3>
        <p className="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-2">{body}</p>
      </div>
    </div>
  );
}
