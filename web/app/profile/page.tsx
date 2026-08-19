'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../components/provider/auth-provider';

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, isAuthReady } = useAuth();

  useEffect(() => {
    if (isAuthReady && !currentUser) {
      router.replace('/sign-in');
    }
  }, [currentUser, isAuthReady, router]);

  if (!isAuthReady || !currentUser) return null;

  return (
    <div className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile py-stack-lg">
      <section className="bg-surface border border-outline-variant rounded-xl p-6 md:p-8 shadow-sm" aria-labelledby="profile-heading">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          {currentUser.avatarUrl ? (
            <img src={currentUser.avatarUrl} alt="" className="h-20 w-20 rounded-full object-cover border border-outline-variant" />
          ) : (
            <div className="h-20 w-20 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-headline-md" aria-hidden="true">
              {currentUser.name.charAt(0)}
            </div>
          )}
          <div>
            <p className="font-label-sm uppercase tracking-widest text-on-surface-variant">My Profile</p>
            <h1 id="profile-heading" className="font-headline-lg text-primary">{currentUser.name}</h1>
            <p className="font-body-md text-on-surface-variant">{currentUser.email}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-outline-variant pt-6">
          <h2 className="font-headline-md text-primary">Roles</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {currentUser.roles.map(role => (
              <span key={role} className="rounded-full bg-surface-container-low px-3 py-1 font-label-sm text-on-surface">
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}