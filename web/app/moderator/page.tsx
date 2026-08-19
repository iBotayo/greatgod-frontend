'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../components/provider/auth-provider';

export default function ModeratorDashboardPage() {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col gap-stack-md w-full">
      {/* Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant pb-6 mt-4">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-2">
            Good morning, {currentUser?.name?.split(' ')[0] || 'Moderator'}.
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Here is the current state of community discourse.</p>
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6 flex flex-col gap-2 relative overflow-hidden group hover:border-outline transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant">TOTAL COMMENTS TODAY</span>
            <span className="material-symbols-outlined text-secondary opacity-70">chat_bubble</span>
          </div>
          <span className="font-display-lg text-display-lg text-on-background">1,248</span>
          <div className="flex items-center gap-1 text-label-sm font-label-sm mt-1">
            <span className="material-symbols-outlined text-[16px] text-[#4a7c59]">trending_up</span>
            <span className="text-[#4a7c59]">+12% from yesterday</span>
          </div>
        </div>

        <div className="bg-surface-container border border-outline-variant rounded-lg p-6 flex flex-col gap-2 relative overflow-hidden group hover:border-outline transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-surface-variant opacity-30 pointer-events-none"></div>
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant">PENDING IN QUEUE</span>
            <span className="material-symbols-outlined text-secondary opacity-70">pending_actions</span>
          </div>
          <span className="font-display-lg text-display-lg text-on-background">42</span>
          <div className="flex items-center gap-1 text-label-sm font-label-sm mt-1">
            <span className="material-symbols-outlined text-[16px] text-tertiary-container">info</span>
            <span className="text-on-surface-variant">Requires attention</span>
          </div>
          <Link href="/moderator/queue" className="absolute bottom-6 right-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6 flex flex-col gap-2 relative overflow-hidden group hover:border-outline transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant">REPORTED COMMENTS</span>
            <span className="material-symbols-outlined text-error opacity-70">report</span>
          </div>
          <span className="font-display-lg text-display-lg text-error">15</span>
          <div className="flex items-center gap-1 text-label-sm font-label-sm mt-1">
            <span className="material-symbols-outlined text-[16px] text-error">warning</span>
            <span className="text-error">High priority flags</span>
          </div>
        </div>

        <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6 flex flex-col gap-2 relative overflow-hidden group hover:border-outline transition-colors">
          <div className="flex justify-between items-start mb-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant">FLAGGED USERS</span>
            <span className="material-symbols-outlined text-secondary opacity-70">person_off</span>
          </div>
          <span className="font-display-lg text-display-lg text-on-background">3</span>
          <div className="flex items-center gap-1 text-label-sm font-label-sm mt-1">
            <span className="text-on-surface-variant">Pending review</span>
          </div>
        </div>
      </section>

      {/* Main Content Area (Split Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-stack-lg">
        
        {/* Left Column: Activity Log */}
        <section className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-outline-variant pb-2">
            <h3 className="font-headline-md text-[22px] text-on-background">Recent Activity</h3>
            <Link className="font-label-sm text-label-sm text-primary hover:underline transition-all" href="#">View Full Log</Link>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-start p-4 bg-surface-container-lowest border border-outline-variant rounded-lg">
              <div className="mt-1 bg-surface-container rounded-full p-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">COMMENT APPROVED</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant opacity-70">10 mins ago</span>
                </div>
                <p className="font-body-md text-body-md text-on-background mb-2">Moderator <span className="font-semibold">Sarah Jenkins</span> approved comment by User #4921 on article &quot;The Liturgy of the Ordinary&quot;.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 bg-surface-container-lowest border border-outline-variant rounded-lg border-l-2 border-l-error">
              <div className="mt-1 bg-error-container rounded-full p-2 text-error">
                <span className="material-symbols-outlined text-[20px]">block</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-label-sm text-label-sm text-error">USER SUSPENDED</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant opacity-70">45 mins ago</span>
                </div>
                <p className="font-body-md text-body-md text-on-background mb-2">Automated system flagged User #812 for persistent violation of community guidelines. Manual review required.</p>
                <button className="mt-2 font-label-sm text-label-sm text-on-surface border border-outline px-3 py-1 rounded hover:bg-surface-container transition-colors">Review Case</button>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 bg-surface-container-lowest border border-outline-variant rounded-lg">
              <div className="mt-1 bg-surface-container rounded-full p-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">COMMENT EDITED</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant opacity-70">2 hours ago</span>
                </div>
                <p className="font-body-md text-body-md text-on-background mb-2">User #104 edited their comment on &quot;Morning Meditations&quot;. Review flagged for significant content change.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Quick Actions & Queue Glimpse */}
        <aside className="flex flex-col gap-6">
          <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6">
            <h3 className="font-headline-md text-[20px] text-on-background border-b border-outline-variant pb-2 mb-4">Moderation Queue</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant shrink-0">
                  <span className="font-label-sm text-label-sm">U1</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body-md text-sm text-on-background truncate">Profanity filter triggered...</p>
                  <p className="font-label-sm text-xs text-on-surface-variant">Article: &quot;Modern Dogma&quot;</p>
                </div>
                <Link className="text-primary hover:text-on-primary-fixed-variant transition-colors" href="/moderator/queue">
                  <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant shrink-0">
                  <span className="font-label-sm text-label-sm">U2</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body-md text-sm text-on-background truncate">Multiple user reports...</p>
                  <p className="font-label-sm text-xs text-on-surface-variant">Article: &quot;The Aesthetic of...&quot;</p>
                </div>
                <Link className="text-primary hover:text-on-primary-fixed-variant transition-colors" href="/moderator/queue">
                  <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                </Link>
              </li>
            </ul>
            <Link href="/moderator/queue" className="w-full mt-6 bg-transparent border border-outline text-on-surface rounded py-2 font-label-sm text-label-sm hover:bg-surface-container transition-colors block text-center">
              Open Full Queue
            </Link>
          </div>
          
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-5">
              <span className="material-symbols-outlined text-[120px]">policy</span>
            </div>
            <h3 className="font-headline-md text-[20px] text-on-background mb-2 relative z-10">System Status</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4 relative z-10">All automated moderation filters are operating normally.</p>
            <div className="flex items-center gap-2 relative z-10">
              <span className="w-2 h-2 rounded-full bg-[#4a7c59]"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Filters Active</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
