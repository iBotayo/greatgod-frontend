'use client';

import React from 'react';
import { useDb } from '../../components/provider/db-provider';
import { useAuth } from '../../components/provider/auth-provider';
import { NotificationItem } from '../../components/notifications/notification-item';
import { useRouter } from 'next/navigation';

export default function NotificationsPage() {
  const { db, setDb } = useDb();
  const { currentUser } = useAuth();
  const router = useRouter();

  if (!currentUser) {
    return (
      <div className="flex-grow w-full max-w-[560px] mx-auto px-margin-mobile py-stack-md flex flex-col justify-center items-center text-center">
        <span className="material-symbols-outlined text-4xl text-outline mb-4">lock</span>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Sign in to view notifications</h2>
        <button 
          onClick={() => router.push('/sign-in')}
          className="bg-primary text-white px-6 py-2 rounded uppercase font-label-sm tracking-widest text-sm"
        >
          Sign In
        </button>
      </div>
    );
  }

  const userNotifications = db.notifications
    .filter(n => n.userId === currentUser.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
  const unreadCount = userNotifications.filter(n => !n.read).length;

  const handleMarkAllAsRead = () => {
    if (unreadCount === 0) return;
    
    setDb(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => 
        n.userId === currentUser.id ? { ...n, read: true } : n
      )
    }));
  };

  return (
    <div className="flex-grow w-full max-w-[560px] mx-auto px-margin-mobile py-stack-md flex flex-col gap-stack-sm pb-32">
      <div className="flex justify-between items-end mb-unit border-b border-outline-variant pb-unit">
        <div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background">Notifications</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            {unreadCount === 1 ? '1 unread message' : `${unreadCount} unread messages`}
          </p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={handleMarkAllAsRead}
            className="font-label-sm text-label-sm text-primary hover:text-surface-tint transition-colors uppercase tracking-wider bg-transparent border-none p-0 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">done_all</span>
            Mark all as read
          </button>
        )}
      </div>

      {userNotifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-stack-lg text-center opacity-75">
          <span className="material-symbols-outlined text-4xl text-outline mb-4">notifications_off</span>
          <h3 className="font-headline-md text-headline-md text-on-surface-variant mb-2">You&apos;re all caught up</h3>
          <p className="font-body-md text-on-surface-variant">Check back later for new notifications.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-unit">
          {userNotifications.map(notification => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </div>
      )}

      {userNotifications.length > 0 && (
        <div className="mt-stack-sm text-center">
          <button className="font-label-sm text-label-sm text-primary uppercase tracking-wider bg-transparent border border-outline hover:border-primary px-6 py-3 rounded-full transition-colors w-full">
            View Older Notifications
          </button>
        </div>
      )}
    </div>
  );
}
